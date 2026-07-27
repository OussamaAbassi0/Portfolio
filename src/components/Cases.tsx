import Link from "next/link";
import type { CaseStudy, Dict, Locale } from "@/content";
import SectionHead from "./SectionHead";
import ArchDiagram from "./ArchDiagram";
import { ArrowIcon, StarIcon } from "./Icons";

function Featured({
  c,
  d,
  locale,
  index,
}: {
  c: CaseStudy;
  d: Dict;
  locale: Locale;
  index: number;
}) {
  const workPath = locale === "fr" ? "travaux" : "work";

  return (
    <article className="relative grid gap-8 border-t border-white/8 pt-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="label">
          {locale === "fr" ? "Étude" : "Case"} {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mt-4 font-mono text-sm text-bright">{c.client}</p>
        <p className="mt-1 text-sm text-faint">{c.sector}</p>
        <p className="mt-1 text-sm text-faint">{c.duration}</p>
        <p
          className="mt-5 inline-block rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest"
          style={{
            background: "color-mix(in oklch, var(--color-magenta) 14%, transparent)",
            color: "var(--color-magenta)",
          }}
        >
          {c.kicker}
        </p>
      </div>

      <div className="reveal min-w-0">
        <h3 className="text-[clamp(1.7rem,3.4vw,2.7rem)]">{c.title}</h3>

        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-dim">{c.problem}</p>

        <div className="mt-10">
          <p className="label mb-4">{locale === "fr" ? "Architecture" : "Architecture"}</p>
          <ArchDiagram nodes={c.architecture} note={c.archNote} />
        </div>

        <div className="mt-10">
          <p className="label mb-4">Stack</p>
          <ul className="flex flex-wrap gap-2">
            {c.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-xs text-dim"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <p className="label mb-4">{locale === "fr" ? "Résultat" : "Outcome"}</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {c.results.map((r) => (
              <li key={r.label} className="glass rounded-card p-5">
                <p className="font-display text-2xl font-extrabold tracking-tight text-aurora">
                  {r.value}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-dim">{r.label}</p>
              </li>
            ))}
          </ul>
        </div>

        {c.quote && (
          <blockquote className="glass mt-6 rounded-card p-6">
            <p className="flex items-center gap-2 font-mono text-xs text-magenta">
              <StarIcon className="size-3.5" />
              {c.quote.role}
            </p>
            <p className="mt-3 text-base leading-relaxed text-bright">« {c.quote.text} »</p>
            <footer className="mt-3 text-sm text-faint">— {c.quote.author}</footer>
          </blockquote>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={`/${locale}/${workPath}/${c.slug}`}
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-bright transition-colors hover:border-white/25"
          >
            {d.cases.readMore}
            <ArrowIcon className="size-4" />
          </Link>
          <a
            href="#contact"
            className="font-mono text-[11px] uppercase tracking-widest text-faint transition-colors hover:text-magenta"
          >
            {d.cases.similar}
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Cases({
  d,
  locale,
  cases,
}: {
  d: Dict;
  locale: Locale;
  cases: CaseStudy[];
}) {
  const featured = cases.filter((c) => c.featured);
  const compact = cases.filter((c) => !c.featured);
  const workPath = locale === "fr" ? "travaux" : "work";

  return (
    <section id="work" className="section relative">
      <div className="shell">
        <SectionHead kicker={d.cases.kicker} title={d.cases.title} sub={d.cases.sub} />

        <div className="mt-16 space-y-20">
          {featured.map((c, i) => (
            <Featured key={c.slug} c={c} d={d} locale={locale} index={i} />
          ))}
        </div>

        <ul className="stagger mt-20 grid gap-3 border-t border-white/8 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {compact.map((c, i) => (
            <li key={c.slug} className="reveal" style={{ ["--i" as string]: i }}>
              <Link
                href={`/${locale}/${workPath}/${c.slug}`}
                className="glass ring-aurora group flex size-full flex-col rounded-card p-6 transition-colors hover:border-white/20"
              >
                <p className="label">{c.kicker}</p>
                <h3 className="mt-4 font-display text-xl font-extrabold leading-tight tracking-tight text-bright">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-snug text-dim">{c.client}</p>
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                  {c.results.slice(0, 2).map((r) => (
                    <li key={r.label} className="font-mono text-xs text-magenta">
                      {r.value}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors group-hover:text-magenta">
                  {d.cases.readMore}
                  <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
