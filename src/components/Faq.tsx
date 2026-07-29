import type { Dict } from "@/content";
import SectionHead from "./SectionHead";
import { ArrowIcon } from "./Icons";

/**
 * `<details>` natif : accessible au clavier sans une ligne de JavaScript,
 * ouvrable par la recherche du navigateur, et indexable par Google même replié.
 * Une seule réponse ouverte par défaut pour donner le ton.
 */
export default function Faq({ d }: { d: Dict }) {
  return (
    <section id="faq" className="section relative">
      <div className="shell">
        <SectionHead kicker={d.faq.kicker} title={d.faq.title} sub={d.faq.sub} />

        <div className="reveal mt-12 max-w-3xl">
          {d.faq.items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="faq-item group border-b border-white/8"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
                <span className="font-display text-lg font-extrabold leading-snug tracking-tight text-bright">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-white/12 text-magenta transition-transform duration-300 group-open:rotate-45"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 leading-relaxed text-dim">{item.a}</p>
            </details>
          ))}

          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors hover:text-magenta"
          >
            {d.faq.cta}
            <ArrowIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
