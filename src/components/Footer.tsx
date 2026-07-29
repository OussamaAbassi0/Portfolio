import Link from "next/link";
import type { Dict, Locale } from "@/content";
import { CONTACT } from "@/content";
import BrandIcon from "./BrandIcon";
import { ArrowIcon } from "./Icons";

/**
 * Les coordonnées n'apparaissent qu'une fois : en pastilles.
 * Avant, la même information existait en liste de texte à droite et en icônes
 * à gauche — deux fois le même lien, deux fois la place, et un doute sur lequel
 * est le bon. L'information réelle (adresse, numéro) reste accessible : elle est
 * dans l'intitulé de chaque pastille, lu par les lecteurs d'écran et affiché au survol.
 */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden focusable="false">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer({ d, locale }: { d: Dict; locale: Locale }) {
  const legalPath = locale === "fr" ? "mentions-legales" : "legal";
  const fr = locale === "fr";

  const channels = [
    { key: "mail", href: `mailto:${CONTACT.email}`, label: CONTACT.email },
    { key: "WhatsApp", href: CONTACT.whatsapp, label: `WhatsApp · ${CONTACT.whatsappLabel}` },
    { key: "LinkedIn", href: CONTACT.linkedin, label: "LinkedIn" },
    { key: "Upwork", href: CONTACT.upwork, label: "Upwork" },
    { key: "Malt", href: CONTACT.malt, label: "Malt" },
  ];

  return (
    <footer className="relative">
      <div aria-hidden className="h-px w-full" style={{ background: "var(--aurora)" }} />
      <div className="shell grid gap-10 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-extrabold tracking-tight text-bright">
            Oussama Abassi<span className="text-magenta">.</span>
          </p>
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-faint">{d.footer.tagline}</p>
        </div>

        <nav aria-label={d.footer.nav}>
          <p className="label">{d.footer.nav}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-dim">
            <li>
              <Link href={`/${locale}`} className="transition-colors hover:text-bright">
                {fr ? "Accueil" : "Home"}
              </Link>
            </li>
            <li>
              <a href="#work" className="transition-colors hover:text-bright">
                {d.nav.work}
              </a>
            </li>
            <li>
              <a href="#services" className="transition-colors hover:text-bright">
                {d.nav.services}
              </a>
            </li>
            <li>
              <a href="#about" className="transition-colors hover:text-bright">
                {d.nav.about}
              </a>
            </li>
            <li>
              <a href="#faq" className="transition-colors hover:text-bright">
                FAQ
              </a>
            </li>
            <li>
              <Link
                href={`/${locale}/${legalPath}`}
                className="transition-colors hover:text-bright"
              >
                {d.footer.legal}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="label">{d.footer.contact}</p>

          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition-transform duration-200 active:scale-[0.97]"
            style={{ background: "var(--aurora)" }}
          >
            {d.nav.cta}
            <ArrowIcon className="size-4" />
          </a>

          <ul className="mt-5 flex flex-wrap items-center gap-2">
            {channels.map((c) => (
              <li key={c.key}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={c.label}
                  title={c.label}
                  className="glass flex size-11 items-center justify-center rounded-full text-dim transition-colors duration-200 hover:border-white/25 hover:text-bright"
                >
                  {c.key === "mail" ? (
                    <MailIcon className="size-[18px]" />
                  ) : (
                    <BrandIcon name={c.key} className="size-[17px]" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell border-t border-white/8 py-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
          © {new Date().getFullYear()} Oussama Abassi · {d.footer.rights}
        </p>
      </div>
    </footer>
  );
}
