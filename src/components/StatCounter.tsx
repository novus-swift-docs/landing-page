"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

function parseTarget(value: string): { prefix: string; number: number; suffix: string; decimals: number; hasNumber: boolean } {
  const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  // A value with no digits at all (e.g. "FMCSA-compliant SVG") has nothing
  // to count up to. Without `hasNumber`, the fallback below (`number: 0`)
  // was indistinguishable from a real animatable zero, so the effect
  // happily animated toward it and rendered a stray leading "0" in front of
  // the whole string until the element scrolled into view.
  if (!match) return { prefix: "", number: 0, suffix: value, decimals: 0, hasNumber: false };
  const [, prefix, numStr, suffix] = match;
  const clean = numStr.replace(/,/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  return { prefix, number: parseFloat(clean), suffix, decimals, hasNumber: true };
}

export default function StatCounter({ value, duration = 1200 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotionSafe();
  const [display, setDisplay] = useState<string>(value);
  const { prefix, number, suffix, decimals, hasNumber } = parseTarget(value);

  useEffect(() => {
    // No-op, not a reset: `display` is already initialized to `value` above,
    // so there's nothing to synchronize here until the animate branch below
    // actually runs.
    if (!hasNumber || reduced || !inView || Number.isNaN(number)) return;
    let raf = 0;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = number * eased;
      const formatted =
        decimals > 0
          ? current.toFixed(decimals)
          : Math.round(current).toLocaleString("en-US");
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced]);

  return <span ref={ref}>{display}</span>;
}
