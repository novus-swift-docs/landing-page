"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import IconGlyph from "@/components/IconGlyph";
import { testimonials } from "@/lib/testimonials";
import { trackEvent } from "@/lib/analytics";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotionSafe();
  const current = testimonials[active];

  function go(i: number) {
    const next = (i + testimonials.length) % testimonials.length;
    setActive(next);
    trackEvent("testimonial_interaction", { project: testimonials[next].project }, { label: testimonials[next].slug });
  }

  return (
    <div className="grid grid-cols-1 min-w-0 lg:grid-cols-[1fr_260px] gap-10 lg:gap-16 items-start">
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={reduced ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="display font-medium text-[clamp(22px,3.6vw,36px)] leading-[1.2] mb-8">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-display font-semibold text-[15px]">{current.attribution}</span>
              <span className="text-[14px]" style={{ color: "var(--muted)" }}>
                {current.role}
              </span>
              <span className="w-1 h-1 rounded-full" style={{ background: "var(--line-strong)" }} aria-hidden="true" />
              <span className="annotation" style={{ color: "var(--signal)" }}>
                {current.project}
              </span>
            </div>
            <p className="annotation mt-3 normal-case" style={{ fontStyle: "italic" }}>
              {current.disclosure}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex lg:flex-col gap-6 lg:pt-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous testimonial"
            className="w-11 h-11 border flex items-center justify-center cursor-pointer transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--muted)", borderRadius: 3 }}
          >
            <IconGlyph name="ArrowLeft" size={14} weight="bold" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next testimonial"
            className="w-11 h-11 border flex items-center justify-center cursor-pointer transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--muted)", borderRadius: 3 }}
          >
            <IconGlyph name="ArrowRight" size={14} weight="bold" aria-hidden="true" />
          </button>
          <span className="annotation ml-1">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        {/* overflow-y-hidden pairs with overflow-x-auto for the same reason
            as IndustryRail's tab row: overflow-x set to anything but
            "visible" while overflow-y stays "visible" computes overflow-y as
            "auto" too, which can show a phantom vertical scrollbar on this
            list below lg even though nothing overflows vertically.
            lg:overflow-visible already resets both axes back to visible at
            the breakpoint where this becomes a non-scrolling column. */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto overflow-y-hidden lg:overflow-visible pb-1">
          {testimonials.map((t, i) => {
            const isActive = active === i;
            return (
              <button
                key={t.slug}
                type="button"
                onClick={() => go(i)}
                className="shrink-0 text-left font-mono text-[12px] min-h-11 flex items-center gap-2 border-l-2 pl-3 pr-3 transition-colors cursor-pointer"
                style={{
                  borderColor: isActive ? "var(--signal)" : "var(--line)",
                  color: isActive ? "var(--text)" : "var(--muted-dim)",
                  background: isActive ? "rgba(79,193,233,0.08)" : "transparent",
                  fontWeight: isActive ? 600 : 400,
                }}
                aria-pressed={isActive}
              >
                {/* A background tint and bolder text alone were too subtle to
                    register as "this is the one currently shown" (usability
                    audit finding, Major) — an explicit marker that only
                    exists in the active state removes the ambiguity. */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--signal)", boxShadow: "0 0 6px var(--signal)" }} aria-hidden="true" />
                )}
                {t.project}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
