import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCase, getCases } from "@/content";
import CaseStudyPage from "@/components/CaseStudyPage";

export function generateStaticParams() {
  return getCases("fr").map((c) => ({ locale: "fr", slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getCase(locale, slug);
  if (!c) return {};
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oussamaabassi.com";
  const description = `${c.kicker} — ${c.problem.slice(0, 150)}`;
  return {
    title: `${c.title} — étude de cas | Oussama Abassi`,
    description,
    keywords: c.stack,
    alternates: {
      canonical: `/${locale}/travaux/${slug}`,
      languages: { fr: `/fr/travaux/${slug}`, en: `/en/work/${slug}` },
    },
    openGraph: {
      title: c.title,
      description,
      url: `${site}/fr/travaux/${slug}`,
      type: "article",
      locale: "fr_FR",
      images: [c.images?.[0]?.src ?? "/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description,
      images: [c.images?.[0]?.src ?? "/og-image.png"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "fr") notFound();
  return <CaseStudyPage locale={locale} slug={slug} />;
}
