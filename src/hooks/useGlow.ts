"use client";

import { useCallback, useRef } from "react";

export function useGlow<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return { ref, onMouseMove };
}
