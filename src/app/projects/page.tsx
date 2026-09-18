import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import ProjectCase from "@/components/ProjectCase";
import SectionRail from "@/components/SectionRail";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected systems, from a sub-2-second ticket router to a DOT Hours-of-Service compliance engine: full technical case studies, not one-liners. Public demos only — confidential client implementations are never exposed.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24">
      <SectionRail items={projects.map((p) => ({ id: p.slug, label: p.name }))} />
      <div className="container">
        <Reveal>
          <p className="annotation mb-5" style={{ color: "var(--signal)" }}>
            [ CASE STUDIES ]
          </p>
          <h1 className="display text-[clamp(26px,6vw,48px)] mb-6">Selected systems. Real numbers, real engineering.</h1>
          <p className="text-[16px] sm:text-[17px]" style={{ color: "var(--muted)" }}>
            Public demos and LinkedIn case studies below are demonstration builds, not the live client system.
            Confidential implementations and client identities are never exposed.
          </p>
        </Reveal>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <ProjectCase key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
