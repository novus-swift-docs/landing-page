"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initAnalytics, trackEvent, trackOutboundLink, trackPageview, trackScrollDepth } from "@/lib/analytics";
import type { AnalyticsEvent } from "@/lib/analytics/types";

/**
 * Mounted once in the root layout. Owns three things: page-view tracking on
 * route change, scroll-depth milestones, and delegated click tracking for
 * any element carrying `data-track`. No component below this should touch
 * Supabase directly — see lib/analytics/index.ts for the reasoning.
 *
 * Click convention:
 *   data-track="<label>"                event_name defaults to "cta_click"
 *   data-track-event="<AnalyticsEvent>"  overrides the event name
 * A link to a different origin is auto-classified as an outbound click
 * even without data-track-event, so demo/LinkedIn links don't need to
 * remember to set it.
 */
export default function AnalyticsProvider() {
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    // initAnalytics() already fires the very first page_view via session_start's
    // context; this effect covers every subsequent client-side navigation.
    if (isFirstMount.current) {
      isFirstMount.current = false;
      trackPageview(pathname);
      return;
    }
    trackPageview(pathname);
  }, [pathname]);

  useEffect(() => {
    function computeScrollPercent() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return 100;
      return Math.min(100, Math.round((window.scrollY / scrollable) * 100));
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        trackScrollDepth(computeScrollPercent());
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!target) return;

      const label = target.getAttribute("data-track") ?? undefined;
      const explicitEvent = target.getAttribute("data-track-event") as AnalyticsEvent | null;
      const href = target instanceof HTMLAnchorElement ? target.href : undefined;

      let eventName: AnalyticsEvent = explicitEvent ?? "cta_click";
      if (!explicitEvent && href) {
        try {
          const isOutbound = new URL(href).hostname !== window.location.hostname;
          if (isOutbound) eventName = "outbound_link_click";
        } catch {
          // Relative or malformed href — leave as cta_click.
        }
      }

      if (eventName === "outbound_link_click" && href) {
        trackOutboundLink(href, label ?? "unlabeled");
      } else {
        trackEvent(eventName, href ? { destination: href } : undefined, { label });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
