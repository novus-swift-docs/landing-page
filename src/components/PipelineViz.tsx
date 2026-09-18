"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import IconGlyph from "@/components/IconGlyph";
import type { IconName } from "@/lib/iconMap";
import { trackEvent } from "@/lib/analytics";

const STAGES: { key: string; label: string; icon: IconName; body: string }[] = [
  { key: "problem", label: "Problem", icon: "Compass", body: "The operational bottleneck we're actually solving." },
  { key: "data", label: "Data", icon: "Database", body: "The real inputs: documents, tickets, transactions, telemetry." },
  { key: "logic", label: "Logic", icon: "Code", body: "Deterministic rules where the problem calls for them." },
  { key: "ai", label: "AI", icon: "Brain", body: "Fine-tuned models where AI is the actual advantage." },
  { key: "application", label: "Application", icon: "Stack", body: "A real interface a team uses every day." },
  { key: "outcome", label: "Outcome", icon: "RocketLaunch", body: "A measured result, not a projected one." },
];

const AUTO_ADVANCE_MS = 2400;

function NodeButton({
  stage,
  i,
  active,
  onSelect,
}: {
  stage: (typeof STAGES)[number];
  i: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  const isActive = active === i;
  // items-center (not items-start): labels range from "AI" (2 chars) to
  // "Application" (11), so left-aligning let short labels leave a lot of
  // visibly unused space to the right of their icon within an equal-width
  // column while long ones filled theirs — icons read as inconsistently
  // spaced even though the columns themselves were already equal.
  // Centering each icon+label as a unit in its column makes every node read
  // as evenly spaced regardless of label length.
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
        className="font-display text-[13px] sm:text-[14.5px] leading-tight transition-colors"
        style={{ color: isActive ? "var(--text)" : "var(--muted)", fontWeight: isActive ? 600 : 500 }}
      >
        {stage.label}
      </span>
    </button>
  );
}

/**
 * The "Problem -> Data -> Logic -> AI -> Application -> Outcome" system
 * pipeline, presented as a technical timeline rather than a flowchart:
 * numbered stages, sharp index tiles, a connector rail with a traveling
 * signal pulse. Auto-cycles so the idea reads without interaction, but any
 * hover/focus/tap takes over and pauses the cycle.
 */
export default function PipelineViz() {
  const reduced = useReducedMotionSafe();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % STAGES.length), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [reduced, paused]);

  function selectStage(i: number) {
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      trackEvent("cta_click", { stage: STAGES[i].key }, { label: "pipeline-viz-stage" });
    }
    setActive(i);
    setPaused(true);
  }

  return (
    <div className="w-full" onMouseLeave={() => setPaused(false)}>
      {/* Below sm, six stages don't fit one legible row - a 3x2 grid keeps
          every stage visible and tappable with no horizontal scroll. */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-8 sm:hidden">
        {STAGES.map((stage, i) => (
          <NodeButton key={stage.key} stage={stage} i={i} active={active} onSelect={selectStage} />
        ))}
      </div>

      <div className="hidden sm:grid relative" style={{ gridTemplateColumns: `repeat(${STAGES.length}, minmax(0, 1fr))` }}>
        {/* Connector rail: one continuous line under the icon row (not
            through it), with a signal pulse that fills up to the active
            stage. top:68 = 16 (index row, h-4) + 12 (gap-3) + 40 (icon tile,
            h-10) — the icon tiles' exact bottom edge, deterministic rather
            than a guessed value that landed partway up through the icons. */}
        <div className="absolute left-0 right-0 h-px" style={{ top: 120, background: "var(--line)" }} aria-hidden="true">
          {!reduced && (
            <motion.div
              className="h-full origin-left"
              style={{ background: "var(--signal)", boxShadow: "0 0 6px var(--signal)" }}
              animate={{ scaleX: active / (STAGES.length - 1) }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>
        {/* Uniform px-2 on every column (not first:pl-0 last:pr-0): that
            asymmetric edge padding was tuned for left-aligned content, where
            it let the first/last icons sit flush with the row's true edges.
            With icons now centered in their column, the same asymmetry
            would nudge just the first and last icons off-center relative to
            the other four — same padding everywhere keeps every icon
            centered identically in its own column. */}
        {STAGES.map((stage, i) => (
          <div key={stage.key} className="px-2">
            <NodeButton stage={stage} i={i} active={active} onSelect={selectStage} />
          </div>
        ))}
      </div>

      <div className="min-h-[52px] mt-8 pt-5" style={{ borderTop: "1px solid var(--line)" }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={STAGES[active].key}
            initial={reduced ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-[14px] sm:text-[15px]"
            style={{ color: "var(--text)" }}
          >
            <span className="annotation mr-2.5" style={{ color: "var(--signal)" }}>
              {String(active + 1).padStart(2, "0")} / {STAGES[active].label.toUpperCase()}
            </span>
            {STAGES[active].body}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
