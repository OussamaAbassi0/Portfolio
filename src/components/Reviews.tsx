import type { Dict } from "@/content";
import { CONTACT } from "@/content";
import SectionHead from "./SectionHead";
import BrandIcon from "./BrandIcon";
import { ArrowIcon, StarIcon } from "./Icons";

/**
 * Les avis défilent sur une seule ligne, comme la stack.
 * Le défilement s'arrête au survol et au focus clavier — un avis qu'on ne peut
 * pas finir de lire ne sert à rien. La piste est dupliquée pour boucler sans
 * saut ; la copie est masquée aux lecteurs d'écran.
 */
export default function Reviews({ d }: { d: Dict }) {
  const loop = [...d.reviews.items, ...d.reviews.items];

  return (
    <section className="section relative">
      <div className="shell">
        <SectionHead kicker={d.reviews.kicker} title={d.reviews.title} sub={d.reviews.sub} />
      </div>

      <div className="reveal relative mt-12">
        <div className="marquee group overflow-hidden py-1" tabIndex={0}>
          <ul className="marquee-track flex w-max gap-3" style={{ animationDuration: "70s" }}>
            {loop.map((r, i) => (
              <li
                key={`${r.name}-${i}`}
                className="w-[min(23rem,80vw)] shrink-0"
                aria-hidden={i >= d.reviews.items.length}
              >
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={i >= d.reviews.items.length ? -1 : 0}
                  className="glass ring-aurora group/card flex h-full flex-col rounded-card p-6 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-sm text-magenta">
                      <StarIcon className="size-3.5" />
                      5.0
                    </span>
                    <span className="label flex items-center gap-2 !text-dim">
                      <BrandIcon name={r.platform} className="size-3.5" />
                      {r.platform}
                    </span>
                  </div>

                  <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-dim">
                    « {r.text} »
                  </blockquote>

                  <footer className="mt-6 border-t border-white/8 pt-4">
                    <p className="font-medium text-bright">{r.name}</p>
                    <p className="mt-0.5 text-sm text-faint">{r.role}</p>
                  </footer>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32"
          style={{ background: "linear-gradient(90deg, var(--color-void), transparent)" }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32"
          style={{ background: "linear-gradient(270deg, var(--color-void), transparent)" }}
        />
      </div>

      <div className="shell reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={CONTACT.upwork}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors hover:text-magenta"
        >
          <BrandIcon name="Upwork" className="size-3.5" />
          {d.reviews.all}
          <ArrowIcon className="size-3.5" />
        </a>
        <a
          href={CONTACT.malt}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors hover:text-magenta"
        >
          <BrandIcon name="Malt" className="size-3.5" />
          Malt
          <ArrowIcon className="size-3.5" />
        </a>
      </div>
    </section>
  );
}
