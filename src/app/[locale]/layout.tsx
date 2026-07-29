import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { getDict, isLocale, LOCALES, type Locale } from "@/content";
import SmoothScroll from "@/components/SmoothScroll";
import RevealFallback from "@/components/RevealFallback";
import ChatBubble from "@/components/ChatBubble";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oussamaabassi.com";

/**
 * Mots-clés de positionnement. Google ne lit plus la balise keywords, mais
 * cette liste sert de garde-fou éditorial : chacun de ces termes doit se
 * retrouver naturellement dans le texte des pages, sinon on ne se positionnera
 * pas dessus. C'est le contenu qui classe, pas la balise.
 */
const KEYWORDS_FR = [
  "freelance automatisation",
  "expert n8n",
  "freelance IA",
  "web scraping freelance",
  "pipeline de données",
  "développeur Next.js freelance",
  "agent IA sur mesure",
  "dashboard sur mesure",
  "automatisation des processus",
  "freelance data Paris",
];

const KEYWORDS_EN = [
  "freelance automation engineer",
  "n8n expert",
  "freelance AI developer",
  "web scraping freelance",
  "data pipeline engineer",
  "freelance Next.js developer",
  "custom AI agent",
  "custom dashboard",
  "business process automation",
  "freelance data engineer Paris",
];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale);
  const fr = locale === "fr";

  return {
    metadataBase: new URL(SITE),
    title: d.meta.title,
    description: d.meta.description,
    keywords: fr ? KEYWORDS_FR : KEYWORDS_EN,
    authors: [{ name: "Oussama Abassi", url: SITE }],
    creator: "Oussama Abassi",
    publisher: "Oussama Abassi",
    applicationName: "Oussama Abassi",
    category: fr ? "Technologie" : "Technology",
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      url: `${SITE}/${locale}`,
      siteName: "Oussama Abassi",
      locale: fr ? "fr_FR" : "en_US",
      alternateLocale: fr ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: fr
            ? "Oussama Abassi — freelance automatisation IA et data"
            : "Oussama Abassi — freelance AI automation and data engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
      images: ["/og-image.png"],
    },
    // Les directives détaillées disent à Google d'afficher un extrait long et
    // une grande image dans ses résultats, au lieu d'une vignette minuscule.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#0A0510",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${instrument.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Navigation instantanée : le navigateur préchauffe les pages survolées */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [{ where: { href_matches: "/*" }, eagerness: "moderate" }],
            }),
          }}
        />
      </head>
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-full focus:bg-magenta focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-void"
        >
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <SmoothScroll />
        <RevealFallback />
        {children}
        <ChatBubble d={d} locale={locale as Locale} />
      </body>
    </html>
  );
}
