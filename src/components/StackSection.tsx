import type { Dict } from "@/content";
import SectionHead from "./SectionHead";

/**
 * Défilement continu, sens alterné. Mis en pause au survol et au focus clavier —
 * un marquee qu'on ne peut pas arrêter est un problème d'accessibilité.
 */
function Row({ items, reverse, speed }: { items: string[]; reverse: boolean; speed: number }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee group relative overflow-hidden py-2" tabIndex={0}>
      <ul
        className="marquee-track flex w-max gap-3"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="glass shrink-0 rounded-full px-5 py-3 font-mono text-sm text-dim"
            aria-hidden={i >= items.length}
          >
            {item}
          </li>
        ))}
      </ul>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16"
        style={{ background: "linear-gradient(90deg, var(--color-void), transparent)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16"
        style={{ background: "linear-gradient(270deg, var(--color-void), transparent)" }}
      />
    </div>
  );
}

export default function StackSection({ d }: { d: Dict }) {
  return (
    <section className="section relative">
      <div className="shell">
        <SectionHead kicker={d.stack.kicker} title={d.stack.title} sub={d.stack.sub} />
      </div>

      <div className="reveal mt-14 space-y-1">
        {d.stack.groups.map((g, i) => (
          <div key={g.label}>
            <p className="shell label mb-1 mt-6">{g.label}</p>
            <Row items={g.items} reverse={i % 2 === 1} speed={36 + i * 5} />
          </div>
        ))}
      </div>
    </section>
  );
}
