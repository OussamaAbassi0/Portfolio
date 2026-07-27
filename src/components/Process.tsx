import type { Dict } from "@/content";
import SectionHead from "./SectionHead";

export default function Process({ d }: { d: Dict }) {
  return (
    <section id="process" className="section relative">
      <div className="shell">
        <SectionHead kicker={d.process.kicker} title={d.process.title} sub={d.process.sub} />

        <ol className="relative mt-16 max-w-3xl">
          {/* Rail + remplissage indexé sur la progression du scroll */}
          <span
            aria-hidden
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-white/10"
          />
          <span
            aria-hidden
            className="progress-line absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px"
            style={{ background: "var(--aurora)" }}
          />

          {d.process.steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal relative pb-12 pl-10 last:pb-0"
              style={{ ["--i" as string]: i }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-void"
                style={{ background: "var(--aurora)" }}
              />
              <p className="label">{s.n}</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-bright">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[56ch] leading-relaxed text-dim">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="reveal mt-4 pl-10">
          <a
            href="#contact"
            className="inline-block rounded-full px-7 py-4 text-sm font-medium text-white transition-transform duration-200 active:scale-[0.97]"
            style={{ background: "var(--aurora)" }}
          >
            {d.about.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
