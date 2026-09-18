"use client";

import GlowLink from "@/components/GlowLink";
import BtnIcon from "@/components/BtnIcon";
import { Reveal } from "@/components/Reveal";

export default function CTASection({
  heading = "What's eating your team's time every day?",
  body = "Tell us what you're doing by hand, on repeat, and we'll tell you whether it's worth turning into software.",
  trackPrefix = "cta",
  note,
}: {
  heading?: string;
  body?: string;
  trackPrefix?: string;
  /** A short boundary/trust line rendered beneath the CTAs — e.g. what the studio doesn't do. */
  note?: string;
}) {
  return (
    <div className="relative overflow-hidden py-4">
      <div className="coord-grid coord-grid-tall" aria-hidden="true" />
      <div className="cta-scanline" aria-hidden="true" />

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
        {note && (
          <p className="font-mono text-[13px] mt-8" style={{ color: "var(--muted-dim)" }}>
            {note}
          </p>
        )}
      </Reveal>
    </div>
  );
}
