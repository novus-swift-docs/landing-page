"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-5 sm:right-8 z-[90] w-10 h-10 rounded-full border flex items-center justify-center"
          style={{ background: "var(--bg-raised)", borderColor: "var(--line)" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--signal)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
        >
          <ArrowUp size={16} color="var(--signal)" weight="bold" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
