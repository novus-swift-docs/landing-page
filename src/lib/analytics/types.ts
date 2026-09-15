/**
 * Central event name registry. All tracking calls go through `trackEvent`
 * with one of these names — never a raw string — so a typo fails at
 * compile time instead of silently creating a new, uncounted event in
 * Supabase.
 */
export type AnalyticsEvent =
  | "page_view"
  | "session_start"
  | "session_end"
  | "cta_click"
  | "navigation_click"
  | "project_view"
  | "project_demo_click"
  | "linkedin_click"
  | "service_view"
  | "testimonial_interaction"
  | "outbound_link_click"
  | "scroll_depth"
  | "contact_form_viewed"
  | "contact_form_started"
  | "contact_form_submitted"
  | "contact_form_success"
  | "contact_form_error"
  | "calendly_open"
  | "calendly_event_scheduled";

export type EventProperties = Record<string, string | number | boolean | null | undefined>;

export type DeviceCategory = "mobile" | "tablet" | "desktop";

/** Normalized acquisition source. Anything unrecognized falls back to "unknown". */
export type TrafficSource =
  | "linkedin"
  | "reddit"
  | "whatsapp"
  | "facebook"
  | "instagram"
  | "twitter"
  | "google"
  | "bing"
  | "direct"
  | "referral"
  | "unknown";

export type Attribution = {
  source: TrafficSource;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  referrer: string | null;
  landingPage: string;
};

export type VisitorRow = {
  visitor_id: string;
  first_seen_at: string;
  last_seen_at: string;
  session_count: number;
  first_referrer: string | null;
  latest_referrer: string | null;
  first_landing_page: string;
  latest_landing_page: string;
  source: TrafficSource;
  medium: string | null;
  campaign: string | null;
  device_category: DeviceCategory;
  browser: string;
  os: string;
};

export type SessionRow = {
  session_id: string;
  visitor_id: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  landing_page: string;
  exit_page: string | null;
  referrer: string | null;
  source: TrafficSource;
  medium: string | null;
  campaign: string | null;
  device_category: DeviceCategory;
};

export type EventRow = {
  visitor_id: string;
  session_id: string;
  event_name: AnalyticsEvent;
  page_path: string;
  element_id: string | null;
  element_label: string | null;
  event_properties: EventProperties | null;
  occurred_at: string;
};
