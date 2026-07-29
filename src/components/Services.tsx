"use client";

import Link from "next/link";
import type { Dict, Locale } from "@/content";
import SectionHead from "./SectionHead";
import { ServiceIcon, ArrowIcon } from "./Icons";

/**
 * Grille uniforme plutôt que bento à tailles variables.
 * Une case 2×2 dans une grille de cartes courtes crée un grand vide au milieu :
 * la hauteur est imposée par la grille, pas par le contenu. Ici chaque carte
 * fait une cellule et sa hauteur suit son texte — aucun espace mort.
 */
export default function Services({ d, locale }: { d: Dict; locale: Locale }) {
  const workPath = locale === "fr" ? "travaux" : "work";

  return (
    <section id="services" className="section relative">
      <div className="shell">
        <SectionHead kicker={d.services.kicker} title={d.services.title} sub={d.services.sub} />

        <ul className="stagger mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {d.services.items.map((s, i) => (
            <li key={s.key} className="reveal" style={{ ["--i" as string]: i }}>
              <Link
                href={`/${locale}/${workPath}/${s.caseSlug}`}
                className="glass spotlight ring-aurora group flex size-full flex-col rounded-card p-5 transition-colors duration-300 hover:border-white/20"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-lg text-magenta transition-colors duration-300 group-hover:text-bright"
                    style={{
                      background: "color-mix(in oklch, var(--color-magenta) 12%, transparent)",
                    }}
                  >
                    <ServiceIcon name={s.key} className="size-[18px]" />
                  </span>
                  <h3 className="font-display text-base font-extrabold leading-tight tracking-tight text-bright">
                    {s.title}
                  </h3>
                </span>

                <p className="mt-3.5 text-sm leading-snug text-dim">{s.line}</p>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-[10px] uppercase tracking-widest text-faint transition-colors duration-300 group-hover:text-magenta">
                  {d.cases.readMore}
                  <ArrowIcon className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
