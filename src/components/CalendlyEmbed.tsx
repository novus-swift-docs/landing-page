"use client";

import { useEffect, useRef, useState } from "react";
import { CALENDLY_URL, isCalendlyConfigured } from "@/lib/calendly";
import { trackEvent } from "@/lib/analytics";

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Official Calendly inline embed, loaded lazily (only once this section is
 * actually in view) so it never costs anything on pages that don't render
 * it. Availability itself — which dates and times are bookable — comes
 * entirely from Calendly; nothing here hard-codes a schedule.
 *
 * Event detection uses Calendly's documented postMessage API
 * (https://help.calendly.com/hc/en-us/articles/223147027): we only ever
 * distinguish "widget opened" from "event_scheduled" using messages
 * Calendly itself sends, never a guess.
 */
export default function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  // Lazy initializer (runs once at mount, not as an effect side-effect) so a
  // second visit to this page in the same session — the script tag persists
  // in <body> across client-side navigations — is detected immediately
  // instead of re-appending a duplicate <script>.
  const [scriptLoaded, setScriptLoaded] = useState(
    () => typeof document !== "undefined" && !!document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`)
  );
  const hasTrackedOpen = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !isCalendlyConfigured || scriptLoaded) return;
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, [inView, scriptLoaded]);

  useEffect(() => {
    if (!scriptLoaded) return;
    if (!hasTrackedOpen.current) {
      hasTrackedOpen.current = true;
      trackEvent("calendly_open");
    }

    function onMessage(e: MessageEvent) {
      if (typeof e.data !== "object" || e.data === null) return;
      if (e.data.event === "calendly.event_scheduled") {
        trackEvent("calendly_event_scheduled");
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [scriptLoaded]);

  if (!isCalendlyConfigured) {
    return (
      <div className="panel p-6 text-center" style={{ borderColor: "var(--line)" }}>
        <p className="font-mono text-[13px]" style={{ color: "var(--muted)" }}>
          Scheduling is being set up. In the meantime, reach out at{" "}
          <a href="mailto:info@novuslabshq.com" className="border-b pb-px" style={{ color: "var(--text)", borderColor: "var(--signal)" }}>
            info@novuslabshq.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      {!scriptLoaded && (
        <div
          className="w-full border animate-pulse"
          style={{ height: 700, background: "var(--bg-raised)", borderColor: "var(--line)", borderRadius: 8 }}
          aria-hidden="true"
        />
      )}
      {inView && (
        <div
          className="calendly-inline-widget"
          data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0e1b22&text_color=e9eef1&primary_color=4fc1e9`}
          style={{ minWidth: "280px", height: "700px", display: scriptLoaded ? "block" : "none" }}
        />
      )}
    </div>
  );
}
