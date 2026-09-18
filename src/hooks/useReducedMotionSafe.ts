"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

function subscribe() {
  return () => {};
}

/**
 * SSR-safe wrapper around framer-motion's `useReducedMotion`.
 *
 * The server always has no `window`, so it renders as if reduced motion is
 * off. Framer's hook reads `matchMedia` synchronously on the client, though,
 * which — for a visitor with prefers-reduced-motion actually enabled — makes
 * the *very first* client render (the one React hydrates against) already
 * report `true`. Any component branching its output on that value (e.g.
 * PageTransition/Reveal choosing between a plain div and a motion.div) then
 * renders a different tree than the server did, producing a real hydration
 * mismatch for exactly that audience.
 *
 * Deferring the real value until after mount keeps the first client render
 * identical to the server's, eliminating the mismatch; the correct value
 * then applies on the next render, before any of these components' actual
 * animations would have played (AnimatePresence/whileInView triggers, never
 * on first paint).
 */
export function useReducedMotionSafe() {
  const preference = useReducedMotion();
  // useSyncExternalStore's server/client-hydration snapshot is `false` (so
  // the first client render matches the server exactly, no `useEffect` +
  // `setState` round trip required), and its regular client snapshot is
  // `true` from then on — the standard React-idiomatic "has this component
  // hydrated yet" check.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  return mounted ? preference : false;
}
