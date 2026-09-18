"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { SERVICE_GROUPS, serviceCategories, getProject } from "@/lib/data";
import GlowLink from "@/components/GlowLink";
import IconGlyph from "@/components/IconGlyph";
import { CATEGORY_ICON } from "@/lib/iconMap";
import { trackEvent } from "@/lib/analytics";

export default function ServicesExplorer() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotionSafe();
  const group = SERVICE_GROUPS[active];
  const categoriesInGroup = serviceCategories.filter((c) => c.group === group.name);

  function select(i: number) {
    if (i === active) return;
    setActive(i);
    trackEvent("service_view", { group: SERVICE_GROUPS[i].name }, { label: "services-explorer" });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16">
      <div>
        {SERVICE_GROUPS.map((g, i) => {
          const isActive = active === i;
          return (
            <button
              key={g.name}
              type="button"
              onClick={() => select(i)}
              className="w-full text-left row py-6 flex items-baseline gap-5 cursor-pointer transition-colors group"
              aria-pressed={isActive}
            >
              <span className="font-mono text-[13px]" style={{ color: isActive ? "var(--signal)" : "var(--line-strong)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-display font-semibold transition-colors"
                style={{ fontSize: "clamp(19px, 2.6vw, 26px)", color: isActive ? "var(--text)" : "var(--muted)" }}
              >
                {g.name}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={group.name}
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-[15px] mb-8" style={{ color: "var(--muted)" }}>
            {group.description}
          </p>
          <div className="flex flex-col gap-5">
            {categoriesInGroup.map((cat) => {
              const proof = cat.proof.map((slug) => getProject(slug)).find(Boolean);
              return (
                <div key={cat.slug} className="flex items-start gap-4 pb-5 border-b" style={{ borderColor: "var(--line)" }}>
                  <IconGlyph name={CATEGORY_ICON[cat.slug]} size={20} color="var(--signal)" weight="regular" aria-hidden="true" className="mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-[15px] mb-1.5">{cat.name}</div>
                    <p className="text-[13.5px] mb-2" style={{ color: "var(--muted)" }}>
                      {cat.pitch}
                    </p>
                    {proof && (
                      <GlowLink
                        href={`/projects#${proof.slug}`}
                        data-track={`services-explorer-proof-${proof.slug}`}
                        className="inline-flex font-mono text-[11.5px]"
                        style={{ color: "var(--signal)" }}
                      >
                        Proof: {proof.name} →
                      </GlowLink>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
