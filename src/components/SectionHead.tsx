export default function SectionHead({
  kicker,
  title,
  sub,
  align = "left",
}: {
  kicker: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={`reveal max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="label flex items-center gap-3">
        <span
          aria-hidden
          className="inline-block h-px w-8"
          style={{ background: "var(--aurora)" }}
        />
        {kicker}
      </p>
      <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)]">{title}</h2>
      {sub && <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-dim">{sub}</p>}
    </header>
  );
}
