"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 77;
const W = 660;
const H = 880;

const src = (i: number) => `/hero/f_${String(i + 1).padStart(3, "0")}.webp`;

/**
 * Scrub image par image piloté par le scroll.
 * Le décodage est fait hors thread principal (`createImageBitmap`), le rendu
 * est cadencé par requestAnimationFrame et ne redessine que si l'index change.
 *
 * Dégradé : sur pointeur tactile, connexion économe ou `prefers-reduced-motion`,
 * seule la première image est chargée — on économise ~2 Mo et tout le JS de scrub.
 */
export default function HeroVideo({ alt }: { alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const frames = useRef<(ImageBitmap | null)[]>(Array(FRAME_COUNT).fill(null));
  const current = useRef(-1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const lite = reduce || coarse || conn?.saveData === true;

    let cancelled = false;
    let raf = 0;

    const paint = (i: number) => {
      const bmp = frames.current[i];
      if (!bmp || current.current === i) return;
      current.current = i;
      ctx.drawImage(bmp, 0, 0, W, H);
    };

    const load = async (i: number) => {
      if (frames.current[i] || cancelled) return;
      try {
        const res = await fetch(src(i));
        const blob = await res.blob();
        const bmp = await createImageBitmap(blob);
        if (cancelled) {
          bmp.close();
          return;
        }
        frames.current[i] = bmp;
      } catch {
        /* une image manquante ne doit jamais casser la page */
      }
    };

    const boot = async () => {
      await load(0);
      if (cancelled) return;
      paint(0);
      setReady(true);
      if (lite) return;

      // Chargement progressif : d'abord une image sur quatre pour que le scrub
      // soit utilisable très vite, puis on comble les trous.
      for (let i = 0; i < FRAME_COUNT; i += 4) await load(i);
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        await load(i);
      }
    };

    boot();

    if (lite) {
      return () => {
        cancelled = true;
      };
    }

    const tick = () => {
      const rect = wrap.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const p = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / total));
      const idx = Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)));
      let use = idx;
      // si l'image exacte n'est pas encore chargée, on affiche la plus proche
      if (!frames.current[use]) {
        for (let d = 1; d < FRAME_COUNT; d++) {
          if (frames.current[idx - d]) {
            use = idx - d;
            break;
          }
          if (frames.current[idx + d]) {
            use = idx + d;
            break;
          }
        }
      }
      paint(use);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      frames.current.forEach((b) => b?.close());
      frames.current = Array(FRAME_COUNT).fill(null);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-[1.5rem] border border-white/10"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      {/* Première image en HTML : c'est elle qui compte pour le LCP */}
      <img
        src="/media/hero-poster.webp"
        alt={alt}
        width={W}
        height={H}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-opacity duration-500"
        style={{ opacity: ready ? 0 : 1 }}
      />
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        aria-hidden
        className="absolute inset-0 size-full object-cover"
      />

      {/* Étalonnage duotone — prolonge la lumière cramoisie de la vidéo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-color"
        style={{
          background:
            "linear-gradient(150deg, var(--color-crimson) 0%, var(--color-magenta) 45%, var(--color-violet) 100%)",
          opacity: 0.26,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(70% 50% at 68% 26%, color-mix(in oklch, var(--color-magenta) 45%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklch, var(--color-void) 92%, transparent) 0%, transparent 42%)",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
        <span className="font-mono text-[11px] tracking-widest text-magenta">SCRUB</span>
        <span className="font-mono text-[11px] tracking-widest text-faint">
          {FRAME_COUNT} FRAMES
        </span>
      </div>
    </div>
  );
}
