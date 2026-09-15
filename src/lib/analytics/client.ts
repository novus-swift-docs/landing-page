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

export function upsertVisitor(row: VisitorRow): void {
  void safeWrite((db) =>
    db.from("visitors").upsert(
      {
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
      },
      { onConflict: "visitor_id" }
    )
  );
}

export function insertSession(row: SessionRow): void {
  void safeWrite((db) => db.from("sessions").insert(row));
}

export function updateSessionEnd(sessionId: string, endedAt: string, durationSeconds: number, exitPage: string): void {
  void safeWrite((db) =>
    db.from("sessions").update({ ended_at: endedAt, duration_seconds: durationSeconds, exit_page: exitPage }).eq("session_id", sessionId)
  );
}

export function insertEvent(row: EventRow): void {
  void safeWrite((db) => db.from("events").insert(row));
}
