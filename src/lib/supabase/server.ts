import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Import ONLY from server code (API routes,
 * server actions) — the `server-only` import above makes it a build error
 * to pull this into a client component by accident. This key bypasses RLS,
 * which is exactly why contact_messages has no anon policy: only this
 * client, running on the server, can read or write it.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
