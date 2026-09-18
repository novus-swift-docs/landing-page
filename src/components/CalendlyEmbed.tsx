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
  // Deliberately distinct from `scriptLoaded`: our own <script> tag finishing
  // is only the first of three sequential network hops before there's
  // anything to look at — widget.js has to load, then parse the DOM and
  // inject its own <iframe>, then THAT iframe has to load Calendly's booking
  // app and fetch real-time availability. Swapping the skeleton out the
  // instant `scriptLoaded` flips (the old behavior) left a blank div for
  // that entire remaining chain — most of it is Calendly's own iframe,
  // outside this app's control, but the skeleton should stay up for it
  // instead of disappearing early.
  const [contentReady, setContentReady] = useState(false);
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

  // Calendly's widget.js doesn't inject its <iframe> into `.calendly-inline-widget`
  // the instant it loads — it does so once it's finished parsing the page, which
  // can lag a moment behind `scriptLoaded`. Watch for that iframe to actually
  // appear, then for ITS `load` event (fired even for a cross-origin iframe,
  // though its contents stay opaque to us) — that's the closest signal available
  // to "there is something to look at now" without Calendly exposing a real
  // "ready" postMessage event.
  useEffect(() => {
    if (!scriptLoaded || !containerRef.current) return;
    const host = containerRef.current.querySelector(".calendly-inline-widget");
    if (!host) return;

    function onIframeLoad() {
      setContentReady(true);
    }

    const existing = host.querySelector("iframe");
    if (existing) {
      existing.addEventListener("load", onIframeLoad, { once: true });
      return () => existing.removeEventListener("load", onIframeLoad);
    }

    const observer = new MutationObserver(() => {
      const iframe = host.querySelector("iframe");
      if (iframe) {
        iframe.addEventListener("load", onIframeLoad, { once: true });
        observer.disconnect();
      }
    });
    observer.observe(host, { childList: true });
    return () => observer.disconnect();
  }, [scriptLoaded]);

  // Safety fallback: if Calendly ever changes how it injects its iframe (or
  // the load event doesn't fire for some edge case we can't reproduce here),
  // this guarantees the skeleton clears on its own after a few seconds
  // instead of staying stuck forever — degrading back to the old behavior,
  // not to a broken one.
  useEffect(() => {
    if (!scriptLoaded) return;
    const timeout = setTimeout(() => setContentReady(true), 4000);
    return () => clearTimeout(timeout);
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
      {/* 1050px, not Calendly's often-quoted 700px minimum: 700px is only
          enough for the narrowest case (a single date already selected).
          Once a visitor is choosing a date AND a time, with a timezone
          selector on top, Calendly's own content needs more vertical room
          than that and falls back to scrolling INSIDE the 700px box instead
          of the page scrolling normally, since the widget has no way to grow
          its own container. A taller fixed height gives that content room to
          render fully so the visitor scrolls the page, not a cramped
          sub-panel. */}
      {!contentReady && (
        <div
          className="w-full border animate-pulse"
          style={{ height: 1050, background: "var(--bg-raised)", borderColor: "var(--line)", borderRadius: 8 }}
          aria-hidden="true"
        />
      )}
      {inView && (
        <div
          className="calendly-inline-widget"
          data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0e1b22&text_color=e9eef1&primary_color=4fc1e9`}
          style={{ minWidth: "280px", height: "1050px", display: contentReady ? "block" : "none" }}
        />
      )}
    </div>
  );
}
