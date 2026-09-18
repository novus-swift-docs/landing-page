"use client";

import { getOrSetFirstTouchAttribution, resolveCurrentAttribution } from "./attribution";
import { insertEvent, insertSession, updateSessionEnd, upsertVisitor } from "./client";
import { getBrowser, getDeviceCategory, getOrCreateSession, getOS, getVisitorId, touchSession } from "./session";
import type { AnalyticsEvent, EventProperties } from "./types";

/**
 * Public analytics API. Every component should go through `trackEvent` /
 * `trackPageview` / `trackScrollDepth` here rather than touching
 * `./client` directly — this is the one place session/visitor bookkeeping
 * happens, so a raw Supabase write from a component would silently skip it.
 *
 * Bounce methodology (documented here, computed later in SQL against the
 * `events`/`sessions` tables, not tracked as a live flag): a session counts
 * as bounced if it recorded exactly one `page_view` AND no event from
 * MEANINGFUL_EVENTS occurred during it. A visitor who reads the whole
 * homepage and scrolls to 90% before leaving is engaged, not bounced, even
 * though they only ever saw one page.
 */
export const MEANINGFUL_EVENTS: ReadonlySet<AnalyticsEvent> = new Set([
  "cta_click",
  "project_view",
  "project_demo_click",
  "linkedin_click",
  "service_view",
  "testimonial_interaction",
  "outbound_link_click",
  "contact_form_started",
  "contact_form_submitted",
  "calendly_open",
]);

let sessionId = "";
let visitorId = "";
let sessionStartedAt = 0;
let initialized = false;
// Resolves once the visitor/session rows this tick's events will reference
// (via FK) are actually committed. `AnalyticsProvider` mounts and fires its
// page-view/scroll/click effects in the same tick as `initAnalytics()`, so
// without this gate, the very first `trackEvent` calls raced the in-flight
// visitor/session inserts and failed with a foreign-key violation on every
// fresh visitor — see `trackEvent` below.
let readyPromise: Promise<void> | null = null;
const scrollMilestonesSeenByPath = new Map<string, Set<number>>();

function nowIso() {
  return new Date().toISOString();
}

/**
 * Respects the browser's Do Not Track signal as a low-friction way to keep
 * this non-essential analytics off for visitors who've asked for it,
 * without needing a cookie-banner flow for what is otherwise anonymous,
 * first-party, non-fingerprinting tracking (see module docs above).
 */
function hasOptedOut(): boolean {
  if (typeof navigator === "undefined") return false;
  return navigator.doNotTrack === "1" || (window as unknown as { doNotTrack?: string }).doNotTrack === "1";
}

/** Call once, on app mount. Idempotent. No-ops entirely if the visitor has Do Not Track enabled. */
export function initAnalytics(): void {
  if (initialized || typeof window === "undefined" || hasOptedOut()) return;
  initialized = true;

  visitorId = getVisitorId();
  const { id, isNew } = getOrCreateSession();
  sessionId = id;
  sessionStartedAt = Date.now();

  const firstTouch = getOrSetFirstTouchAttribution();
  const currentTouch = resolveCurrentAttribution();

  readyPromise = (async () => {
    await upsertVisitor({
      visitor_id: visitorId,
      first_seen_at: nowIso(),
      last_seen_at: nowIso(),
      session_count: isNew ? 1 : 0, // dashboard sums session rows for a true count; this is a best-effort hint only.
      first_referrer: firstTouch.referrer,
      latest_referrer: currentTouch.referrer,
      first_landing_page: firstTouch.landingPage,
      latest_landing_page: currentTouch.landingPage,
      source: firstTouch.source,
      medium: firstTouch.medium,
      campaign: firstTouch.campaign,
      device_category: getDeviceCategory(),
      browser: getBrowser(),
      os: getOS(),
    });

    if (isNew) {
      await insertSession({
        session_id: sessionId,
        visitor_id: visitorId,
        started_at: nowIso(),
        ended_at: null,
        duration_seconds: null,
        landing_page: currentTouch.landingPage,
        exit_page: null,
        referrer: currentTouch.referrer,
        source: currentTouch.source,
        medium: currentTouch.medium,
        campaign: currentTouch.campaign,
        device_category: getDeviceCategory(),
      });
      trackEvent("session_start", { source: currentTouch.source });
    }
  })();

  window.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pagehide", flushSessionEnd);
}

function handleVisibilityChange() {
  if (document.visibilityState === "hidden") flushSessionEnd();
  else touchSession();
}

function flushSessionEnd() {
  if (!sessionId || !sessionStartedAt) return;
  const durationSeconds = Math.round((Date.now() - sessionStartedAt) / 1000);
  updateSessionEnd(sessionId, nowIso(), durationSeconds, window.location.pathname);
}

export function trackPageview(path: string): void {
  if (typeof window === "undefined") return;
  scrollMilestonesSeenByPath.set(path, new Set());
  trackEvent("page_view", { path });
}

export function trackEvent(name: AnalyticsEvent, properties?: EventProperties, elementInfo?: { id?: string; label?: string }): void {
  if (typeof window === "undefined" || !initialized) return;

  const send = () => {
    touchSession();
    insertEvent({
      visitor_id: visitorId,
      session_id: sessionId,
      event_name: name,
      page_path: window.location.pathname,
      element_id: elementInfo?.id ?? null,
      element_label: elementInfo?.label ?? null,
      event_properties: properties ?? null,
      occurred_at: nowIso(),
    });
  };

  // Queue behind the in-flight visitor/session inserts instead of racing
  // them — see `readyPromise`'s definition above.
  if (readyPromise) void readyPromise.then(send);
  else send();
}

const SCROLL_MILESTONES = [25, 50, 75, 90, 100];

export function trackScrollDepth(percent: number): void {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  const seen = scrollMilestonesSeenByPath.get(path) ?? new Set<number>();
  for (const milestone of SCROLL_MILESTONES) {
    if (percent >= milestone && !seen.has(milestone)) {
      seen.add(milestone);
      trackEvent("scroll_depth", { milestone, path });
    }
  }
  scrollMilestonesSeenByPath.set(path, seen);
}

export function trackOutboundLink(destination: string, label: string): void {
  trackEvent("outbound_link_click", { destination, label, page: window.location.pathname });
}

/** For correlating a server-side record (e.g. a contact submission) back to this browser's visitor/session. */
export function getCurrentIds(): { visitorId: string; sessionId: string } {
  return { visitorId, sessionId };
}
