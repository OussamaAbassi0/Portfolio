/**
 * Maillage aurora — dérivé des couleurs échantillonnées dans la vidéo hero.
 * Uniquement des `transform` et `opacity` : composé par le GPU, zéro coût
 * sur le thread principal, zéro JavaScript. Figé si `prefers-reduced-motion`.
 */
export default function Aurora({ variant = "hero" }: { variant?: "hero" | "soft" }) {
  const soft = variant === "soft";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="halo drift-a"
        style={{
          width: "68vw",
          height: "68vw",
          left: "-18vw",
          top: soft ? "-30vw" : "-22vw",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-crimson) 55%, transparent) 0%, transparent 62%)",
          opacity: soft ? 0.35 : 0.75,
        }}
      />
      <div
        className="halo drift-b"
        style={{
          width: "60vw",
          height: "60vw",
          left: "22vw",
          top: soft ? "-24vw" : "-16vw",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-magenta) 42%, transparent) 0%, transparent 60%)",
          opacity: soft ? 0.3 : 0.62,
        }}
      />
      <div
        className="halo drift-c"
        style={{
          width: "72vw",
          height: "72vw",
          right: "-24vw",
          top: "4vw",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-violet) 48%, transparent) 0%, transparent 62%)",
          opacity: soft ? 0.32 : 0.66,
        }}
      />
      <div
        className="halo drift-d"
        style={{
          width: "56vw",
          height: "56vw",
          left: "6vw",
          bottom: "-32vw",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-indigo) 46%, transparent) 0%, transparent 62%)",
          opacity: soft ? 0.28 : 0.55,
        }}
      />
      {/* Voile qui ramène le fond au noir violacé et garantit le contraste du texte */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 0%, color-mix(in oklch, var(--color-void) 72%, transparent) 55%, var(--color-void) 100%)",
        }}
      />
    </div>
  );
}
