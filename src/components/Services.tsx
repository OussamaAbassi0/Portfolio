"use client";

import type { Dict, Locale } from "@/content";
import SectionHead from "./SectionHead";
import { ServiceIcon } from "./Icons";

/**
 * Grille uniforme plutôt que bento à tailles variables.
 * Une case 2×2 dans une grille de cartes courtes crée un grand vide au milieu :
 * la hauteur est imposée par la grille, pas par le contenu. Ici chaque carte
 * fait une cellule et sa hauteur suit son texte — aucun espace mort.
 *
 * Les cartes ne sont pas cliquables. Elles l'étaient, et elles menaient vers une
 * étude de cas qui ne répondait pas à la question posée par la carte : un visiteur
 * qui lit « E-commerce » veut savoir comment c'est construit, pas atterrir sur le
 * projet d'un autre. À la place, chaque carte dit elle-même comment le travail est
 * fait. Les projets ont leur propre section, plus bas.
 */
export default function Services({ d, locale }: { d: Dict; locale: Locale }) {
  const howLabel = locale === "fr" ? "Comment" : "How";

  return (
    <section id="services" className="section relative">
      <div className="shell">
        <SectionHead kicker={d.services.kicker} title={d.services.title} sub={d.services.sub} />

        <ul className="stagger mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {d.services.items.map((s, i) => (
            <li
              key={s.key}
              className="glass reveal spotlight ring-aurora flex flex-col rounded-card p-5"
              style={{ ["--i" as string]: i }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-lg text-magenta"
                  style={{
                    background: "color-mix(in oklch, var(--color-magenta) 12%, transparent)",
                  }}
                >
                  <ServiceIcon name={s.key} className="size-[18px]" />
                </span>
                <h3 className="font-display text-base font-extrabold leading-tight tracking-tight text-bright">
                  {s.title}
                </h3>
              </div>

              <p className="mt-3.5 text-sm leading-snug text-dim">{s.line}</p>

              {/* mt-auto : le trait se cale en bas, donc aligné d'une carte à l'autre */}
              <div className="mt-auto border-t border-white/8 pt-4">
                <p className="label">{howLabel}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-faint">{s.how}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
