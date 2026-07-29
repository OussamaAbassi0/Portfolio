import type { MetadataRoute } from "next";
import { getCases } from "@/content";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oussamaabassi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/fr`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { fr: `${SITE}/fr`, en: `${SITE}/en` } },
    },
    {
      url: `${SITE}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { fr: `${SITE}/fr`, en: `${SITE}/en` } },
    },
  ];

  // Les projets approfondis passent devant les fiches compactes : le sitemap
  // indique à Google lesquelles de nos pages méritent le plus d'attention.
  const cases = getCases("fr").flatMap((c) => {
    const priority = c.featured ? 0.9 : 0.7;
    const languages = {
      fr: `${SITE}/fr/travaux/${c.slug}`,
      en: `${SITE}/en/work/${c.slug}`,
    };
    return [
      {
        url: `${SITE}/fr/travaux/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
      {
        url: `${SITE}/en/work/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
    ];
  });

  const legal: MetadataRoute.Sitemap = [
    { url: `${SITE}/fr/mentions-legales`, lastModified: now, priority: 0.2 },
    { url: `${SITE}/en/legal`, lastModified: now, priority: 0.2 },
  ];

  return [...home, ...cases, ...legal];
}
