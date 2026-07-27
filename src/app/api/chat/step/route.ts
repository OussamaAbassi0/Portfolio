import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { db, hashIp } from "@/lib/supabase";
import { captureLead } from "@/lib/leads";

export const runtime = "nodejs";

const STEPS = ["greeting", "name", "email", "type", "budget", "need", "confirm"] as const;
type Step = (typeof STEPS)[number];

const NEXT: Record<Step, Step | "done"> = {
  greeting: "name",
  name: "email",
  email: "type",
  type: "budget",
  budget: "need",
  need: "confirm",
  confirm: "done",
};

const bodySchema = z.object({
  sessionId: z.string().uuid().nullable().optional(),
  step: z.enum(STEPS),
  value: z.string().trim().max(4000),
  locale: z.enum(["fr", "en"]).default("fr"),
});

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Draft {
  name?: string;
  email?: string;
  projectType?: string;
  budgetRange?: string;
  message?: string;
}

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { step, value, locale } = parsed;
  const fr = locale === "fr";
  const supabase = db();
  const h = await headers();

  // Validation métier avant toute écriture
  if (step === "email" && !emailRe.test(value)) {
    return NextResponse.json({
      sessionId: parsed.sessionId ?? null,
      nextStep: "email",
      retry: true,
    });
  }
  if ((step === "name" || step === "need") && value.length < 2) {
    return NextResponse.json({
      sessionId: parsed.sessionId ?? null,
      nextStep: step,
      retry: true,
    });
  }

  let sessionId = parsed.sessionId ?? null;
  let draft: Draft = {};
  let leadId: string | null = null;

  if (supabase) {
    if (!sessionId) {
      const { data } = await supabase
        .from("chat_sessions")
        .insert({
          locale,
          step,
          referrer: h.get("referer") ?? null,
        })
        .select("id")
        .single();
      sessionId = (data as { id: string } | null)?.id ?? null;
    }

    if (sessionId) {
      await supabase.from("chat_messages").insert({
        session_id: sessionId,
        role: "user",
        step_key: step,
        content: value,
      });

      const { data: msgs } = await supabase
        .from("chat_messages")
        .select("step_key, content")
        .eq("session_id", sessionId)
        .eq("role", "user")
        .order("created_at", { ascending: true });

      for (const m of (msgs ?? []) as { step_key: string; content: string }[]) {
        if (m.step_key === "name") draft.name = m.content;
        if (m.step_key === "email") draft.email = m.content;
        if (m.step_key === "type") draft.projectType = m.content;
        if (m.step_key === "budget") draft.budgetRange = m.content;
        if (m.step_key === "need") draft.message = m.content;
      }

      const { data: sess } = await supabase
        .from("chat_sessions")
        .select("lead_id")
        .eq("id", sessionId)
        .single();
      leadId = (sess as { lead_id: string | null } | null)?.lead_id ?? null;

      await supabase
        .from("chat_sessions")
        .update({ step: NEXT[step], updated_at: new Date().toISOString() })
        .eq("id", sessionId);
    }
  }

  const nextStep = NEXT[step];

  /* Lead partiel dès que nom + email sont connus : un abandon en cours de route
     laisse quand même une trace exploitable. Un formulaire classique n'aurait rien. */
  if (supabase && sessionId && !leadId && draft.name && draft.email) {
    const { data } = await supabase
      .from("leads")
      .insert({
        source: "chat",
        locale,
        name: draft.name,
        email: draft.email,
        project_type: draft.projectType ?? null,
        budget_range: draft.budgetRange ?? null,
        message: draft.message ?? "(conversation en cours)",
        status: "partial",
        referrer: h.get("referer") ?? null,
        ip_hash: await hashIp(h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null),
        user_agent: h.get("user-agent"),
      })
      .select("id")
      .single();
    leadId = (data as { id: string } | null)?.id ?? null;
    if (leadId) await supabase.from("chat_sessions").update({ lead_id: leadId }).eq("id", sessionId);
  } else if (supabase && leadId) {
    await supabase
      .from("leads")
      .update({
        project_type: draft.projectType ?? null,
        budget_range: draft.budgetRange ?? null,
        message: draft.message ?? "(conversation en cours)",
      })
      .eq("id", leadId);
  }

  // Fin de parcours : on bascule le lead en complet et on envoie les emails
  if (nextStep === "done" || step === "need") {
    if (draft.name && draft.email) {
      await captureLead({
        source: "chat",
        locale,
        name: draft.name,
        email: draft.email,
        projectType: draft.projectType ?? "other",
        budgetRange: draft.budgetRange,
        message: draft.message ?? value,
        referrer: h.get("referer") ?? undefined,
        ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
        userAgent: h.get("user-agent"),
        leadId,
      });
      if (supabase && sessionId) {
        await supabase.from("chat_sessions").update({ completed: true }).eq("id", sessionId);
      }
      if (supabase && leadId) {
        await supabase.from("leads").update({ status: "new" }).eq("id", leadId);
      }
    }
  }

  return NextResponse.json({
    sessionId,
    nextStep,
    retry: false,
    persisted: Boolean(supabase && sessionId),
    note: fr ? undefined : undefined,
  });
}
