/**
 * Logos officiels des marques, servis en local depuis /public/logos.
 * Rendus en `mask-image` plutôt qu'en `<img>` : la couleur est alors pilotée
 * par la charte du site, on garde un rendu monochrome cohérent, et on évite
 * 40 fichiers PNG aux styles hétérogènes.
 *
 * Trois marques ne sont pas couvertes par le jeu d'icônes (Apify, Groq,
 * Lemlist) : elles s'affichent en texte, ce qui reste parfaitement lisible.
 */

const SLUGS: Record<string, string> = {
  // automatisation
  n8n: "n8n",
  make: "make",
  zapier: "zapier",
  playwright: "playwright",
  // ia
  openai: "openai",
  anthropic: "anthropic",
  gemini: "googlegemini",
  "vercel ai sdk": "vercel",
  // data
  postgresql: "postgresql",
  supabase: "supabase",
  airtable: "airtable",
  "aws rds": "amazonrds",
  redis: "redis",
  neon: "neon",
  prisma: "prisma",
  // web
  "next.js": "nextdotjs",
  "next.js 16": "nextdotjs",
  typescript: "typescript",
  "typescript strict": "typescript",
  react: "react",
  "react 19": "react",
  tailwind: "tailwindcss",
  "react native": "react",
  javascript: "javascript",
  python: "python",
  wordpress: "wordpress",
  // infra
  vercel: "vercel",
  "aws ec2": "amazonec2",
  docker: "docker",
  "github actions": "githubactions",
  github: "github",
  cloudflare: "cloudflare",
  // livraison
  resend: "resend",
  stripe: "stripe",
  twilio: "twilio",
  "google apis": "googlesheets",
  "google sheets api": "googlesheets",
  "google maps api": "googlemaps",
  // plateformes
  upwork: "upwork",
  malt: "malt",
  linkedin: "linkedin",
  whatsapp: "whatsapp",
  figma: "figma",
  notion: "notion",
};

export function brandSlug(name: string): string | null {
  return SLUGS[name.trim().toLowerCase()] ?? null;
}

export default function BrandIcon({
  name,
  className = "size-4",
}: {
  name: string;
  className?: string;
}) {
  const slug = brandSlug(name);
  if (!slug) return null;
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: `url(/logos/${slug}.svg)`,
        WebkitMaskImage: `url(/logos/${slug}.svg)`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
