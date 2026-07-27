import Link from "next/link";
import type { Dict, Locale } from "@/content";
import { CONTACT } from "@/content";

export default function Footer({ d, locale }: { d: Dict; locale: Locale }) {
  const legalPath = locale === "fr" ? "mentions-legales" : "legal";

  return (
    <footer className="relative">
      <div aria-hidden className="h-px w-full" style={{ background: "var(--aurora)" }} />
      <div className="shell grid gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
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
                {locale === "fr" ? "Accueil" : "Home"}
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
          <ul className="mt-4 space-y-2.5 text-sm text-dim">
            <li>
              <a href="#contact" className="transition-colors hover:text-bright">
                {d.nav.cta}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="break-all transition-colors hover:text-bright"
              >
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-bright"
              >
                WhatsApp · {CONTACT.whatsappLabel}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-bright"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={CONTACT.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-bright"
              >
                Upwork
              </a>
            </li>
            <li>
              <a
                href={CONTACT.malt}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-bright"
              >
                Malt
              </a>
            </li>
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
