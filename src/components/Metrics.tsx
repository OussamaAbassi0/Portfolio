"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/content";

/**
 * Sépare la partie chiffrée animable du reste, en conservant le séparateur :
 * « 4 jours » doit rester « 4 jours » pendant l'animation, jamais « 4jours ».
 */
function split(value: string) {
  const m = value.match(/^(\d[\d\s  ,.]*\d|\d)(\s*)(.*)$/);
  if (!m) return { num: null as number | null, raw: value, suffix: "" };
  const digits = m[1].replace(/[\s  ,.]/g, "");
  const n = Number(digits);
  if (!Number.isFinite(n) || n === 0) return { num: null, raw: value, suffix: "" };
  return { num: n, raw: m[1], suffix: m[2] + m[3] };
}

function Counter({ value }: { value: string }) {
  const { num, raw, suffix } = split(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(num === null ? raw : raw);

  useEffect(() => {
    if (num === null) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(raw);
      return;
    }

    setShown("0");

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          if (p < 1) {
            setShown(Math.round(num * eased).toLocaleString("fr-FR"));
            requestAnimationFrame(step);
          } else {
            setShown(raw);
          }
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [num, raw]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}

export default function Metrics({ d }: { d: Dict }) {
  return (
    <section className="shell relative pb-8 md:pb-14">
      <ul className="stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {d.metrics.map((m, i) => (
          <li
            key={m.label}
            className="glass reveal spotlight ring-aurora group relative overflow-hidden rounded-card p-6"
            style={{ ["--i" as string]: i }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
            }}
          >
            <p className="font-display text-[clamp(1.75rem,3.2vw,2.35rem)] font-extrabold tracking-tight text-bright">
              <Counter value={m.value} />
            </p>
            <p className="mt-2 text-sm leading-snug text-dim">{m.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
