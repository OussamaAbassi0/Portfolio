"use client";

import { useEffect } from "react";

/**
 * Lissage du scroll. Désactivé si l'utilisateur a demandé moins de mouvement,
 * ou sur un pointeur tactile grossier (le scroll natif y est déjà meilleur).
 *
 * Lenis intercepte le scroll natif : les ancres internes doivent donc passer
 * par lenis.scrollTo, sinon les liens du menu ne vont nulle part.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = -96; // hauteur de la nav flottante
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset, duration: 1.1 });
      } else {
        const y = (target as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
      }
      history.replaceState(null, "", id);
    };

    let lenis: {
      raf: (t: number) => void;
      destroy: () => void;
      scrollTo: (t: HTMLElement, o?: { offset?: number; duration?: number }) => void;
    } | null = null;
    let frame = 0;
    let cancelled = false;

    document.addEventListener("click", onAnchorClick);

    if (!reduce && !coarse) {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
        const raf = (time: number) => {
          lenis?.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      });
    }

    return () => {
      cancelled = true;
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
