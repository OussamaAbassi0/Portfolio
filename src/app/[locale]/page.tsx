import { notFound } from "next/navigation";
import { getDict, getCases, isLocale, CONTACT } from "@/content";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Process from "@/components/Process";
import StackSection from "@/components/StackSection";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oussamaabassi.com";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const d = getDict(locale);
  const cases = getCases(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Oussama Abassi",
        inLanguage: locale === "fr" ? "fr-FR" : "en-US",
        publisher: { "@id": `${SITE}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: "Oussama Abassi",
        jobTitle:
          locale === "fr"
            ? "Ingénieur freelance — automatisation IA et data"
            : "Freelance engineer — AI automation and data",
        description: d.meta.description,
        image: `${SITE}/photo-oussama.png`,
        email: `mailto:${CONTACT.email}`,
        telephone: "+33679634996",
        url: SITE,
        sameAs: [CONTACT.linkedin, CONTACT.upwork, CONTACT.malt],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Paris",
          addressCountry: "FR",
        },
        // Ces compétences déclarées aident Google à comprendre sur quelles
        // requêtes la page mérite d'être proposée.
        knowsAbout: [
          "n8n",
          "Workflow automation",
          "Web scraping",
          "Data pipelines",
          "Large language models",
          "OpenAI GPT-4o",
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "Supabase",
          "Python",
          "Business intelligence dashboards",
        ],
        knowsLanguage: ["fr", "en", "ar"],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "ESI Green & Social Business School",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE}/#service`,
        name: "Oussama Abassi",
        description: d.meta.description,
        url: `${SITE}/${locale}`,
        image: `${SITE}/og-image.png`,
        provider: { "@id": `${SITE}/#person` },
        priceRange: "$$",
        areaServed: [
          { "@type": "Country", name: "France" },
          { "@type": "Place", name: "Europe" },
        ],
        // Le catalogue de services : c'est ce qui permet à Google d'associer
        // le site à des recherches précises du type « freelance n8n ».
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "fr" ? "Prestations" : "Services",
          itemListElement: d.services.items.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.line },
          })),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          bestRating: "5",
          reviewCount: String(d.reviews.items.length),
        },
        review: d.reviews.items.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name },
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          reviewBody: r.text,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/${locale}#faq`,
        mainEntity: d.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav d={d} locale={locale} />
      <main id="main">
        <Hero d={d} />
        <Metrics d={d} />
        <Services d={d} locale={locale} />
        <Cases d={d} locale={locale} cases={cases} />
        <Process d={d} />
        <StackSection d={d} />
        <About d={d} />
        <Reviews d={d} />
        <Faq d={d} />
        <Contact d={d} locale={locale} />
      </main>
      <Footer d={d} locale={locale} />
    </>
  );
}
