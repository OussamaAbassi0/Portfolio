import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client serveur uniquement. La clé service_role ne doit jamais atteindre le
 * navigateur : aucune policy RLS n'est ouverte à anon, toutes les écritures
 * passent par les Server Actions et les route handlers.
 */
let client: SupabaseClient | null = null;

export function db(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

/** Hachage salé de l'IP : on garde de quoi limiter les abus, jamais l'IP. */
export async function hashIp(ip: string | null): Promise<string | null> {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "";
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
