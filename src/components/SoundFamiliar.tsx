import { soundFamiliar } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

/**
 * The recognition moment (02-landing-site-plan.md §4): three literal
 * situations a business owner has actually said out loud, not a features
 * list. Text-first and editorial on purpose — turning these into icon cards
 * would flatten three specific sentences into a generic "problem tiles"
 * section, which is exactly what this is meant to not feel like.
 */
export default function SoundFamiliar() {
  return (
    <div>
      <Reveal>
        <h2 className="display text-[clamp(26px,4.6vw,44px)] mb-3">Sound familiar?</h2>
        <p className="text-[15px] sm:text-[16px] mb-14 sm:mb-16" style={{ color: "var(--muted)" }}>
          If any of these is a sentence you&apos;ve actually said about your own business, keep reading.
        </p>
      </Reveal>

      <div>
        {soundFamiliar.map((item, i) => (
          <Reveal key={item.slug} delay={i * 0.07}>
            <div className="row group grid grid-cols-[44px_1fr] sm:grid-cols-[72px_1fr] gap-x-4 sm:gap-x-8 py-8 sm:py-11 items-baseline">
              <span
                className="font-mono transition-colors"
                style={{ fontSize: "clamp(18px,2.4vw,24px)", color: "var(--line-strong)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-display font-semibold leading-snug transition-colors"
                style={{ fontSize: "clamp(20px,3.4vw,32px)" }}
              >
                <span className="transition-colors group-hover:[color:var(--signal)]">{item.line}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
