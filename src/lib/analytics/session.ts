import type { DeviceCategory } from "./types";

const VISITOR_KEY = "nl_vid";
const SESSION_KEY = "nl_sid";
const SESSION_STARTED_KEY = "nl_sid_started";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes of inactivity starts a new session.

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  // Fallback for older browsers without crypto.randomUUID.
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** A random first-party UUID identifying this browser, not a person. No fingerprinting. */
export function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let id = window.localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = randomId();
      window.localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "unpersisted";
  }
}

export type SessionInfo = { id: string; isNew: boolean };

/** Reuses the current session unless it has been idle past the timeout, in which case a new one starts. */
export function getOrCreateSession(): SessionInfo {
  if (typeof window === "undefined") return { id: "server", isNew: false };
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    const lastTouch = Number(window.sessionStorage.getItem(SESSION_STARTED_KEY) ?? 0);
    const isExpired = !lastTouch || Date.now() - lastTouch > SESSION_TIMEOUT_MS;

    if (existing && !isExpired) {
      touchSession();
      return { id: existing, isNew: false };
    }

    const id = randomId();
    window.sessionStorage.setItem(SESSION_KEY, id);
    touchSession();
    return { id, isNew: true };
  } catch {
    return { id: randomId(), isNew: true };
  }
}

export function touchSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_STARTED_KEY, String(Date.now()));
  } catch {
    // Ignore — storage unavailable.
  }
}

export function getDeviceCategory(): DeviceCategory {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

/** Coarse UA parsing for reporting buckets only — never used to identify an individual. */
export function getBrowser(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome/") && !ua.includes("Chromium")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/") && !ua.includes("Chrome")) return "Safari";
  return "Other";
}

export function getOS(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Other";
}
