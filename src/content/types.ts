export type Locale = "fr" | "en";
export const LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";

export type ServiceKey =
  | "data"
  | "ai"
  | "dashboards"
  | "web"
  | "apps"
  | "chatbots"
  | "ecommerce"
  | "design";

export interface Service {
  key: ServiceKey;
  title: string;
  line: string;
  caseSlug: string;
  /** taille dans la grille bento */
  span: "hero" | "wide" | "tall" | "unit";
}

export interface ArchNode {
  id: string;
  label: string;
  sub: string;
}

export interface CaseImage {
  src: string;
  alt: string;
}

export interface CaseSection {
  title: string;
  body: string;
  /** points clés, affichés en liste sous le paragraphe */
  bullets?: string[];
}

export interface CaseStudy {
  slug: string;
  client: string;
  sector: string;
  duration: string;
  title: string;
  kicker: string;
  problem: string;
  architecture: ArchNode[];
  archNote: string;
  stack: string[];
  results: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string; source: string; url: string };
  featured: boolean;
  /** captures d'écran du projet, anonymisées */
  images?: CaseImage[];
  /** sections détaillées, affichées uniquement sur la page dédiée */
  detail?: CaseSection[];
}

export interface Review {
  name: string;
  role: string;
  platform: "Upwork" | "Malt";
  url: string;
  text: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
}

export interface Dict {
  meta: { title: string; description: string };
  nav: { work: string; services: string; process: string; about: string; cta: string };
  hero: {
    badge: string;
    title: [string, string, string];
    accent: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    proof: string[];
  };
  metrics: { value: string; label: string }[];
  services: { kicker: string; title: string; sub: string; items: Service[] };
  cases: { kicker: string; title: string; sub: string; readMore: string; similar: string };
  process: { kicker: string; title: string; sub: string; steps: ProcessStep[] };
  stack: { kicker: string; title: string; sub: string; groups: StackGroup[] };
  about: { kicker: string; title: string; body: string[]; cta: string };
  reviews: { kicker: string; title: string; sub: string; items: Review[]; all: string };
  faq: {
    kicker: string;
    title: string;
    sub: string;
    items: { q: string; a: string }[];
    cta: string;
  };
  contact: {
    kicker: string;
    title: string;
    sub: string;
    fields: {
      name: string;
      email: string;
      company: string;
      type: string;
      budget: string;
      message: string;
    };
    types: { value: string; label: string }[];
    budgets: { value: string; label: string }[];
    submit: string;
    sending: string;
    success: string;
    successBody: string;
    error: string;
    guarantees: string[];
    optional: string;
    required: string;
  };
  chat: {
    kicker: string;
    intro: string;
    start: string;
    placeholder: string;
    send: string;
    restart: string;
    steps: {
      greeting: string;
      name: string;
      email: string;
      type: string;
      budget: string;
      need: string;
      confirm: string;
    };
    invalidEmail: string;
    thinking: string;
  };
  footer: { tagline: string; nav: string; contact: string; rights: string; legal: string };
}
