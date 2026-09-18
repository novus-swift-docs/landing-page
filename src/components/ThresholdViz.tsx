"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { animate } from "animejs";

const THRESHOLDS = [
  { label: "11h drive", pos: 34 },
  { label: "30m break", pos: 62 },
  { label: "14h duty", pos: 84 },
  { label: "70h/8-day", pos: 100 },
];

const NEAREST_INDEX = 1; // "30m break" is the nearest threshold in this illustration

export default function ThresholdViz() {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotionSafe();
  const [hit, setHit] = useState(false);
  const played = useRef(false);

  useEffect(() => {
    if (!inView || played.current) return;
    played.current = true;
    const target = THRESHOLDS[NEAREST_INDEX].pos;

    if (reduced || !fillRef.current) {
      if (fillRef.current) fillRef.current.style.width = `${target}%`;
      setHit(true);
      return;
    }

    animate(fillRef.current, {
      width: [`0%`, `${target}%`],
      duration: 900,
      ease: "outCubic",
      onComplete: () => setHit(true),
    });
  }, [inView, reduced]);

  return (
    <div ref={ref} className="w-full">
      <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
        <div ref={fillRef} className="absolute left-0 top-0 h-full rounded-full" style={{ width: 0, background: "var(--signal)" }} />
        {THRESHOLDS.map((t, i) => (
          <div
            key={t.label}
            className="absolute top-0 h-full w-[2px]"
            style={{ left: `${t.pos}%`, background: i === NEAREST_INDEX && hit ? "var(--amber)" : "var(--bg)" }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 font-mono text-[10px]" style={{ color: "var(--muted-dim)" }}>
        {THRESHOLDS.map((t, i) => (
          <span key={t.label} style={{ color: i === NEAREST_INDEX && hit ? "var(--amber)" : "var(--muted-dim)" }}>
            {t.label}
          </span>
        ))}
      </div>
      <p className="font-mono text-[11px] mt-3" style={{ color: hit ? "var(--amber)" : "var(--muted-dim)" }}>
        {hit ? "[!] advanced to nearest threshold: 30m break" : "computing nearest threshold…"}
      </p>
    </div>
  );
}
