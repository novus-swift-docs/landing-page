import type { Attribution, TrafficSource } from "./types";

const FIRST_TOUCH_KEY = "nl_attribution_first";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

// Known referring hosts, normalized to a single source token. Order doesn't
// matter; lookup is by exact registrable-domain match on the referrer host.
const HOST_SOURCE_MAP: Record<string, TrafficSource> = {
  "linkedin.com": "linkedin",
  "www.linkedin.com": "linkedin",
  "reddit.com": "reddit",
  "www.reddit.com": "reddit",
  "old.reddit.com": "reddit",
  "whatsapp.com": "whatsapp",
  "web.whatsapp.com": "whatsapp",
  "facebook.com": "facebook",
  "www.facebook.com": "facebook",
  "m.facebook.com": "facebook",
  "instagram.com": "instagram",
  "www.instagram.com": "instagram",
  "l.instagram.com": "instagram",
  "twitter.com": "twitter",
  "x.com": "twitter",
  "t.co": "twitter",
  "google.com": "google",
  "www.google.com": "google",
  "bing.com": "bing",
  "www.bing.com": "bing",
};

function normalizeHost(referrer: string): TrafficSource | null {
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (HOST_SOURCE_MAP[host]) return HOST_SOURCE_MAP[host];
    // Fall back to a suffix match for locale subdomains (e.g. pk.linkedin.com).
    const known = Object.keys(HOST_SOURCE_MAP).find((h) => host.endsWith(h));
    return known ? HOST_SOURCE_MAP[known] : "referral";
  } catch {
    return null;
  }
}

function readUtmParams(search: string) {
  const params = new URLSearchParams(search);
  const out: Record<string, string | null> = {};
  for (const key of UTM_PARAMS) out[key] = params.get(key);
  return out;
}

/** Computes attribution for the *current* page load, from UTM params first, then referrer, then direct. */
export function resolveCurrentAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { source: "unknown", medium: null, campaign: null, content: null, term: null, referrer: null, landingPage: "/" };
  }

  const utm = readUtmParams(window.location.search);
  const referrer = document.referrer || null;
  const landingPage = window.location.pathname;

  if (utm.utm_source) {
    const known = (Object.values(HOST_SOURCE_MAP) as string[]).includes(utm.utm_source.toLowerCase())
      ? (utm.utm_source.toLowerCase() as TrafficSource)
      : (utm.utm_source.toLowerCase() as TrafficSource);
    return {
      source: known,
      medium: utm.utm_medium,
      campaign: utm.utm_campaign,
      content: utm.utm_content,
      term: utm.utm_term,
      referrer,
      landingPage,
    };
  }

  if (referrer) {
    let referrerIsSameSite = false;
    try {
      referrerIsSameSite = new URL(referrer).hostname === window.location.hostname;
    } catch {
      referrerIsSameSite = false;
    }
    if (referrerIsSameSite) {
      return { source: "direct", medium: null, campaign: null, content: null, term: null, referrer: null, landingPage };
    }
    const source = normalizeHost(referrer) ?? "referral";
    return { source, medium: "referral", campaign: null, content: null, term: null, referrer, landingPage };
  }

  return { source: "direct", medium: null, campaign: null, content: null, term: null, referrer: null, landingPage };
}

/** First-touch attribution persists for the lifetime of the visitor (first-party localStorage, no cross-site tracking). */
export function getOrSetFirstTouchAttribution(): Attribution {
  const current = resolveCurrentAttribution();
  if (typeof window === "undefined") return current;

  try {
    const stored = window.localStorage.getItem(FIRST_TOUCH_KEY);
    if (stored) return JSON.parse(stored) as Attribution;
    window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(current));
    return current;
  } catch {
    // Storage unavailable (private mode, blocked, quota) — fall back to current-touch only.
    return current;
  }
}
