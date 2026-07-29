import Link from "next/link";
import type { CaseStudy, Dict, Locale } from "@/content";
import SectionHead from "./SectionHead";
import { ArrowIcon, StarIcon } from "./Icons";

/**
 * Landing : on ne déroule plus les études complètes ici. Une page d'accueil qui
 * contient quatre études de cas intégrales fatigue le visiteur avant qu'il
 * n'arrive au formulaire. On montre donc un projet phare, puis une grille
 * lisible — le détail vit sur les pages dédiées.
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
        <article className="reveal mt-14">
          <Link
            href={href(lead.slug)}
            className="glass ring-aurora group grid overflow-hidden rounded-card lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="order-2 flex flex-col justify-between p-7 md:p-10 lg:order-1">
              <div>
                <p className="label flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-block h-px w-6"
                    style={{ background: "var(--aurora)" }}
                  />
                  {lead.kicker}
                </p>
                <h3 className="mt-5 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-extrabold leading-[1.02] tracking-tight text-bright">
                  {lead.title}
                </h3>
                <p className="mt-4 max-w-[48ch] leading-relaxed text-dim">{lead.problem.split(". ")[0]}.</p>
              </div>

              <div className="mt-8">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/8 pt-6 sm:grid-cols-3">
                  {lead.results.slice(0, 3).map((r) => (
                    <li key={r.label}>
                      <p className="font-display text-2xl font-extrabold tracking-tight text-aurora">
                        {r.value}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-faint">{r.label}</p>
                    </li>
                  ))}
                </ul>
                <span className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors group-hover:text-magenta">
                  {d.cases.readMore}
                  <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>

            {lead.images?.[0] && (
              <div className="relative order-1 min-h-[15rem] overflow-hidden lg:order-2">
                <img
                  src={lead.images[0].src}
                  alt={lead.images[0].alt}
                  width={1600}
                  height={737}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, color-mix(in oklch, var(--color-void) 55%, transparent), transparent 45%)",
                  }}
                />
              </div>
            )}
          </Link>
        </article>

        {/* Le reste, en grille lisible */}
        <ul className="stagger mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((c, i) => (
            <li key={c.slug} className="reveal" style={{ ["--i" as string]: i }}>
              <Link
                href={href(c.slug)}
                className="glass ring-aurora group flex size-full flex-col overflow-hidden rounded-card"
              >
                {c.images?.[0] && (
                  <span className="block overflow-hidden border-b border-white/8">
                    <img
                      src={c.images[0].src}
                      alt=""
                      width={1600}
                      height={689}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
                      style={{ aspectRatio: "16 / 8" }}
                    />
                  </span>
                )}

                <span className="flex flex-1 flex-col p-6">
                  <span className="label">{c.kicker}</span>
                  <h3 className="mt-3 font-display text-lg font-extrabold leading-tight tracking-tight text-bright">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-faint">{c.client}</p>

                  <span className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1">
                    {c.results.slice(0, 2).map((r) => (
                      <span key={r.label} className="font-mono text-xs text-magenta">
                        {r.value}
                      </span>
                    ))}
                    {c.quote && (
                      <span className="ml-auto flex items-center gap-1 font-mono text-xs text-verified">
                        <StarIcon className="size-3" />
                        5.0
                      </span>
                    )}
                  </span>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors group-hover:text-magenta">
                    {d.cases.readMore}
                    <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
