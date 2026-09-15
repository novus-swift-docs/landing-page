// Centralized so it's changed in exactly one place. Falls back to a clearly
// fake placeholder rather than a real Novus Labs URL, so a missing env var
// fails obviously in the UI instead of silently pointing at nothing.
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "REPLACE_WITH_NOVUS_LABS_CALENDLY_URL";

export const isCalendlyConfigured = CALENDLY_URL !== "REPLACE_WITH_NOVUS_LABS_CALENDLY_URL" && CALENDLY_URL.length > 0;
