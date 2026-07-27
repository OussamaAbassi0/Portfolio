import { Resend } from "resend";

const BRAND = {
  void: "#0A0510",
  card: "#1E1129",
  border: "#3A2C46",
  text: "#F7F3F8",
  dim: "#ABA1B0",
  magenta: "#FF2E86",
};

let resend: Resend | null = null;
function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resend) resend = new Resend(key);
  return resend;
}

function shell(inner: string) {
  return `<!doctype html><html><body style="margin:0;padding:32px 12px;background:${BRAND.void};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" style="max-width:560px" cellpadding="0" cellspacing="0">
<tr><td style="height:3px;background:linear-gradient(90deg,#E4174C,#FF2E86,#7A3BF0)"></td></tr>
<tr><td style="background:${BRAND.card};border:1px solid ${BRAND.border};border-top:0;border-radius:0 0 14px 14px;padding:28px">
${inner}
</td></tr></table></td></tr></table></body></html>`;
}

const row = (label: string, value: string) =>
  `<tr>
     <td style="padding:9px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.dim};font-size:13px;width:38%;vertical-align:top">${label}</td>
     <td style="padding:9px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.text};font-size:14px">${value}</td>
   </tr>`;

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export interface NotifyPayload {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  locale: string;
  source: "form" | "chat";
  referrer?: string;
}

/** Notification interne — tout est en clair, reply-to pointe sur le visiteur. */
export async function sendNotification(p: NotifyPayload) {
  const r = client();
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM;
  if (!r || !to || !from) throw new Error("resend_not_configured");

  const html = shell(`
    <p style="margin:0 0 4px;color:${BRAND.magenta};font-size:11px;letter-spacing:.14em;text-transform:uppercase">Nouveau lead · ${p.source}</p>
    <h1 style="margin:0 0 20px;color:${BRAND.text};font-size:22px;line-height:1.2">${esc(p.name)}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Email", `<a href="mailto:${esc(p.email)}" style="color:${BRAND.magenta};text-decoration:none">${esc(p.email)}</a>`)}
      ${p.company ? row("Entreprise", esc(p.company)) : ""}
      ${row("Type de projet", esc(p.projectType))}
      ${p.budgetRange ? row("Budget", esc(p.budgetRange)) : ""}
      ${row("Langue", esc(p.locale))}
      ${p.referrer ? row("Provenance", esc(p.referrer)) : ""}
    </table>
    <p style="margin:22px 0 6px;color:${BRAND.dim};font-size:13px">Message</p>
    <div style="background:${BRAND.void};border:1px solid ${BRAND.border};border-radius:10px;padding:16px;color:${BRAND.text};font-size:14px;line-height:1.65;white-space:pre-wrap">${esc(p.message)}</div>
  `);

  return r.emails.send({
    from,
    to,
    replyTo: p.email,
    subject: `[Lead] ${p.projectType}${p.budgetRange ? ` · ${p.budgetRange}` : ""} · ${p.name}`,
    html,
  });
}

/** Accusé de réception au visiteur, dans sa langue. */
export async function sendAcknowledgement(p: { name: string; email: string; locale: string }) {
  const r = client();
  const from = process.env.RESEND_FROM;
  if (!r || !from) throw new Error("resend_not_configured");

  const fr = p.locale === "fr";
  const html = shell(`
    <p style="margin:0 0 4px;color:${BRAND.magenta};font-size:11px;letter-spacing:.14em;text-transform:uppercase">${fr ? "Message reçu" : "Message received"}</p>
    <h1 style="margin:0 0 16px;color:${BRAND.text};font-size:22px;line-height:1.25">${fr ? `Merci ${esc(p.name)}.` : `Thanks ${esc(p.name)}.`}</h1>
    <p style="margin:0 0 14px;color:${BRAND.dim};font-size:15px;line-height:1.7">
      ${
        fr
          ? "J'ai bien reçu votre message. Je le lis personnellement — pas de réponse automatique derrière celle-ci — et je reviens vers vous sous 24 h."
          : "I've received your message. I read every one personally — there's no autoresponder behind this — and I'll get back to you within 24 hours."
      }
    </p>
    <p style="margin:0 0 22px;color:${BRAND.dim};font-size:15px;line-height:1.7">
      ${
        fr
          ? "Si c'est urgent, vous pouvez aussi m'écrire sur WhatsApp."
          : "If it's urgent, you can also reach me on WhatsApp."
      }
    </p>
    <a href="https://wa.me/33679634996" style="display:inline-block;background:linear-gradient(90deg,#E4174C,#FF2E86);color:#fff;text-decoration:none;font-size:14px;font-weight:500;padding:12px 22px;border-radius:999px">WhatsApp</a>
    <p style="margin:26px 0 0;padding-top:18px;border-top:1px solid ${BRAND.border};color:#7A6E80;font-size:12px">
      Oussama Abassi · ${fr ? "Ingénieur systèmes freelance · UE" : "Freelance systems engineer · EU"}
    </p>
  `);

  return r.emails.send({
    from,
    to: p.email,
    subject: fr ? "Votre message est bien arrivé" : "Your message has arrived",
    html,
  });
}
