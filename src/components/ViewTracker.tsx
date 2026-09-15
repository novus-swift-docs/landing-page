"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import type { AnalyticsEvent, EventProperties } from "@/lib/analytics/types";

/** Invisible sentinel: fires one analytics event the first time its parent section scrolls into view. */
export default function ViewTracker({
  event,
  properties,
  label,
  threshold = 0.4,
}: {
  event: AnalyticsEvent;
  properties?: EventProperties;
  label?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackEvent(event, properties, { label });
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Deliberately NOT position:absolute — without a positioned ancestor that
  // would escape to document flow near the top of the page (often computed
  // against <body>), firing the observer as soon as the page loads instead
  // of when this section actually scrolls into view. Kept in normal flow
  // (a 1x1 inline box costs nothing visually) so its position matches
  // exactly where the caller placed it.
  return <span ref={ref} aria-hidden="true" style={{ display: "inline-block", width: 1, height: 1 }} />;
}
