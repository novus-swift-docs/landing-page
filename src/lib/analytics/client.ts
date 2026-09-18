import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { EventRow, SessionRow, VisitorRow } from "./types";

/**
 * Analytics must never break the site (see build spec §48). Every function
 * in this module swallows its own errors and resolves quietly — a missing
 * env var, a network failure, or a blocked request degrades to "no
 * analytics this load," never a broken button or a thrown render.
 */

let client: SupabaseClient | null | undefined;

function getClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    client = null;
    return client;
  }

  try {
    client = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch {
    client = null;
  }
  return client;
}

async function safeWrite(fn: (db: SupabaseClient) => PromiseLike<unknown>): Promise<void> {
  const db = getClient();
  if (!db) return;
  try {
    await fn(db);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] write failed (non-fatal):", err);
    }
  }
}

/**
 * Plain INSERT, falling back to a plain UPDATE on a duplicate key — not
 * `.upsert()`/`ON CONFLICT DO UPDATE`. Postgres RLS requires SELECT
 * privilege on the table to evaluate the conflict target for an
 * `INSERT ... ON CONFLICT DO UPDATE`, even though the row itself is only
 * ever inserted or updated — but `visitors` deliberately has no SELECT
 * policy for `anon` (see the migration's comment: visitors can write their
 * own row but never read any row back, including their own). Under that
 * policy set, `.upsert()` fails every single call with "new row violates
 * row-level security policy," which silently swallows every visitor
 * row (`safeWrite` never surfaces the error). Two separate statements route
 * around the implicit SELECT entirely: INSERT only needs its WITH CHECK,
 * and UPDATE only needs its USING/WITH CHECK — neither needs SELECT.
 *
 * The UPDATE path also intentionally omits first_seen_at/first_referrer/
 * first_landing_page/source/medium/campaign/session_count — those are
 * first-touch attribution and a first-insert-only hint (see VisitorRow),
 * and must never be overwritten by a later visit.
 */
export function upsertVisitor(row: VisitorRow): Promise<void> {
  return safeWrite(async (db) => {
    const { error } = await db.from("visitors").insert({
      visitor_id: row.visitor_id,
      first_seen_at: row.first_seen_at,
      last_seen_at: row.last_seen_at,
      session_count: row.session_count,
      first_referrer: row.first_referrer,
      latest_referrer: row.latest_referrer,
      first_landing_page: row.first_landing_page,
      latest_landing_page: row.latest_landing_page,
      source: row.source,
      medium: row.medium,
      campaign: row.campaign,
      device_category: row.device_category,
      browser: row.browser,
      os: row.os,
    });

    if (!error) return;
    if (error.code !== "23505") throw error;

    const { error: updateError } = await db
      .from("visitors")
      .update({
        last_seen_at: row.last_seen_at,
        latest_referrer: row.latest_referrer,
        latest_landing_page: row.latest_landing_page,
        device_category: row.device_category,
        browser: row.browser,
        os: row.os,
      })
      .eq("visitor_id", row.visitor_id);
    if (updateError) throw updateError;
  });
}

export function insertSession(row: SessionRow): Promise<void> {
  return safeWrite((db) => db.from("sessions").insert(row));
}

export function updateSessionEnd(sessionId: string, endedAt: string, durationSeconds: number, exitPage: string): void {
  void safeWrite((db) =>
    db.from("sessions").update({ ended_at: endedAt, duration_seconds: durationSeconds, exit_page: exitPage }).eq("session_id", sessionId)
  );
}

export function insertEvent(row: EventRow): void {
  void safeWrite((db) => db.from("events").insert(row));
}
