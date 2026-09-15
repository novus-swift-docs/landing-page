"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

type RailItem = { id: string; label: string };

// A single fixed dot-column, on every screen size — no more separate
// mobile "horizontal bar pinned above the content" variant. Below the 2xl
// breakpoint the text label never renders (not just hidden via opacity —
// `hidden` removes it from layout), so there is no width for it to overlap
// page text with; 2xl+ is the first breakpoint where the centered `.container`
// (max-width 1080px) leaves enough side margin for a revealed label to fit
// without reaching into the content column.
export default function SectionRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  // useScroll's scrollY is updated on rAF, so the change handler below fires
  // at most once per animation frame instead of once per native scroll event.
  const { scrollY } = useScroll();

  function computeActive() {
    const scrollPos = window.scrollY + 140;
    let current = items[0]?.id;
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el && el.offsetTop <= scrollPos) current = item.id;
    }
    return current;
  }

  useEffect(() => {
    // Deferred one frame (not called synchronously in the effect body) so
    // this reads layout only after the browser has actually painted the
    // sibling sections this component measures via getElementById.
    const raf = requestAnimationFrame(() => setActive(computeActive()));
    function onResize() {
      setActive(computeActive());
    }
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useMotionValueEvent(scrollY, "change", () => {
    setActive(computeActive());
  });

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-2.5 sm:left-3.5 lg:left-5 2xl:left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3.5"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`rail-item ${active === item.id ? "active" : ""}`}
          aria-current={active === item.id ? "true" : undefined}
        >
          <span className="rail-dot" aria-hidden="true" />
          <span className="rail-label hidden 2xl:inline-block">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
