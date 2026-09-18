import { getProject, problemShapes } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import GlowLink from "@/components/GlowLink";
import IconGlyph from "@/components/IconGlyph";

/**
 * The three problem shapes every offer falls into
 * (01-brand-positioning.md, "The three problem shapes"). Each row pairs the
 * owner's own framing with the real system that answers it — the shape is
 * the category, the linked project is the proof, never a generic "service
 * package" card.
 */
export default function ProblemShapes() {
  return (
    <div>
      {problemShapes.map((shape, i) => {
        const proof = shape.proof.map((slug) => getProject(slug)).find((p) => p && !p.hidden);
        return (
          <Reveal key={shape.slug} delay={i * 0.06}>
            {/* Proof link sits directly under the body copy it supports, not
                pinned to the row's far edge — at wide viewports that
                right-aligned placement put a huge gap between a quote and
                its own proof link, breaking the visual association between
                them (usability audit finding). */}
            <div className="row grid grid-cols-1 sm:grid-cols-[64px_minmax(0,1fr)] gap-x-8 gap-y-4 py-9 sm:py-11 items-start">
              <span className="ghost-num text-[36px] sm:text-[46px]">{shape.index}</span>
              <div className="min-w-0">
                <div className="annotation mb-2.5" style={{ color: "var(--signal)" }}>
                  {shape.name}
                </div>
                <p className="font-display font-semibold text-[18px] sm:text-[21px] mb-2.5 leading-snug">
                  &ldquo;{shape.ownerLine}&rdquo;
                </p>
                <p className="text-[14px] sm:text-[15px] mb-4" style={{ color: "var(--muted)" }}>
                  {shape.body}
                </p>
                {proof && (
                  <GlowLink
                    href={`/projects#${proof.slug}`}
                    data-track={`problem-shape-${shape.slug}-proof-${proof.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[12px]"
                    style={{ color: "var(--signal)" }}
                  >
                    Proof: {proof.name}
                    <IconGlyph name="ArrowRight" size={11} weight="bold" aria-hidden="true" />
                  </GlowLink>
                )}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
