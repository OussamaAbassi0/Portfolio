import type { Dict } from "@/content";
import Aurora from "./Aurora";
import SectionHead from "./SectionHead";

export default function About({ d }: { d: Dict }) {
  return (
    <section id="about" className="section relative isolate overflow-hidden">
      {/* Second usage de la vidéo : boucle en fond, parallax discret */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <video
          className="parallax-loop size-full object-cover opacity-[0.16]"
          src="/media/loop.webm"
          poster="/media/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-void) 0%, transparent 30%, transparent 70%, var(--color-void) 100%)",
          }}
        />
      </div>
      <Aurora variant="soft" />

      <div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
        <div className="reveal">
          <div
            className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-white/10"
            style={{
              background:
                "radial-gradient(120% 90% at 70% 25%, color-mix(in oklch, var(--color-crimson) 55%, var(--color-void)) 0%, var(--color-void) 70%)",
            }}
          >
            <img
              src="/media/hero-poster.webp"
              alt="Oussama Abassi"
              width={740}
              height={987}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-color"
              style={{
                background:
                  "linear-gradient(150deg, var(--color-crimson), var(--color-violet))",
                opacity: 0.45,
              }}
            />
            <p className="glass absolute bottom-4 left-4 rounded-full px-4 py-2">
              <span className="label !text-dim">Oussama Abassi</span>
            </p>
          </div>
        </div>

        <div>
          <SectionHead kicker={d.about.kicker} title={d.about.title} />
          <div className="reveal mt-7 space-y-5">
            {d.about.body.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-[58ch] text-lg leading-relaxed text-dim">
                {p}
              </p>
            ))}
            <a
              href="#contact"
              className="inline-block rounded-full px-7 py-4 text-sm font-medium text-white transition-transform duration-200 active:scale-[0.97]"
              style={{ background: "var(--aurora)" }}
            >
              {d.about.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
