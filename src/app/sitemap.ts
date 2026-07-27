import type { MetadataRoute } from "next";
import { getCases } from "@/content";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oussamaabassi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/fr`,
      lastModified: now,
      priority: 1,
      alternates: { languages: { fr: `${SITE}/fr`, en: `${SITE}/en` } },
    },
    {
      url: `${SITE}/en`,
      lastModified: now,
      priority: 1,
      alternates: { languages: { fr: `${SITE}/fr`, en: `${SITE}/en` } },
    },
  ];

  const cases = getCases("fr").flatMap((c) => [
    {
      url: `${SITE}/fr/travaux/${c.slug}`,
      lastModified: now,
      priority: 0.8,
      alternates: {
        languages: { fr: `${SITE}/fr/travaux/${c.slug}`, en: `${SITE}/en/work/${c.slug}` },
      },
    },
    {
      url: `${SITE}/en/work/${c.slug}`,
      lastModified: now,
      priority: 0.8,
      alternates: {
        languages: { fr: `${SITE}/fr/travaux/${c.slug}`, en: `${SITE}/en/work/${c.slug}` },
      },
    },
  ]);

  return [...home, ...cases];
}
