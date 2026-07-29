import Link from "next/link";
import type { CaseStudy, Dict, Locale } from "@/content";
import SectionHead from "./SectionHead";
import { ArrowIcon, StarIcon } from "./Icons";

/**
 * Aucune capture sur la landing : les visuels se découvrent en ouvrant le
 * projet. La carte phare montre à la place la chaîne d'architecture, qui dit
 * en une ligne ce que le système fait — et donne envie de cliquer.
 */
export default function Cases({
  d,
  locale,
  cases,
}: {
  d: Dict;
  locale: Locale;
  cases: CaseStudy[];
}) {
  const workPath = locale === "fr" ? "travaux" : "work";
  const href = (slug: string) => `/${locale}/${workPath}/${slug}`;
  const [lead, ...rest] = cases;

  return (
    <section id="work" className="section relative">
      <div className="shell">
        <SectionHead kicker={d.cases.kicker} title={d.cases.title} sub={d.cases.sub} />

        {/* Projet phare */}
        <article className="reveal mt-12">
          <Link
            href={href(lead.slug)}
            className="glass ring-aurora spotlight group block rounded-card p-7 md:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <p className="label flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-block h-px w-6"
                    style={{ background: "var(--aurora)" }}
                  />
                  {lead.kicker}
                </p>
                <h3 className="mt-5 font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-extrabold leading-[1.03] tracking-tight text-bright">
                  {lead.title}
                </h3>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-dim">
                  {lead.problem.split(". ")[0]}.
                </p>
                <p className="mt-5 font-mono text-sm text-faint">{lead.client}</p>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <ol className="flex flex-wrap gap-2">
                  {lead.architecture.map((n) => (
                    <li
                      key={n.id}
                      className="rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-xs text-dim"
                    >
                      {n.label}
                    </li>
                  ))}
                </ol>

                <ul className="grid grid-cols-3 gap-4 border-t border-white/8 pt-5">
                  {lead.results.slice(0, 3).map((r) => (
                    <li key={r.label}>
                      <p className="font-display text-xl font-extrabold tracking-tight text-aurora">
                        {r.value}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-faint">{r.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors group-hover:text-magenta">
              {d.cases.readMore}
              <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </article>

        {/* Le reste */}
        <ul className="stagger mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((c, i) => (
            <li key={c.slug} className="reveal" style={{ ["--i" as string]: i }}>
              <Link
                href={href(c.slug)}
                className="glass ring-aurora group flex size-full flex-col rounded-card p-6"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="label">{c.kicker}</span>
                  {c.quote && (
                    <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-verified">
                      <StarIcon className="size-3" />
                      5.0
                    </span>
                  )}
                </span>

                <h3 className="mt-3 font-display text-lg font-extrabold leading-tight tracking-tight text-bright">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-sm text-faint">{c.client}</p>

                <span className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                  {c.results.slice(0, 2).map((r) => (
                    <span key={r.label} className="font-mono text-xs text-magenta">
                      {r.value}
                    </span>
                  ))}
                </span>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-[10px] uppercase tracking-widest text-faint transition-colors group-hover:text-magenta">
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
