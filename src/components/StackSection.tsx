import type { Dict } from "@/content";
import SectionHead from "./SectionHead";
import BrandIcon from "./BrandIcon";

/**
 * Six bandeaux séparés, chacun avec son intitulé, occupaient presque un écran
 * entier pour une information secondaire. Tout est regroupé en deux lignes qui
 * défilent en sens opposé : même contenu, un tiers de la hauteur.
 * Les catégories restent lisibles, en légende sous les deux lignes.
 */
function Row({ items, reverse, speed }: { items: string[]; reverse: boolean; speed: number }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee group relative overflow-hidden py-1.5" tabIndex={0}>
      <ul
        className="marquee-track flex w-max gap-2.5"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="glass flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[13px] text-dim transition-colors duration-300 hover:text-bright"
            aria-hidden={i >= items.length}
          >
            <BrandIcon name={item} className="size-3.5" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StackSection({ d }: { d: Dict }) {
  const groups = d.stack.groups;
  // On répartit les six familles sur deux pistes équilibrées.
  const rowA = groups.slice(0, 3).flatMap((g) => g.items);
  const rowB = groups.slice(3).flatMap((g) => g.items);

  return (
    <section className="section relative">
      <div className="shell">
        <SectionHead kicker={d.stack.kicker} title={d.stack.title} sub={d.stack.sub} />
      </div>

      <div className="reveal relative mt-10">
        <Row items={rowA} reverse={false} speed={46} />
        <Row items={rowB} reverse speed={54} />

        {/* Fondus latéraux : les pistes se perdent dans le fond au lieu d'être coupées net */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40"
          style={{ background: "linear-gradient(90deg, var(--color-void), transparent)" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40"
          style={{ background: "linear-gradient(270deg, var(--color-void), transparent)" }}
        />
      </div>

      <div className="shell mt-6">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {groups.map((g) => (
            <li key={g.label} className="label">
              {g.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
