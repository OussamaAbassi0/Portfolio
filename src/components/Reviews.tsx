import type { Dict } from "@/content";
import { CONTACT } from "@/content";
import SectionHead from "./SectionHead";
import { ArrowIcon, StarIcon } from "./Icons";

export default function Reviews({ d }: { d: Dict }) {
  return (
    <section className="section relative">
      <div className="shell">
        <SectionHead kicker={d.reviews.kicker} title={d.reviews.title} sub={d.reviews.sub} />

        {/* Cartes statiques, pas de carrousel : on lit les trois d'un coup */}
        <ul className="stagger mt-14 grid gap-3 lg:grid-cols-3">
          {d.reviews.items.map((r, i) => (
            <li key={r.name} className="reveal" style={{ ["--i" as string]: i }}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass ring-aurora group flex size-full flex-col rounded-card p-6 transition-colors hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-sm text-magenta">
                    <StarIcon className="size-3.5" />
                    5.0
                  </span>
                  <span className="label">{r.platform}</span>
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

        <div className="reveal mt-8">
          <a
            href={CONTACT.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors hover:text-magenta"
          >
            {d.reviews.all}
            <ArrowIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
