import type { ServiceKey } from "@/content/types";

const P = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const paths: Record<ServiceKey, React.ReactNode> = {
  data: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.8" {...P} />
      <path d="M5 5.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" {...P} />
      <path d="M5 11.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" {...P} />
    </>
  ),
  ai: (
    <>
      <rect x="7.5" y="7.5" width="9" height="9" rx="2.5" {...P} />
      <path d="M10 4v3.5M14 4v3.5M10 16.5V20M14 16.5V20M4 10h3.5M4 14h3.5M16.5 10H20M16.5 14H20" {...P} />
    </>
  ),
  dashboards: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" {...P} />
      <path d="M3 9h18M8 13v4M12 12v5M16 14.5v2.5" {...P} />
    </>
  ),
  web: (
    <>
      <path d="M8.5 8.5L5 12l3.5 3.5M15.5 8.5L19 12l-3.5 3.5M13.5 6l-3 12" {...P} />
    </>
  ),
  apps: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" {...P} />
      <path d="M10.5 5.5h3M11 18.5h2" {...P} />
    </>
  ),
  chatbots: (
    <>
      <path d="M20 12.5c0 3.9-3.58 7-8 7-1.02 0-2-.17-2.9-.47L4 20.5l1.6-3.6A6.6 6.6 0 014 12.5c0-3.87 3.58-7 8-7s8 3.13 8 7z" {...P} />
      <path d="M9 12h.01M12 12h.01M15 12h.01" {...P} strokeWidth={2} />
    </>
  ),
  ecommerce: (
    <>
      <path d="M3.5 4h2.2l2 11.2h9.6M7.3 12.5h10l1.6-6.3H6.2" {...P} />
      <circle cx="9.5" cy="19" r="1.4" {...P} />
      <circle cx="16.5" cy="19" r="1.4" {...P} />
    </>
  ),
  design: (
    <>
      <path d="M12 3.5a8.5 8.5 0 100 17c1.1 0 1.9-.86 1.9-1.9 0-.5-.2-.95-.5-1.28a1.9 1.9 0 011.4-3.19h1.9A3.8 3.8 0 0020.5 10c0-3.6-3.8-6.5-8.5-6.5z" {...P} />
      <circle cx="8" cy="10.5" r="1.1" {...P} />
      <circle cx="12" cy="7.8" r="1.1" {...P} />
      <circle cx="15.8" cy="10.5" r="1.1" {...P} />
    </>
  ),
};

export function ServiceIcon({ name, className }: { name: ServiceKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      {paths[name]}
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden focusable="false">
      <path d="M3 8h10M9 4l4 4-4 4" {...P} />
    </svg>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden focusable="false">
      <path d="M8 1l2.06 4.44L15 6.1l-3.6 3.36.9 4.94L8 12.1l-4.3 2.3.9-4.94L1 6.1l4.94-.66L8 1z" />
    </svg>
  );
}
