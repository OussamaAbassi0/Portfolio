import { streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { z } from "zod";
import { db } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 30;

/** Plafond dur : au-delà, on renvoie au parcours scripté. Coût borné par visiteur. */
const MAX_LLM_CALLS = 5;

const KB = `
Oussama Abassi est un ingénieur freelance basé en France (Union européenne). Il travaille seul.
Il conçoit et construit : pipelines de données, automatisation IA (n8n, agents), dashboards et control centers,
développement web full-stack (Next.js, TypeScript), applications mobile et desktop, chatbots et assistants IA,
e-commerce, design et identité visuelle.

Références vérifiables :
- LVI Control Center (LED Visual Innovation) : pipeline commercial B2B autonome livré en 4 jours.
  Apify scrape LinkedIn, GPT-4o qualifie et rédige les icebreakers, Lemlist déclenche les campagnes,
  Supabase centralise avec une synchronisation toutes les 30 secondes.
- AfricArt : agrégation de plus de 50 000 œuvres depuis Drouot, Interencheres, Invaluable et LiveAuctioneers.
  64 602 fiches nettoyées par GPT-4o-mini pour 5,51 $ au total. 253 000 textes alternatifs générés.
  Infrastructure AWS EC2 + RDS, checkpoints, monitoring, synchronisation WordPress via API REST.
- Bastide Confort Médical : automatisation n8n d'envoi de SMS d'anniversaire. Nettoyage CSV, normalisation E.164,
  dédoublonnage, cron quotidien à 8 h, journalisation Google Sheets en temps réel. Avis 5,0 sur Upwork et Malt.
- Moon Mobility : moteur de tarification VTC en Python (paliers kilométriques, surge, forfaits aéroport,
  attente et annulation). Recommandation Malt 5,0.
- B&C Enterprise : enrichissement de 270 sites industriels en Belgique, granularité au site et non au siège social.
- Produits : FlowAudit AI, LeadScout AI, TalentScout AI, DarkosClaw.

Profils publics : Upwork (Top Rated, 100% Job Success), Malt, LinkedIn.
Process en cinq étapes : signal/brief, architecture, build, livraison, maintenance optionnelle.
Réponse aux demandes sous 24 h. NDA sur demande.
`;

const bodySchema = z.object({
  sessionId: z.string().uuid().nullable().optional(),
  question: z.string().trim().min(1).max(600),
  locale: z.enum(["fr", "en"]).default("fr"),
});

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;

  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return new Response("bad_request", { status: 400 });
  }

  const { sessionId, question, locale } = parsed;
  const fr = locale === "fr";

  const fallback = fr
    ? "Je ne peux pas répondre à ça dans l'immédiat. Laissez-moi vos coordonnées et Oussama vous répond personnellement sous 24 h."
    : "I can't answer that right now. Leave your details and Oussama will get back to you personally within 24 hours.";

  if (!key) {
    return new Response(fallback, { headers: { "content-type": "text/plain; charset=utf-8" } });
  }

  const supabase = db();

  // Compteur d'appels — garde-fou de coût
  if (supabase && sessionId) {
    const { data } = await supabase
      .from("chat_sessions")
      .select("llm_calls")
      .eq("id", sessionId)
      .single();
    const calls = (data as { llm_calls: number } | null)?.llm_calls ?? 0;
    if (calls >= MAX_LLM_CALLS) {
      return new Response(fallback, {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
    await supabase
      .from("chat_sessions")
      .update({ llm_calls: calls + 1 })
      .eq("id", sessionId);
    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      role: "user",
      step_key: "freeform",
      content: question,
    });
  }

  const groq = createGroq({ apiKey: key });

  const system = `Tu es l'assistant du site d'Oussama Abassi. Tu réponds ${
    fr ? "en français" : "in English"
  }, en 3 phrases maximum, sur un ton direct et professionnel.

Base de connaissance (seule source autorisée) :
${KB}

Règles absolues :
- Ne jamais annoncer de prix, de tarif, de TJM ni d'estimation chiffrée. Si on te demande un prix, réponds que le budget se discute selon le périmètre et invite à décrire le projet.
- Ne jamais promettre de délai de livraison précis pour un projet. Tu peux dire qu'Oussama répond sous 24 h.
- Ne jamais inventer de client, de chiffre ou de référence absents de la base ci-dessus.
- Si la question sort du sujet, ramène poliment vers le projet du visiteur.
- Termine toujours en invitant à laisser nom et email pour qu'Oussama réponde personnellement.`;

  try {
    const result = streamText({
      model: groq("openai/gpt-oss-20b"),
      system,
      prompt: question,
      temperature: 0.4,
      maxOutputTokens: 220,
    });
    return result.toTextStreamResponse();
  } catch {
    return new Response(fallback, { headers: { "content-type": "text/plain; charset=utf-8" } });
  }
}
