import type { Metadata } from "next";
import { SERVICE_GROUPS, serviceCategories, getProject, type ServiceCategory } from "@/lib/data";
import IconGlyph from "@/components/IconGlyph";
import GlowLink from "@/components/GlowLink";
import { CATEGORY_ICON } from "@/lib/iconMap";
import { Reveal } from "@/components/Reveal";
import ThresholdViz from "@/components/ThresholdViz";
import FlipDemo from "@/components/FlipDemo";
import CategoryMetricPanel from "@/components/CategoryMetricPanel";
import CategoryStackPanel from "@/components/CategoryStackPanel";
import SectionRail from "@/components/SectionRail";
import ViewTracker from "@/components/ViewTracker";
import IndustryRail from "@/components/IndustryRail";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eight capability categories, from AI agents and document extraction to compliance automation and interaction design, each proven by a live system.",
};

/**
 * Every category gets a right-side panel, not just the two with a bespoke
 * interactive demo. Where there's no real demo to show, this surfaces real
 * data from the real proof project(s) instead of a fabricated preview, and
 * deliberately rotates through four different panel shapes (hero stat, split
 * stat, stack badges, stacked comparison) rather than reusing one shape six
 * times. A single repeated "mono label + numbers" box for every category
 * read as filler rather than something built for that specific category
 * (design review finding), so no two categories that sit next to each other
 * in render order share the same shape.
 */
function renderCategoryVisual(cat: ServiceCategory) {
  switch (cat.slug) {
    case "automation-agents": {
      const p = getProject("clouddesk")!;
      return (
        <CategoryMetricPanel
          label="MEASURED: CLOUDDESK"
          layout="hero"
          entries={[{ project: p, metric: p.metrics[0] }]}
          note="Measured against a labeled holdout set, not a best-case demo run."
        />
      );
    }
    case "document-extraction": {
      const p = getProject("swiftdocs")!;
      return (
        <CategoryMetricPanel
          label="MEASURED: SWIFTDOCS"
          layout="split"
          entries={[{ project: p, metric: p.metrics[0] }, { project: p, metric: p.metrics[1] }]}
        />
      );
    }
    case "llm-nlp": {
      const p = getProject("clouddesk")!;
      return <CategoryStackPanel label="MODELS: CLOUDDESK" project={p} items={["DistilBERT", "Gemini AI"]} />;
    }
    case "full-stack-development": {
      const p = getProject("hos-trip-planner")!;
      return (
        <CategoryMetricPanel
          label="WHAT GETS DELIVERED: HOS TRIP PLANNER"
          layout="split"
          entries={[{ project: p, metric: p.metrics[2] }, { project: p, metric: p.metrics[3] }]}
        />
      );
    }
    case "database-systems-architecture": {
      const hos = getProject("hos-trip-planner")!;
      const sales = getProject("sales-intelligence")!;
      return (
        <CategoryMetricPanel
          label="STATELESS VS. PERSISTENT"
          layout="stacked"
          entries={[{ project: hos, metric: hos.metrics[0] }, { project: sales, metric: sales.metrics[0] }]}
        />
      );
    }
    case "data-intelligence": {
      const p = getProject("sales-intelligence")!;
      return (
        <CategoryMetricPanel
          label="MEASURED: SALES INTELLIGENCE"
          layout="hero"
          entries={[{ project: p, metric: p.metrics[1] }]}
          note="Behavioral personas and forecasting built on a real transactional dataset, not seeded demo data."
        />
      );
    }
    case "regulatory-compliance":
      return (
        <div className="panel p-6 w-full">
          <div className="font-mono text-[11px] mb-4" style={{ color: "var(--muted-dim)" }}>
            LIVE THRESHOLD ENGINE (HOS TRIP PLANNER LOGIC)
          </div>
          <ThresholdViz />
        </div>
      );
    case "ui-ux-interaction":
      return (
        <div className="panel p-6 w-full">
          <div className="font-mono text-[11px] mb-4" style={{ color: "var(--muted-dim)" }}>
            TRY IT: FLIP GRID REFLOW
          </div>
          <FlipDemo />
        </div>
      );
    default:
      return null;
  }
}

export default function ServicesPage() {
  // Must match the page's actual render order below (grouped by
  // SERVICE_GROUPS, not serviceCategories' own 01-08 index order) — the rail
  // previously used raw serviceCategories order, so its dots didn't line up
  // top-to-bottom with where sections actually land on the page.
  const orderedCategories = SERVICE_GROUPS.flatMap((group) => serviceCategories.filter((c) => c.group === group.name));

  return (
    <div className="pt-32 pb-24">
      <SectionRail items={orderedCategories.map((c) => ({ id: c.slug, label: c.tag.replace("$ ", "") }))} />
      <div className="container">
        <Reveal>
          <p className="annotation mb-5" style={{ color: "var(--signal)" }}>
            [ CAPABILITIES ]
          </p>
          <h1 className="display text-[clamp(28px,6vw,48px)] mb-6">What we build, broadly and specifically.</h1>
          <p className="text-[16px] sm:text-[17px] mb-8" style={{ color: "var(--muted)" }}>
            Eight categories across four groups, each proven by a system we&apos;ve shipped. If your problem doesn&apos;t
            match a named product exactly, it likely still fits one of these.
          </p>
        </Reveal>

        <div className="pt-8 pb-14 sm:pb-20">
          <p className="text-[14px] mb-2" style={{ color: "var(--muted-dim)" }}>
            Built for operations-heavy teams
          </p>
          <p className="display text-[clamp(20px,3vw,28px)] mb-10">Who we build for.</p>
          <IndustryRail />
        </div>

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
                    <p className="text-[14px] mt-1" style={{ color: "var(--muted-dim)" }}>
                      {group.description}
                    </p>
                  </div>
                </div>

                {categoriesInGroup.map((cat) => {
                  const proofProjects = cat.proof.map((slug) => getProject(slug)).filter(Boolean);
                  return (
                    <section key={cat.slug} id={cat.slug} className="row py-10 relative" style={{ scrollMarginTop: "90px" }}>
                      <ViewTracker event="service_view" properties={{ service: cat.slug }} label={cat.slug} />
                      <Reveal>
                        {/* A numbered gutter (matching the ghost-num/annotation-index pattern
                            used everywhere else on the site — group headers above, ProblemShapes)
                            rather than a bare `pl-16`: an indent with nothing in it read as
                            misaligned once the rest of the page spans full width, since every
                            other row on the site fills that same gutter with a real index
                            number. */}
                        <div className="grid grid-cols-[32px_1fr] sm:grid-cols-[52px_1fr] gap-x-4 sm:gap-x-6">
                          <span className="font-mono text-[13px] pt-1" style={{ color: "var(--line-strong)" }}>
                            {cat.index}
                          </span>
                          {/* Every category now gets the two-column treatment with a
                              right-side panel, not just the two that happen to have a
                              bespoke interactive demo — the six others get a real-metrics
                              panel instead (see renderCategoryVisual) so no category reads
                              as "unfinished" next to the ones that do. */}
                          <div className="grid lg:grid-cols-[0.55fr_0.45fr] gap-10">
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
                              <p className="text-[15px] mb-6 max-w-2xl" style={{ color: "var(--muted)" }}>
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

                            <div className="flex items-center">{renderCategoryVisual(cat)}</div>
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
