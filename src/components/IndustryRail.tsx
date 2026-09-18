"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { industrySolutions } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";

export default function IndustryRail() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotionSafe();
  const current = industrySolutions[active];

  function select(i: number) {
    if (i === active) return;
    setActive(i);
    trackEvent("cta_click", { industry: industrySolutions[i].slug }, { label: "industry-rail" });
  }

  return (
    <div>
      {/* overflow-y-hidden is required, not decorative: per the CSS Overflow
          spec, an element with overflow-x set to anything but "visible"
          while overflow-y stays "visible" has overflow-y computed as "auto"
          instead — so overflow-x-auto alone silently makes this row
          vertically scrollable too, and Windows' classic (non-overlay)
          scrollbar renders for it even though nothing here overflows
          vertically. Same root cause documented in globals.css. */}
      <div
        className="flex gap-0 overflow-x-auto overflow-y-hidden sm:flex-wrap border-b"
        style={{ borderColor: "var(--line)", scrollSnapType: "x proximity" }}
      >
        {industrySolutions.map((ind, i) => (
          <button
            key={ind.slug}
            type="button"
            onClick={() => select(i)}
            className="shrink-0 font-display text-[14px] sm:text-[15px] px-4 sm:px-5 py-4 transition-colors cursor-pointer relative"
            style={{ color: active === i ? "var(--text)" : "var(--muted)", fontWeight: active === i ? 600 : 500, scrollSnapAlign: "start" }}
            aria-pressed={active === i}
          >
            {ind.name}
            {/* A per-tab scaleX reveal, not a shared layoutId sliding between
                tabs: a cross-tab `layoutId` animation is projected using
                transforms computed from each tab's on-screen position, which
                can visibly paint the moving underline over the intervening
                tab labels' text while it's in flight between an old and new
                tab. Confining the indicator to its own button (an
                origin-left scale, no cross-element travel) removes that
                possibility structurally instead of masking it with z-index. */}
            <motion.span
              className="absolute left-0 right-0 bottom-[-1px] h-[2px] origin-left"
              style={{ background: "var(--signal)" }}
              initial={false}
              animate={{ scaleX: active === i ? 1 : 0, opacity: active === i ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      <div className="pt-10 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={reduced ? undefined : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr] gap-6 sm:gap-12 items-start"
          >
            <div className="font-display text-[26px] sm:text-[32px] font-semibold leading-[1.05]">{current.name}</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {current.points.map((pt) => (
                <div key={pt} className="text-[14px] sm:text-[15px] py-2 border-t" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
                  {pt}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
