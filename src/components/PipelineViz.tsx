"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
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
  return (
    <button
      type="button"
      onClick={() => onSelect(i)}
      onFocus={() => onSelect(i)}
      onMouseEnter={() => onSelect(i)}
      className="flex flex-col items-start gap-3 px-1 cursor-pointer group text-left w-full"
      aria-pressed={isActive}
      aria-label={`${stage.label}: ${stage.body}`}
    >
      <span className="font-mono text-[11px]" style={{ color: isActive ? "var(--signal)" : "var(--line-strong)" }}>
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
  const reduced = useReducedMotion();
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
        {/* Connector rail: one continuous line under the icon row, with a
            signal pulse that fills up to the active stage. Positioned to
            align with the icon tiles (fixed offset from the top). */}
        <div className="absolute left-0 right-0 h-px" style={{ top: 39, background: "var(--line)" }} aria-hidden="true">
          {!reduced && (
            <motion.div
              className="h-full origin-left"
              style={{ background: "var(--signal)", boxShadow: "0 0 6px var(--signal)" }}
              animate={{ scaleX: active / (STAGES.length - 1) }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>
        {STAGES.map((stage, i) => (
          <div key={stage.key} className="px-2 first:pl-0 last:pr-0">
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
