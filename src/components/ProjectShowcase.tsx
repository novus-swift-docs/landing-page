"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { STATUS_LABEL, type Project } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import IconGlyph from "@/components/IconGlyph";
import StatCounter from "@/components/StatCounter";
import { trackEvent } from "@/lib/analytics";

const STATUS_ICON = { LIVE_DEMO: "✓", LINKEDIN: "in", SHOWCASE: "◆", IN_PROGRESS: "…" } as const;

function ShowcaseRow({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  const heroAsset = project.assets[0];
  const sectionRef = useRef<HTMLElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackEvent("project_view", { project: project.slug }, { label: `showcase-${project.slug}` });
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [project.slug]);

  return (
    <section ref={sectionRef} id={project.slug} className="row py-14 sm:py-20" style={{ scrollMarginTop: 100 }}>
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <div
            className="ticked border overflow-hidden"
            style={{
              borderColor: "var(--line)",
              borderRadius: 8,
              aspectRatio: "16/10",
              background: "var(--bg-raised)",
            }}
          >
            {heroAsset ? (
              <Image
                src={`${project.assetDir}/${heroAsset}`}
                alt={`${project.name} interface preview`}
                width={960}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={index === 0}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="ghost-num text-[80px]">{String(index + 1).padStart(2, "0")}</span>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex items-center gap-3 mb-4">
            <span className="annotation" style={{ color: "var(--signal)" }}>
              [{STATUS_ICON[project.status]}] {STATUS_LABEL[project.status]}
            </span>
            {/* Sentence case, not `.annotation`'s uppercase: category names
                like "Market Intelligence Platform" read as noisy, hard-to-scan
                all-caps once they run past a couple of words (usability audit
                finding) — uppercase stays reserved for the short fixed status
                label to its left. */}
            <span className="font-mono text-[13px]" style={{ color: "var(--muted-dim)" }}>
              {project.category}
            </span>
          </div>

          <h3 className="display font-semibold text-[clamp(28px,4.2vw,44px)] mb-4">{project.name}</h3>
          <p className="text-[16px] mb-6" style={{ color: "var(--muted)" }}>
            {project.description}
          </p>

          {project.metrics.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-7">
              {project.metrics.slice(0, 3).map((m) => (
                <div key={m.label}>
                  <div className="font-display font-semibold text-[22px]" style={{ color: "var(--signal)" }}>
                    <StatCounter value={m.value} />
                  </div>
                  <div className="annotation">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 flex-wrap">
            {project.publicUrl && (
              <a
                href={project.publicUrl}
                target="_blank"
                rel="noopener"
                data-track={`showcase-${project.slug}-demo`}
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
                data-track={`showcase-${project.slug}-linkedin`}
                data-track-event="linkedin_click"
                className="btn btn-ghost"
              >
                View on LinkedIn <IconGlyph name="LinkedinLogo" size={13} weight="regular" aria-hidden="true" />
              </a>
            )}
          </div>
          {project.demoHint && (
            <p className="font-mono text-[13px] mt-4" style={{ color: "var(--signal)" }}>
              {project.demoHint}
            </p>
          )}
          {project.confidentialityNote && (
            <p className="font-mono text-[13px] mt-4" style={{ color: "var(--muted-dim)", fontStyle: "italic" }}>
              {project.confidentialityNote}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map((p, i) => (
        <ShowcaseRow key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}
