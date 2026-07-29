import type { Dict, Locale } from "@/content";
import { CONTACT } from "@/content";
import Aurora from "./Aurora";
import SectionHead from "./SectionHead";
import ContactForm from "./ContactForm";
import { ArrowIcon } from "./Icons";

/**
 * Le chatbot n'est plus encastré ici : il vit dans une bulle flottante,
 * disponible sur toutes les pages. Cette section garde donc un seul objectif
 * — le formulaire — avec les canaux directs en appui.
 */
export default function Contact({ d, locale }: { d: Dict; locale: Locale }) {
  const fr = locale === "fr";

  const channels = [
    {
      label: "WhatsApp",
      value: CONTACT.whatsappLabel,
      href: CONTACT.whatsapp,
      note: fr ? "Le plus rapide" : "Fastest route",
    },
    {
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      note: fr ? "Réponse sous 24 h" : "Reply within 24h",
    },
    {
      label: "LinkedIn",
      value: "Oussama Abassi",
      href: CONTACT.linkedin,
      note: fr ? "Profil professionnel" : "Professional profile",
    },
  ];

  return (
    <section id="contact" className="section relative isolate overflow-hidden">
      <Aurora variant="soft" />
      <div className="shell relative">
        <SectionHead kicker={d.contact.kicker} title={d.contact.title} sub={d.contact.sub} />

        <div className="reveal mt-14 grid items-start gap-4 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm d={d} locale={locale} />

          <div className="space-y-3">
            <ul className="space-y-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="glass ring-aurora group flex items-center justify-between gap-4 rounded-card p-5 transition-colors hover:border-white/20"
                  >
                    <span className="min-w-0">
                      <span className="label block">{c.label}</span>
                      <span className="mt-1.5 block truncate text-[15px] text-bright">{c.value}</span>
                      <span className="mt-0.5 block text-sm text-faint">{c.note}</span>
                    </span>
                    <ArrowIcon className="size-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-magenta" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="glass rounded-card p-5">
              <p className="label">{d.chat.kicker}</p>
              <p className="mt-3 text-sm leading-relaxed text-dim">
                {fr
                  ? "L'assistant en bas à droite de votre écran est un exemple de ce que je construis. Il qualifie, il enregistre, il ne dort jamais."
                  : "The assistant at the bottom right of your screen is an example of what I build. It qualifies, it records, it never sleeps."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
