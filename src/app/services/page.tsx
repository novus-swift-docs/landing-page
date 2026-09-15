import type { Metadata } from "next";
import { SERVICE_GROUPS, serviceCategories, getProject } from "@/lib/data";
import IconGlyph from "@/components/IconGlyph";
import GlowLink from "@/components/GlowLink";
import { CATEGORY_ICON } from "@/lib/iconMap";
import { Reveal } from "@/components/Reveal";
import ThresholdViz from "@/components/ThresholdViz";
import FlipDemo from "@/components/FlipDemo";
import SectionRail from "@/components/SectionRail";
import ViewTracker from "@/components/ViewTracker";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eight capability categories, from AI agents and document extraction to compliance automation and interaction design, each proven by a live system.",
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      <SectionRail items={serviceCategories.map((c) => ({ id: c.slug, label: c.tag.replace("$ ", "") }))} />
      <div className="container">
        <Reveal className="max-w-[680px]">
          <p className="annotation mb-5" style={{ color: "var(--signal)" }}>
            [ CAPABILITIES ]
          </p>
          <h1 className="display text-[clamp(28px,6vw,50px)] mb-6">What we build, broadly and specifically.</h1>
          <p className="text-[16px] sm:text-[17px] mb-8" style={{ color: "var(--muted)" }}>
            Eight categories across four groups, each proven by a system we&apos;ve shipped. If your problem doesn&apos;t
            match a named product exactly, it likely still fits one of these.
          </p>
        </Reveal>

        <div className="flex flex-col">
          {SERVICE_GROUPS.map((group, groupIndex) => {
            const categoriesInGroup = serviceCategories.filter((c) => c.group === group.name);
            return (
              <div key={group.name} className="pt-20 first:pt-14">
                <div className="mb-2 flex items-baseline gap-4">
                  <span className="font-mono text-[13px]" style={{ color: "var(--line-strong)" }}>
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-display font-semibold text-[20px] sm:text-[24px]">{group.name}</div>
                    <p className="text-[13.5px] mt-1" style={{ color: "var(--muted-dim)" }}>
                      {group.description}
                    </p>
                  </div>
                </div>

                {categoriesInGroup.map((cat) => {
                  const proofProjects = cat.proof.map((slug) => getProject(slug)).filter(Boolean);
                  const hasVisual = cat.slug === "regulatory-compliance" || cat.slug === "ui-ux-interaction";
                  return (
                    <section key={cat.slug} id={cat.slug} className="row py-10 relative" style={{ scrollMarginTop: "90px" }}>
                      <ViewTracker event="service_view" properties={{ service: cat.slug }} label={cat.slug} />
                      <Reveal>
                        <div className={hasVisual ? "grid lg:grid-cols-[0.55fr_0.45fr] gap-10 pl-0 sm:pl-16" : "max-w-[780px] pl-0 sm:pl-16"}>
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <IconGlyph name={CATEGORY_ICON[cat.slug]} size={20} color="var(--signal)" weight="regular" aria-hidden="true" />
                              <span className="annotation" style={{ color: "var(--signal)" }}>
                                {cat.tag}
                              </span>
                            </div>
                            <h2 className="font-display font-semibold mb-3.5 leading-snug" style={{ fontSize: "clamp(19px,3vw,25px)" }}>
                              {cat.name}
                            </h2>
                            <p className={`text-[15px] mb-6 ${hasVisual ? "max-w-[520px]" : ""}`} style={{ color: "var(--muted)" }}>
                              {cat.description}
                            </p>

                            {proofProjects.length > 0 && (
                              <div className="flex flex-col gap-2.5 max-w-[600px]">
                                <div className="annotation">PROOF</div>
                                {proofProjects.map((p) => (
                                  <GlowLink
                                    key={p!.slug}
                                    href={`/projects#${p!.slug}`}
                                    data-track={`service-${cat.slug}-proof-${p!.slug}`}
                                    className="border-b px-0 py-3 flex items-center justify-between gap-3 transition-colors"
                                    style={{ borderColor: "var(--line)" }}
                                  >
                                    <div>
                                      <span className="font-display font-semibold text-[14px]">{p!.name}</span>
                                      {p!.metrics[0] && (
                                        <span className="text-[13px] ml-2" style={{ color: "var(--muted)" }}>
                                          {p!.metrics[0].label}: <strong style={{ color: "var(--amber)" }}>{p!.metrics[0].value}</strong>
                                        </span>
                                      )}
                                    </div>
                                    <IconGlyph name="ArrowUpRight" size={14} color="var(--muted-dim)" weight="bold" aria-hidden="true" />
                                  </GlowLink>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center">
                            {cat.slug === "regulatory-compliance" && (
                              <div className="panel p-6 w-full">
                                <div className="font-mono text-[11px] mb-4" style={{ color: "var(--muted-dim)" }}>
                                  LIVE THRESHOLD ENGINE (HOS TRIP PLANNER LOGIC)
                                </div>
                                <ThresholdViz />
                              </div>
                            )}
                            {cat.slug === "ui-ux-interaction" && (
                              <div className="panel p-6 w-full">
                                <div className="font-mono text-[11px] mb-4" style={{ color: "var(--muted-dim)" }}>
                                  TRY IT: FLIP GRID REFLOW
                                </div>
                                <FlipDemo />
                              </div>
                            )}
                          </div>
                        </div>
                      </Reveal>
                    </section>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
