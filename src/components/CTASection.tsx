"use client";

import { motion, useReducedMotion } from "framer-motion";
import GlowLink from "@/components/GlowLink";
import BtnIcon from "@/components/BtnIcon";
import { Reveal } from "@/components/Reveal";

export default function CTASection({
  heading = "Have a workflow worth improving?",
  body = "Tell us what you're trying to build, automate, or improve.",
  trackPrefix = "cta",
}: {
  heading?: string;
  body?: string;
  trackPrefix?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="relative overflow-hidden py-4">
      <div className="coord-grid" aria-hidden="true" />
      {!reduced && (
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, var(--signal), transparent)", opacity: 0.5 }}
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      )}

      <Reveal className="text-center max-w-[680px] mx-auto relative">
        <p className="annotation mb-5" style={{ color: "var(--signal)" }}>
          [ START HERE ]
        </p>
        <h2 className="display text-[clamp(28px,5.5vw,52px)] mb-5">{heading}</h2>
        <p className="text-[16px] sm:text-[17px] mb-10" style={{ color: "var(--muted)" }}>
          {body}
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <GlowLink href="/contact#message" className="btn btn-primary" shineClassName="btn-shine" data-track={`${trackPrefix}-discuss-project`}>
            Discuss a project <BtnIcon name="ArrowRight" />
          </GlowLink>
          <GlowLink href="/contact#calendly" className="btn btn-ghost" data-track={`${trackPrefix}-book-meeting`}>
            Book a meeting
          </GlowLink>
        </div>
      </Reveal>
    </div>
  );
}
