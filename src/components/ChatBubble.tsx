"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict, Locale } from "@/content";
import Chat from "./Chat";

/**
 * Bulle ronde flottante en bas à droite, présente sur toutes les pages.
 * Au clic, un panneau s'ouvre depuis la bulle — la transformation part de sa
 * position d'origine plutôt que du centre de l'écran, ce qui garde la
 * continuité spatiale.
 */
export default function ChatBubble({ d, locale }: { d: Dict; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Une seule sollicitation, après que le visiteur a commencé à lire.
  useEffect(() => {
    if (sessionStorage.getItem("chat-seen")) return;
    const t = setTimeout(() => setPulse(true), 14000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    sessionStorage.setItem("chat-seen", "1");
    setPulse(false);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[70] flex flex-col items-end gap-3 p-4 sm:p-6">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label={d.chat.kicker}
          className="chat-panel pointer-events-auto w-[min(24rem,calc(100vw-2rem))] origin-bottom-right"
        >
          <Chat d={d} locale={locale} />
        </div>
      )}

      {pulse && !open && (
        <p className="glass pointer-events-auto max-w-[15rem] rounded-2xl rounded-br-md px-4 py-3 text-sm leading-snug text-dim">
          {locale === "fr"
            ? "Une question ? Je peux vous répondre tout de suite."
            : "A question? I can answer right now."}
        </p>
      )}

      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={
          open
            ? locale === "fr"
              ? "Fermer l'assistant"
              : "Close the assistant"
            : locale === "fr"
              ? "Ouvrir l'assistant"
              : "Open the assistant"
        }
        className="pointer-events-auto grid size-14 shrink-0 place-items-center rounded-full text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{ background: "var(--aurora)" }}
      >
        {!open && pulse && (
          <span
            aria-hidden
            className="absolute inline-flex size-14 animate-ping rounded-full opacity-40"
            style={{ background: "var(--color-magenta)" }}
          />
        )}
        <span className="relative">
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20 12.2c0 3.7-3.6 6.8-8 6.8-1 0-2-.16-2.9-.45L4 20l1.6-3.4A6.4 6.4 0 014 12.2C4 8.5 7.6 5.4 12 5.4s8 3.1 8 6.8z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path d="M9 12h.01M12 12h.01M15 12h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
