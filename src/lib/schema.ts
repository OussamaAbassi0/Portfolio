import { z } from "zod";

export const PROJECT_TYPES = ["automation", "web", "app", "data", "design", "other"] as const;
export const BUDGETS = ["lt2k", "2-5k", "5-15k", "gt15k", "tbd"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "tooShort").max(120),
  email: z.string().trim().toLowerCase().email("invalidEmail").max(180),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  projectType: z.enum(PROJECT_TYPES),
  budgetRange: z.enum(BUDGETS).optional(),
  message: z.string().trim().min(10, "tooShort").max(4000),
  locale: z.enum(["fr", "en"]).default("fr"),
  // Anti-spam : champ leurre invisible + horodatage d'ouverture du formulaire
  website: z.string().max(0).optional(),
  startedAt: z.coerce.number().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const chatTurnSchema = z.object({
  sessionId: z.string().uuid().nullable(),
  step: z.string().min(1).max(40),
  value: z.string().trim().max(4000),
  locale: z.enum(["fr", "en"]).default("fr"),
  freeform: z.boolean().default(false),
});

/** Le formulaire rempli en moins de 2 secondes n'a pas été rempli par un humain. */
export function looksAutomated(startedAt?: number): boolean {
  if (!startedAt) return false;
  return Date.now() - startedAt < 2000;
}
