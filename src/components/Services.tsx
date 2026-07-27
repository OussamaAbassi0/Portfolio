"use client";

import Link from "next/link";
import type { Dict, Locale } from "@/content";
import SectionHead from "./SectionHead";
import { ServiceIcon, ArrowIcon } from "./Icons";

const SPAN: Record<string, string> = {
  hero: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  unit: "",
};

export default function Services({ d, locale }: { d: Dict; locale: Locale }) {
  const workPath = locale === "fr" ? "travaux" : "work";

  return (
    <section id="services" className="section relative">
      <div className="shell">
        <SectionHead kicker={d.services.kicker} title={d.services.title} sub={d.services.sub} />

        <ul className="stagger mt-14 grid auto-rows-[minmax(11rem,auto)] gap-3 md:grid-cols-4">
          {d.services.items.map((s, i) => {
            const big = s.span === "hero";
            return (
              <li
                key={s.key}
                className={`reveal ${SPAN[s.span]}`}
                style={{ ["--i" as string]: i }}
              >
                <Link
                  href={`/${locale}/${workPath}/${s.caseSlug}`}
                  className="glass spotlight ring-aurora group flex size-full flex-col justify-between rounded-card p-6 transition-colors duration-300 hover:border-white/20"
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                >
                  <span
                    className="grid size-11 place-items-center rounded-xl text-magenta transition-colors duration-300 group-hover:text-bright"
                    style={{
                      background:
                        "color-mix(in oklch, var(--color-magenta) 12%, transparent)",
                    }}
                  >
                    <ServiceIcon name={s.key} className="size-5" />
                  </span>

                  <div className="mt-8">
                    <h3
                      className={`font-display font-extrabold tracking-tight text-bright ${
                        big ? "text-[clamp(1.6rem,2.6vw,2.2rem)]" : "text-xl"
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`mt-2.5 leading-snug text-dim ${
                        big ? "max-w-[42ch] text-base" : "text-sm"
                      }`}
                    >
                      {s.line}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors duration-300 group-hover:text-magenta">
                      {d.cases.readMore}
                      <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
