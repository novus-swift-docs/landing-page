"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import IconGlyph from "@/components/IconGlyph";
import type { IconName } from "@/lib/iconMap";
import { trackEvent } from "@/lib/analytics";

export type Stage = { key: string; label: string; icon: IconName; body: string };

const AUTO_ADVANCE_MS = 2400;

function NodeButton({
  stage,
  i,
  active,
  onSelect,
}: {
  stage: Stage;
  i: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  const isActive = active === i;
  // items-center (not items-start): labels range widely in length, so
  // left-aligning let short labels leave a lot of visibly unused space to
  // the right of their icon within an equal-width column while long ones
  // filled theirs — icons read as inconsistently spaced even though the
  // columns themselves were already equal. Centering each icon+label as a
  // unit in its column makes every node read as evenly spaced regardless of
  // label length.
  return (
    <button
      type="button"
      onClick={() => onSelect(i)}
      onFocus={() => onSelect(i)}
      onMouseEnter={() => onSelect(i)}
      className="flex flex-col items-center gap-3 px-1 cursor-pointer group text-center w-full"
      aria-pressed={isActive}
      aria-label={`${stage.label}: ${stage.body}`}
    >
      {/* Fixed height (not the font's organic line-height) so the connector
          rail below can sit at a deterministic offset — index row + gap-3 +
          icon height — instead of an empirically-guessed pixel value that
          only happened to roughly land inside the icon tile. */}
      <span className="font-mono text-[11px] h-4 flex items-center" style={{ color: isActive ? "var(--signal)" : "var(--line-strong)" }}>
        {String(i + 1).padStart(2, "0")}
      </span>
      <span
        className="w-10 h-10 border flex items-center justify-center transition-all duration-300"
        style={{
          borderColor: isActive ? "var(--signal)" : "var(--line)",
          background: isActive ? "rgba(79,193,233,0.1)" : "transparent",
          borderRadius: 3,
        }}
      >
        <IconGlyph name={stage.icon} size={17} color={isActive ? "var(--signal)" : "var(--muted)"} weight="regular" aria-hidden="true" />
      </span>
      <span
        className="font-display text-[13px] sm:text-[15px] leading-tight transition-colors"
        style={{ color: isActive ? "var(--text)" : "var(--muted)", fontWeight: isActive ? 600 : 500 }}
      >
        {stage.label}
      </span>
    </button>
  );
}

/**
 * The numbered-stage + connector-rail presentation shared by "How we think"
 * (PipelineViz, on /about) and "How it gets built" (the homepage's compact
 * engineering trust signal): a technical timeline rather than a flowchart,
 * auto-cycling so the idea reads without interaction, with any
 * hover/focus/tap taking over and pausing the cycle. Extracted as one
 * component so both places share the exact same interaction rather than
 * two components drifting apart over time.
 */
export default function StageRail({ stages, trackLabel }: { stages: Stage[]; trackLabel: string }) {
  const reduced = useReducedMotionSafe();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % stages.length), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [reduced, paused, stages.length]);

  function selectStage(i: number) {
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      trackEvent("cta_click", { stage: stages[i].key }, { label: trackLabel });
    }
    setActive(i);
    setPaused(true);
  }

  return (
    <div className="w-full" onMouseLeave={() => setPaused(false)}>
      {/* Below sm, six-plus stages don't fit one legible row - a 3-column
          grid keeps every stage visible and tappable with no horizontal scroll. */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-8 sm:hidden">
        {stages.map((stage, i) => (
          <NodeButton key={stage.key} stage={stage} i={i} active={active} onSelect={selectStage} />
        ))}
      </div>

      <div className="hidden sm:grid relative" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
        {/* Connector rail: one continuous line under the icon row (not
            through it), with a signal pulse that fills up to the active
            stage. top:120 = 16 (index row, h-4) + 12 (gap-3) + 40 (icon
            tile, h-10) x 2 for the mb-5 spacing this variant doesn't have —
            kept identical to the original PipelineViz measurement since the
            node markup is byte-for-byte the same. */}
        <div className="absolute left-0 right-0 h-px" style={{ top: 120, background: "var(--line)" }} aria-hidden="true">
          {!reduced && (
            <motion.div
              className="h-full origin-left"
              style={{ background: "var(--signal)", boxShadow: "0 0 6px var(--signal)" }}
              animate={{ scaleX: active / (stages.length - 1) }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>
        {stages.map((stage, i) => (
          <div key={stage.key} className="px-2">
            <NodeButton stage={stage} i={i} active={active} onSelect={selectStage} />
          </div>
        ))}
      </div>

      {/* Tightly grouped with the icon row above it — no divider — so the
          active stage's description still reads as that row's own caption
          rather than a detached block of text below a horizontal rule
          (usability audit finding). mt-10, not a smaller value: the
          connector rail above is absolutely positioned at a fixed `top`
          offset that sits ~21px below this grid's own normal-flow bottom
          edge (measured), so a smaller margin here is spent closing that
          gap rather than adding real clearance past the rail line. */}
      <div className="min-h-[52px] mt-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={stages[active].key}
            initial={reduced ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-[14px] sm:text-[15px]"
            style={{ color: "var(--text)" }}
          >
            <span className="annotation mr-2.5" style={{ color: "var(--signal)" }}>
              {String(active + 1).padStart(2, "0")} / {stages[active].label.toUpperCase()}
            </span>
            {stages[active].body}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
