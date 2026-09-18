"use client";

import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: offset }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -offset }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
