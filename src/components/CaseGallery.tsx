"use client";

import { useEffect, useState } from "react";
import type { CaseImage } from "@/content/types";

/**
 * Galerie de captures. Vignettes cliquables, agrandissement au clic.
 * Les captures sont anonymisées en amont : aucun nom de client, valeurs fictives.
 */
export default function CaseGallery({
  images,
  label,
  locale,
}: {
  images: CaseImage[];
  label: string;
  locale: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, images.length]);

  if (!images.length) return null;

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2">
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 ? "sm:col-span-2" : ""}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="ring-aurora group block w-full overflow-hidden rounded-card border border-white/10 bg-abyss/60"
              aria-label={`${locale === "fr" ? "Agrandir" : "Enlarge"} — ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={1600}
                height={i === 0 ? 737 : 689}
                loading="lazy"
                decoding="async"
                className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ aspectRatio: "1600 / 700", objectFit: "cover", objectPosition: "top" }}
              />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-faint">
        {locale === "fr"
          ? "Captures anonymisées — noms de clients masqués, montants et volumes fictifs"
          : "Anonymised screenshots — client names masked, amounts and volumes fictional"}
      </p>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          style={{ background: "color-mix(in oklch, var(--color-void) 92%, transparent)" }}
          onClick={() => setOpen(null)}
        >
          <figure className="max-h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[open].src}
              alt={images[open].alt}
              className="max-h-[80vh] w-full rounded-card border border-white/12 object-contain"
            />
            <figcaption className="mt-4 flex items-start justify-between gap-6">
              <p className="text-sm text-dim">{images[open].alt}</p>
              <span className="shrink-0 font-mono text-[11px] tracking-widest text-faint">
                {open + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label={locale === "fr" ? "Fermer" : "Close"}
            className="glass absolute right-4 top-4 grid size-12 place-items-center rounded-full text-bright"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
