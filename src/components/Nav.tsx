"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dict, Locale } from "@/content";

const LINKS = [
  { href: "#work", key: "work" },
  { href: "#services", key: "services" },
  { href: "#process", key: "process" },
  { href: "#about", key: "about" },
] as const;

export default function Nav({ d, locale }: { d: Dict; locale: Locale }) {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      setHidden(y > 320 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const other: Locale = locale === "fr" ? "en" : "fr";

  /**
   * Le segment de route est traduit, pas seulement le préfixe de langue.
   * Sans ça, depuis /fr/travaux/mon-projet le bouton EN menait vers
   * /en/travaux/mon-projet — une URL qui n'existe pas, donc une 404 sur
   * chaque page projet. Constaté dans les journaux de production.
   */
  const SEGMENTS: Record<string, string> = {
    travaux: "work",
    work: "travaux",
    "mentions-legales": "legal",
    legal: "mentions-legales",
  };
  const otherHref =
    "/" +
    [
      other,
      ...pathname
        .split("/")
        .filter(Boolean)
        .slice(1)
        .map((seg) => SEGMENTS[seg] ?? seg),
    ].join("/");

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-transform duration-500"
        style={{
          transform: hidden ? "translateY(-140%)" : "translateY(0)",
          transitionTimingFunction: "var(--ease-out-expo)",
        }}
      >
        <nav
          aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}
          className="shell pt-4 md:pt-5"
        >
          <div
            className={`flex items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 transition-colors duration-300 ${
              solid ? "nav-solid" : "border border-transparent"
            }`}
          >
            <Link
              href={`/${locale}`}
              className="font-display text-lg font-extrabold tracking-tight text-bright"
            >
              oa<span className="text-magenta">.</span>
            </Link>

            <ul className="hidden items-center gap-7 text-sm text-dim md:flex">
              {LINKS.map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    className="transition-colors duration-200 hover:text-bright"
                  >
                    {d.nav[l.key]}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                href={otherHref}
                hrefLang={other}
                aria-label={other === "fr" ? "Passer en français" : "Switch to English"}
                className="rounded-full px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors hover:text-bright"
              >
                {other}
              </Link>
              <a
                href="#contact"
                className="hidden rounded-full px-5 py-2.5 text-sm font-medium text-white transition-transform duration-200 active:scale-[0.97] sm:inline-block"
                style={{ background: "var(--aurora)" }}
              >
                {d.nav.cta}
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={locale === "fr" ? "Ouvrir le menu" : "Open menu"}
                aria-expanded={open}
                className="grid size-11 place-items-center rounded-full text-bright md:hidden"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M3 6h14M3 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0"
            style={{ background: "color-mix(in oklch, var(--color-void) 88%, transparent)" }}
            onClick={() => setOpen(false)}
          />
          <div className="glass absolute inset-x-3 top-3 rounded-[1.75rem] p-6">
            <div className="flex items-center justify-between">
              <span className="label">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={locale === "fr" ? "Fermer le menu" : "Close menu"}
                className="grid size-11 place-items-center rounded-full text-bright"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ul className="mt-6 space-y-1">
              {LINKS.map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl font-extrabold tracking-tight text-bright"
                  >
                    {d.nav[l.key]}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 block rounded-full py-4 text-center text-sm font-medium text-white"
              style={{ background: "var(--aurora)" }}
            >
              {d.nav.cta}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
