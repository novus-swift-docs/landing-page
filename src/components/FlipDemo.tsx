"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import IconGlyph from "@/components/IconGlyph";

const INITIAL = ["Reveal", "Turntable", "Checkout", "Confirm"];

function shuffled(arr: string[]) {
  const next = [...arr];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export default function FlipDemo() {
  const [items, setItems] = useState(INITIAL);
  const reduced = useReducedMotionSafe();
  // Framer's `layout` projection conflicts with an ancestor mid-transform-animation
  // (the page-transition wrapper), which can deadlock that ancestor's own animation.
  // Deferring layout capability until just after mount keeps FLIP working for actual
  // shuffles while never overlapping with the page-enter transition.
  const [layoutReady, setLayoutReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLayoutReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        {items.map((label) => (
          <motion.div
            key={label}
            layout={!reduced && layoutReady}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="border font-mono text-[12px] px-3 py-3 text-center"
            style={{ borderColor: "var(--line)", background: "var(--bg-raised)", color: "var(--text)", borderRadius: 8 }}
          >
            {label}
          </motion.div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems((prev) => shuffled(prev))}
        className="font-mono text-[12px] inline-flex items-center gap-1.5 px-3 py-1.5 border transition-colors"
        style={{ borderColor: "var(--line)", color: "var(--muted)", borderRadius: 3 }}
      >
        <IconGlyph name="ArrowsClockwise" size={13} weight="regular" aria-hidden="true" />
        Reflow grid
      </button>
      <p className="font-mono text-[11px] mt-2.5" style={{ color: "var(--muted-dim)" }}>
        Same FLIP mechanism used in SoleVault&apos;s product filtering: cards glide to their new position instead of hard-refreshing.
      </p>
    </div>
  );
}
