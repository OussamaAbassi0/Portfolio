import { fr } from "./fr";
import { en } from "./en";
import { casesFr, casesEn } from "./cases";
import { DEFAULT_LOCALE, LOCALES, type Locale, type Dict, type CaseStudy } from "./types";

const dicts: Record<Locale, Dict> = { fr, en };
const cases: Record<Locale, CaseStudy[]> = { fr: casesFr, en: casesEn };

export function isLocale(v: string): v is Locale {
  return (LOCALES as string[]).includes(v);
}

export function getDict(locale: string): Dict {
  return dicts[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

export function getCases(locale: string): CaseStudy[] {
  return cases[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

export function getCase(locale: string, slug: string): CaseStudy | undefined {
  return getCases(locale).find((c) => c.slug === slug);
}

/** Liens sociaux et coordonnées — source unique */
export const CONTACT = {
  email: "oussama.abassi.work@gmail.com",
  whatsapp: "https://wa.me/33679634996",
  whatsappLabel: "+33 6 79 63 49 96",
  linkedin: "https://www.linkedin.com/in/oussama-abassi/",
  upwork: "https://www.upwork.com/freelancers/~01e9d7e582881baac8",
  malt: "https://www.malt.fr/profile/oussamaabassi1",
} as const;

export { DEFAULT_LOCALE, LOCALES };
export type { Locale, Dict, CaseStudy };
