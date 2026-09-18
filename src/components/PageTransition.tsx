"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const NAV_ORDER = ["/", "/services", "/projects", "/about", "/contact"];

function indexFor(pathname: string) {
  const idx = NAV_ORDER.indexOf(pathname);
  return idx === -1 ? 0 : idx;
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotionSafe();
  // Direction depends on comparing this navigation's index to the previous
  // one, which is "adjusting state when a prop changes" — computed during
  // render (React's own recommended pattern for this) rather than read from
  // a ref during render, which can observe a stale value under concurrent
  // rendering. See SiteNav for the same pattern.
  const [state, setState] = useState(() => ({ pathname, index: indexFor(pathname), direction: 1 }));
  if (pathname !== state.pathname) {
    const index = indexFor(pathname);
    setState({ pathname, index, direction: index >= state.index ? 1 : -1 });
  }
  const offset = state.direction * 28;

  if (reduced) {
    return <div key={pathname}>{children}</div>;
  }

  // Enter-only, no AnimatePresence: React's normal key-based swap unmounts
  // the old page immediately and the new one plays its own fade/slide-in.
  // The previous version wrapped this in `AnimatePresence mode="wait"`,
  // which holds the NEW page invisible until the OLD page's exit animation
  // reports completion first. That completion signal can fail to fire —
  // fast repeat navigation, a route change while the previous transition
  // was still mid-flight, framer-motion/React concurrent-rendering timing —
  // and when it does, `mode="wait"` has nothing to fall back on: the new
  // page just never gets permission to mount, so the page stays blank until
  // something else forces a remount. Dropping the exit animation removes
  // the wait condition entirely, so there's nothing left to get stuck on.
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: offset }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
