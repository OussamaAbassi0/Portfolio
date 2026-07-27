import type { Dict } from "@/content";
import Aurora from "./Aurora";
import HeroVideo from "./HeroVideo";

export default function Hero({ d }: { d: Dict }) {
  const [l1, l2, l3] = d.hero.title;

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <Aurora />

      <div className="shell relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <p className="glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cyan" />
            </span>
            <span className="label !text-dim">{d.hero.badge}</span>
          </p>

          <h1 className="text-[clamp(2.75rem,7.5vw,5.75rem)]">
            <span className="block">{l1}</span>
            <span className="block">
              {l2} <span className="text-aurora">{d.hero.accent}</span>
            </span>
            <span className="block">{l3}</span>
          </h1>

          <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-dim">{d.hero.sub}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full px-7 py-4 text-sm font-medium text-white transition-transform duration-200 active:scale-[0.97]"
              style={{ background: "var(--aurora)" }}
            >
              {d.hero.ctaPrimary}
            </a>
            <a
              href="#work"
              className="glass rounded-full px-7 py-4 text-sm font-medium text-bright transition-colors duration-200 hover:border-white/25"
            >
              {d.hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/8 pt-6">
            <span className="flex items-center gap-1.5 font-mono text-sm text-magenta">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M8 1l2.06 4.44L15 6.1l-3.6 3.36.9 4.94L8 12.1l-4.3 2.3.9-4.94L1 6.1l4.94-.66L8 1z" />
              </svg>
              5.0
            </span>
            {d.hero.proof.map((p) => (
              <span key={p} className="label">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <HeroVideo alt={d.meta.title} />
        </div>
      </div>
    </section>
  );
}
