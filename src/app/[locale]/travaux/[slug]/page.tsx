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
  return {
    title: `${c.title} — Oussama Abassi`,
    description: c.problem.slice(0, 175),
    alternates: {
      canonical: `/${locale}/travaux/${slug}`,
      languages: { fr: `/fr/travaux/${slug}`, en: `/en/work/${slug}` },
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
