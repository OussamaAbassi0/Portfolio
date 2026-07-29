"use server";

import { headers } from "next/headers";
import { leadSchema, looksAutomated } from "@/lib/schema";
import { captureLead } from "@/lib/leads";

export interface FormState {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<string, string>>;
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    projectType: formData.get("projectType"),
    budgetRange: formData.get("budgetRange") || undefined,
    message: formData.get("message"),
    locale: formData.get("locale") || "fr",
    website: formData.get("website") || "",
    startedAt: formData.get("startedAt") || undefined,
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      errors[key] = issue.message;
    }
    return { status: "error", errors };
  }

  const data = parsed.data;

  // Piège à robots : on renvoie un succès silencieux pour ne rien apprendre au bot.
  if (data.website || looksAutomated(data.startedAt)) {
    return { status: "success" };
  }

  const h = await headers();
  const result = await captureLead({
    source: "form",
    locale: data.locale,
    name: data.name,
    email: data.email,
    company: data.company || undefined,
    projectType: data.projectType,
    budgetRange: data.budgetRange,
    message: data.message,
    referrer: h.get("referer") ?? undefined,
    ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: h.get("user-agent"),
  });

  if (result.ok) return { status: "success" };

  // On distingue les deux échecs. Promettre « votre message a été enregistré »
  // alors que rien n'a été écrit en base serait un mensonge au visiteur —
  // et il attendrait une réponse qui ne viendrait jamais.
  return {
    status: "error",
    errors: { form: result.stored ? "emailFailed" : "sendFailed" },
  };
}
