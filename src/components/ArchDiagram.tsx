import type { ArchNode } from "@/content/types";

/**
 * Schéma d'architecture. Le trait de liaison se dessine à mesure que la section
 * entre dans le viewport (`stroke-dashoffset` + `animation-timeline: view()`),
 * et chaque nœud s'allume à la suite. Aucune librairie d'animation.
 */
export default function ArchDiagram({ nodes, note }: { nodes: ArchNode[]; note: string }) {
  return (
    <figure className="glass rounded-card p-6 md:p-8">
      <div className="relative">
        {/* Trait de liaison — horizontal en desktop, vertical en mobile */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden size-full md:block"
          preserveAspectRatio="none"
          viewBox="0 0 100 10"
        >
          <line
            x1="2"
            y1="5"
            x2="98"
            y2="5"
            stroke="url(#archline)"
            strokeWidth="0.35"
            strokeLinecap="round"
            className="arch-line"
            style={{ ["--len" as string]: 100 }}
          />
          <defs>
            <linearGradient id="archline" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-crimson)" />
              <stop offset="50%" stopColor="var(--color-magenta)" />
              <stop offset="100%" stopColor="var(--color-violet)" />
            </linearGradient>
          </defs>
        </svg>

        <ol className="relative grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {nodes.map((n, i) => (
            <li
              key={n.id}
              className="arch-node relative rounded-xl border border-white/10 bg-abyss/70 p-4"
              style={{ ["--i" as string]: i }}
            >
              <span className="label !text-[10px]">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-1.5 font-mono text-sm font-medium text-bright">{n.label}</p>
              <p className="mt-1 text-xs leading-snug text-faint">{n.sub}</p>
              <span
                aria-hidden
                className="arch-dot absolute -top-px left-4 h-px w-10"
                style={{ background: "var(--aurora)" }}
              />
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="mt-6 border-t border-white/8 pt-5 text-sm leading-relaxed text-dim">
        {note}
      </figcaption>
    </figure>
  );
}
