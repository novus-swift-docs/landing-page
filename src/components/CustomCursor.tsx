"use client";

import { useEffect, useRef } from "react";

/**
 * Direct DOM style mutation, no React state — the dot tracks the native
 * pointer with zero added latency (same frame as the browser's own cursor),
 * while the ring eases toward it for a "targeting reticle" trail. Disabled
 * entirely on touch/imprecise pointers and under prefers-reduced-motion,
 * where a custom cursor is either meaningless or an accessibility hazard.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduced) return;

    document.documentElement.classList.add("custom-cursor-active");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let hasMoved = false;
    let raf = 0;

    function onMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        // Reveal on the first real pointer movement rather than waiting for a
        // `mouseenter` on the document — that event only fires when the
        // pointer crosses INTO the page from outside, which never happens if
        // the mouse was already sitting over the window when it loaded (the
        // common case), leaving the cursor permanently hidden.
        dotRef.current.classList.remove("cursor-hidden");
      }
      if (!hasMoved) {
        // Snap the trailing ring straight to the first known position instead
        // of letting it visibly glide in from the screen center.
        hasMoved = true;
        ringX = targetX;
        ringY = targetY;
      }
      ringRef.current?.classList.remove("cursor-hidden");
    }

    function loop() {
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }

    function onOver(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      // `.rail-item` excluded deliberately: the section jump-rail's dots are
      // tiny (6px, with a padded hit area), and the crosshair-reticle hover
      // state, sized for real buttons and links, read as an oversized plus
      // sign floating over them rather than a meaningful hover cue.
      if (target?.closest('a, button, [role="button"], input, textarea, select') && !target?.closest(".rail-item")) {
        ringRef.current?.classList.add("cursor-hover");
      }
    }
    function onOut(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], input, textarea, select') && !target?.closest(".rail-item")) {
        ringRef.current?.classList.remove("cursor-hover");
      }
    }
    function onLeave() {
      dotRef.current?.classList.add("cursor-hidden");
      ringRef.current?.classList.add("cursor-hidden");
    }
    function onEnter() {
      dotRef.current?.classList.remove("cursor-hidden");
      ringRef.current?.classList.remove("cursor-hidden");
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot cursor-hidden" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring cursor-hidden" aria-hidden="true">
        <span className="cursor-crosshair cursor-crosshair-h" />
        <span className="cursor-crosshair cursor-crosshair-v" />
      </div>
    </>
  );
}
