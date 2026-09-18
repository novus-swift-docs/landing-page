"use client";

import { useEffect, useRef } from "react";
import { STATUS_LABEL, type Project } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import IconGlyph from "@/components/IconGlyph";
import { trackEvent } from "@/lib/analytics";

const STATUS_ICON = { LIVE_DEMO: "✓", LINKEDIN: "in", SHOWCASE: "◆" } as const;

export default function ProjectCase({ project, index }: { project: Project; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          trackEvent("project_view", { project: project.slug }, { label: project.slug });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [project.slug]);

  return (
    <section ref={sectionRef} id={project.slug} className="row py-16 sm:py-20" style={{ scrollMarginTop: "90px" }}>
      <Reveal>
        <div className="grid grid-cols-[60px_1fr] sm:grid-cols-[100px_1fr] gap-x-4">
          <span className="ghost-num text-[40px] sm:text-[64px]">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="annotation" style={{ color: "var(--signal)" }}>
                [{STATUS_ICON[project.status]}] {STATUS_LABEL[project.status]}
              </span>
              <span className="annotation">{project.category}</span>
            </div>

            <h2 className="display font-semibold mb-4" style={{ fontSize: "clamp(24px,4vw,40px)" }}>
              {project.name}
            </h2>
            <p className="text-[15.5px] sm:text-[16px] mb-4" style={{ color: "var(--muted)" }}>
              {project.description}
            </p>

            {project.confidentialityNote && (
              <p className="annotation italic normal-case mb-5">{project.confidentialityNote}</p>
            )}

        <div className="flex gap-3 flex-wrap mb-7">
          {project.publicUrl && (
            <a
              href={project.publicUrl}
              target="_blank"
              rel="noopener"
              data-track={`project-${project.slug}-demo`}
              data-track-event="project_demo_click"
              className="btn btn-primary"
            >
              View Demo <IconGlyph name="ArrowUpRight" size={13} weight="bold" aria-hidden="true" />
            </a>
          )}
          {project.linkedinUrl && (
            <a
              href={project.linkedinUrl}
              target="_blank"
              rel="noopener"
              data-track={`project-${project.slug}-linkedin`}
              data-track-event="linkedin_click"
              className="btn btn-ghost"
            >
              View on LinkedIn <IconGlyph name="LinkedinLogo" size={13} weight="regular" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* flex-wrap (not the old grid-flow-col/auto-cols-max, which forced every
            metric into a single unbroken row regardless of viewport width and
            overflowed the page for projects with long metric labels) — this
            still reads as one row whenever it fits, and wraps cleanly instead
            of overflowing when it doesn't. */}
        {project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3 font-mono text-[13px] mb-7">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <span style={{ color: "var(--muted-dim)" }} className="mr-1.5">
                  {m.label}
                </span>
                <strong style={{ color: "var(--amber)" }}>{m.value}</strong>
              </div>
            ))}
          </div>
        )}

        <div className="mb-8">
          <div className="annotation mb-2.5">BUILT WITH</div>
          <div className="grid grid-cols-2 gap-2 max-w-[420px]">
            {project.stack.map((s, i) => (
              <span
                key={s}
                className="stack-badge font-mono text-[11.5px] pl-2.5 pr-3.5 py-1.5 rounded-full border flex items-center justify-center gap-2"
                style={{
                  borderColor: "var(--line)",
                  background: "linear-gradient(155deg, var(--bg-raised), var(--bg))",
                  color: "var(--text)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-none"
                  style={{ background: i % 2 === 0 ? "var(--signal)" : "var(--amber)" }}
                  aria-hidden="true"
                />
                {s}
              </span>
            ))}
          </div>
        </div>

        {project.assets.length > 0 && (
          <div className="mb-8">
            <ScreenshotGallery assetDir={project.assetDir} assets={project.assets} name={project.name} />
          </div>
        )}

        <div className="flex flex-col gap-3.5">
          {project.details.map((d, i) => (
            <p key={i} className="text-[14.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
              <span style={{ color: "var(--signal)" }} className="font-mono mr-2">
                →
              </span>
              {d}
            </p>
          ))}
        </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
