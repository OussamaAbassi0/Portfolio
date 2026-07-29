import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, getCase, getCases, isLocale, type Locale } from "@/content";
import Nav from "./Nav";
import Footer from "./Footer";
import Aurora from "./Aurora";
import ArchDiagram from "./ArchDiagram";
import CaseGallery from "./CaseGallery";
import BrandIcon from "./BrandIcon";
import { ArrowIcon, StarIcon } from "./Icons";

export default function CaseStudyPage({ locale, slug }: { locale: string; slug: string }) {
  if (!isLocale(locale)) notFound();
  const c = getCase(locale, slug);
  if (!c) notFound();

  const d = getDict(locale);
  const l = locale as Locale;
  const workPath = l === "fr" ? "travaux" : "work";
  const others = getCases(l).filter((x) => x.slug !== slug).slice(0, 3);

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oussamaabassi.com";

  /**
   * Fil d'Ariane structuré : c'est ce qui fait apparaître
   * « oussamaabassi.com › Travaux › Nom du projet » dans les résultats Google
   * au lieu d'une URL brute. Plus lisible, donc plus cliqué.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Oussama Abassi", item: `${site}/${l}` },
          {
            "@type": "ListItem",
            position: 2,
            name: d.cases.kicker,
            item: `${site}/${l}#work`,
          },
          { "@type": "ListItem", position: 3, name: c.title },
        ],
      },
      {
        "@type": "Article",
        headline: c.title,
        description: c.problem.slice(0, 200),
        inLanguage: l === "fr" ? "fr-FR" : "en-US",
        author: { "@type": "Person", name: "Oussama Abassi", url: site },
        publisher: { "@type": "Person", name: "Oussama Abassi", url: site },
        mainEntityOfPage: `${site}/${l}/${workPath}/${slug}`,
        ...(c.images?.[0] ? { image: `${site}${c.images[0].src}` } : {}),
        about: c.stack,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav d={d} locale={l} />
      <main id="main">
        <article>
          <header className="relative isolate overflow-hidden pb-14 pt-36 md:pt-44">
            <Aurora variant="soft" />
            <div className="shell relative">
              <Link
                href={`/${l}#work`}
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors hover:text-magenta"
              >
                <ArrowIcon className="size-3.5 rotate-180" />
                {d.cases.kicker}
              </Link>

              <p className="label mt-8">{c.kicker}</p>
              <h1 className="mt-5 max-w-[20ch] text-[clamp(2.2rem,6vw,4.5rem)]">{c.title}</h1>

              <dl className="mt-10 grid max-w-2xl gap-4 border-t border-white/8 pt-6 sm:grid-cols-3">
                <div>
                  <dt className="label">{l === "fr" ? "Client" : "Client"}</dt>
                  <dd className="mt-1.5 font-mono text-sm text-bright">{c.client}</dd>
                </div>
                <div>
                  <dt className="label">{l === "fr" ? "Secteur" : "Sector"}</dt>
                  <dd className="mt-1.5 font-mono text-sm text-bright">{c.sector}</dd>
                </div>
                <div>
                  <dt className="label">{l === "fr" ? "Durée" : "Duration"}</dt>
                  <dd className="mt-1.5 font-mono text-sm text-bright">{c.duration}</dd>
                </div>
              </dl>
            </div>
          </header>

          <div className="shell max-w-4xl pb-8">
            <section className="reveal">
              <p className="label">{l === "fr" ? "Le problème" : "The problem"}</p>
              <p className="mt-5 text-xl leading-relaxed text-dim">{c.problem}</p>
            </section>

            <section className="reveal mt-16">
              <p className="label mb-5">{l === "fr" ? "L'architecture" : "The architecture"}</p>
              <ArchDiagram nodes={c.architecture} note={c.archNote} />
            </section>

            {c.images && c.images.length > 0 && (
              <section className="reveal mt-16">
                <p className="label mb-5">{l === "fr" ? "Le produit" : "The product"}</p>
                <CaseGallery images={c.images} label={c.title} locale={l} />
              </section>
            )}

            {c.detail?.map((s) => (
              <section key={s.title} className="reveal mt-16">
                <h2 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold tracking-tight text-bright">
                  {s.title}
                </h2>
                <p className="mt-4 max-w-[64ch] text-lg leading-relaxed text-dim">{s.body}</p>
                {s.bullets && (
                  <ul className="mt-6 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="glass rounded-card p-5 text-[15px] leading-relaxed text-dim">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="reveal mt-16">
              <p className="label mb-5">Stack</p>
              <ul className="flex flex-wrap gap-2">
                {c.stack.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2 font-mono text-sm text-dim"
                  >
                    <BrandIcon name={s} className="size-4" />
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            <section className="reveal mt-16">
              <p className="label mb-5">{l === "fr" ? "Le résultat" : "The outcome"}</p>
              <ul className="grid gap-3 sm:grid-cols-3">
                {c.results.map((r) => (
                  <li key={r.label} className="glass rounded-card p-6">
                    <p className="font-display text-3xl font-extrabold tracking-tight text-aurora">
                      {r.value}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-dim">{r.label}</p>
                  </li>
                ))}
              </ul>
            </section>

            {c.quote && (
              <blockquote className="glass reveal mt-8 rounded-card p-7">
                <p className="flex items-center gap-2 font-mono text-xs text-magenta">
                  <StarIcon className="size-3.5" />
                  {c.quote.role}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-bright">« {c.quote.text} »</p>
                <footer className="mt-4 text-sm text-faint">
                  —{" "}
                  <a
                    href={c.quote.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-magenta"
                  >
                    {c.quote.author} · {c.quote.source}
                  </a>
                </footer>
              </blockquote>
            )}

            <section className="glass reveal mt-16 rounded-card p-8 text-center md:p-12">
              <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)]">{d.cases.similar}</h2>
              <p className="mx-auto mt-4 max-w-[46ch] leading-relaxed text-dim">{d.contact.sub}</p>
              <Link
                href={`/${l}#contact`}
                className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-white transition-transform duration-200 active:scale-[0.97]"
                style={{ background: "var(--aurora)" }}
              >
                {d.contact.kicker}
                <ArrowIcon className="size-4" />
              </Link>
            </section>

            <section className="mt-20 border-t border-white/8 pt-12">
              <p className="label mb-6">{l === "fr" ? "Autres projets" : "Other work"}</p>
              <ul className="grid gap-3 sm:grid-cols-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/${l}/${workPath}/${o.slug}`}
                      className="glass ring-aurora group flex size-full flex-col rounded-card p-5 transition-colors hover:border-white/20"
                    >
                      <p className="label">{o.kicker}</p>
                      <p className="mt-3 font-display text-lg font-extrabold leading-tight tracking-tight text-bright">
                        {o.title}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors group-hover:text-magenta">
                        {d.cases.readMore}
                        <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </main>
      <Footer d={d} locale={l} />
    </>
  );
}
