"use client";

import { useEffect } from "react";

/**
 * Les révélations au scroll utilisent `animation-timeline: view()` — natif,
 * hors thread principal, zéro JS. Ce composant ne fait quoi que ce soit que
 * sur les navigateurs qui ne le supportent pas encore.
 */
export default function RevealFallback() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = document.querySelectorAll<HTMLElement>(".reveal, .reveal-soft");
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return null;
}
