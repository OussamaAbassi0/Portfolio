import { db, hashIp } from "./supabase";
import { sendNotification, sendAcknowledgement, type NotifyPayload } from "./email";

export interface LeadRecord extends NotifyPayload {
  ip?: string | null;
  userAgent?: string | null;
  leadId?: string | null;
}

/**
 * Un seul chemin pour le formulaire et le chatbot.
 * Ordre volontaire : la donnée est écrite AVANT toute tentative d'envoi.
 * Si Resend tombe, le lead existe quand même — c'est tout l'intérêt.
 */
export async function captureLead(rec: LeadRecord): Promise<{
  ok: boolean;
  leadId: string | null;
  stored: boolean;
  emailed: boolean;
}> {
  const supabase = db();
  let leadId: string | null = rec.leadId ?? null;
  let stored = false;

  if (supabase) {
    const payload = {
      source: rec.source,
      locale: rec.locale,
      name: rec.name,
      email: rec.email,
      company: rec.company || null,
      project_type: rec.projectType,
      budget_range: rec.budgetRange || null,
      message: rec.message,
      referrer: rec.referrer || null,
      ip_hash: await hashIp(rec.ip ?? null),
      user_agent: rec.userAgent ?? null,
    };

    const q = leadId
      ? supabase.from("leads").update(payload).eq("id", leadId).select("id").single()
      : supabase.from("leads").insert(payload).select("id").single();

    const { data, error } = await q;
    if (!error && data) {
      leadId = (data as { id: string }).id;
      stored = true;
    } else if (error) {
      console.error("[leads] écriture échouée:", error.message);
    }
  }

  let emailed = false;
  let emailError: string | null = null;

  try {
    await sendNotification(rec);
    emailed = true;
  } catch (e) {
    emailError = e instanceof Error ? e.message : "unknown";
    console.error("[leads] notification échouée:", emailError);
  }

  try {
    await sendAcknowledgement({ name: rec.name, email: rec.email, locale: rec.locale });
  } catch (e) {
    console.error("[leads] accusé de réception échoué:", e);
  }

  if (supabase && leadId) {
    await supabase
      .from("leads")
      .update({ email_sent: emailed, email_error: emailError })
      .eq("id", leadId);
  }

  // Le lead est capturé dès qu'il est stocké OU envoyé. Les deux doivent tomber
  // en même temps pour qu'on perde quelque chose.
  return { ok: stored || emailed, leadId, stored, emailed };
}
