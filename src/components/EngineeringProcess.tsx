import { engineeringProcess } from "@/lib/data";
import IconGlyph from "@/components/IconGlyph";
import { Reveal } from "@/components/Reveal";
import StageRail from "@/components/StageRail";

/**
 * `compact` renders the homepage's "How it gets built" trust signal using
 * the same numbered-stage/connector-rail presentation as "How we think"
 * (PipelineViz, on /about) — both are built on the shared StageRail
 * component — rather than a flat icon-chip row, so the two "how we work"
 * moments on the site read as one consistent visual language instead of two
 * different treatments for the same kind of content. The full six-stage
 * walkthrough (used on /about) keeps its own detailed per-stage body copy in
 * two full sentences, for the visitor who's already decided to learn how the
 * studio actually works.
 */
export default function EngineeringProcess({ compact = false }: { compact?: boolean }) {
  if (compact) {
    const stages = engineeringProcess.map((step) => ({
      key: step.slug,
      label: step.label,
      icon: step.icon,
      body: `${step.title}. ${step.body}`,
    }));
    return (
      <Reveal>
        <StageRail stages={stages} trackLabel="engineering-process-compact-stage" />
      </Reveal>
    );
  }

  return (
    <div>
      {/* Mobile: vertical timeline with a connecting rail on the left. */}
      <div className="flex flex-col sm:hidden">
        {engineeringProcess.map((step, i) => (
          <Reveal key={step.slug} delay={i * 0.04}>
            <div className="flex gap-4 pb-9 relative">
              {i < engineeringProcess.length - 1 && (
                <span className="absolute left-[19px] top-10 bottom-0 w-px" style={{ background: "var(--line)" }} aria-hidden="true" />
              )}
              <span
                className="w-10 h-10 border flex items-center justify-center shrink-0 z-10"
                style={{ borderColor: "var(--signal)", background: "var(--bg)", borderRadius: 3 }}
              >
                <IconGlyph name={step.icon} size={17} color="var(--signal)" weight="regular" aria-hidden="true" />
              </span>
              <div>
                <div className="annotation mb-1" style={{ color: "var(--signal)" }}>
                  {String(i + 1).padStart(2, "0")} / {step.label.toUpperCase()}
                </div>
                <div className="font-display font-semibold text-[16px] mb-1.5">{step.title}</div>
                <p className="text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {step.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Desktop: horizontal connected pipeline, every stage visible at once -
          a finished record of the process, contrasting with PipelineViz's
          single-active exploratory pattern earlier on the page. */}
      <div className="hidden sm:block relative">
        <div className="absolute left-0 right-0 h-px" style={{ top: 20, background: "var(--line)" }} aria-hidden="true" />
        <div className="grid grid-cols-6 gap-4">
          {engineeringProcess.map((step, i) => (
            <Reveal key={step.slug} delay={i * 0.05}>
              <div>
                <div className="relative mb-5" style={{ height: 40 }}>
                  <span
                    className="w-10 h-10 border flex items-center justify-center relative z-10"
                    style={{ borderColor: "var(--signal)", background: "var(--bg)", borderRadius: 3 }}
                  >
                    <IconGlyph name={step.icon} size={17} color="var(--signal)" weight="regular" aria-hidden="true" />
                  </span>
                </div>
                <div className="annotation mb-1.5" style={{ color: "var(--signal)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display font-semibold text-[15px] lg:text-[16px] mb-2 leading-tight">{step.title}</div>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
