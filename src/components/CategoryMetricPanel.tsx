import StatCounter from "@/components/StatCounter";
import type { Metric, Project } from "@/lib/data";

type Entry = { project: Project; metric: Metric };

/**
 * The right-side "personalized box" for capability categories that don't
 * have a genuine interactive demo (ThresholdViz, FlipDemo). Rather than
 * inventing a fake dashboard preview for the other categories, this
 * surfaces real, already-published metrics from the real project(s) that
 * prove that category, attributed by name.
 *
 * Three distinct layouts, not one shape reused six times: a repeated
 * "mono label + stacked numbers" box on every category read as filler
 * rather than something built for that specific category (design review
 * finding). `hero` is a single standout stat, `split` is two stats side by
 * side, `stacked` is the original vertical list, kept for the one category
 * (database architecture) that's genuinely comparing two different projects.
 */
export default function CategoryMetricPanel({
  label,
  entries,
  layout = "stacked",
  note,
}: {
  label: string;
  entries: Entry[];
  layout?: "stacked" | "split" | "hero";
  note?: string;
}) {
  if (layout === "hero") {
    const { metric } = entries[0];
    return (
      <div className="panel p-6 w-full text-center">
        <div className="font-mono text-[11px] mb-6" style={{ color: "var(--muted-dim)" }}>
          {label}
        </div>
        <div className="font-display font-semibold text-[46px] leading-none" style={{ color: "var(--signal)" }}>
          <StatCounter value={metric.value} />
        </div>
        <div className="annotation mt-3">{metric.label}</div>
        {note && (
          <p className="text-[13px] mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>
            {note}
          </p>
        )}
      </div>
    );
  }

  if (layout === "split") {
    return (
      <div className="panel p-6 w-full">
        <div className="font-mono text-[11px] mb-6" style={{ color: "var(--muted-dim)" }}>
          {label}
        </div>
        <div className="grid grid-cols-2 gap-5">
          {entries.map(({ metric }, i) => (
            <div key={metric.label} className={i === 0 ? "pr-5 border-r" : "pl-1"} style={i === 0 ? { borderColor: "var(--line)" } : undefined}>
              <div className="font-display font-semibold text-[24px] leading-tight" style={{ color: i % 2 === 0 ? "var(--signal)" : "var(--amber)" }}>
                <StatCounter value={metric.value} />
              </div>
              <div className="annotation mt-2">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="panel p-6 w-full">
      <div className="font-mono text-[11px] mb-5" style={{ color: "var(--muted-dim)" }}>
        {label}
      </div>
      <div className="flex flex-col gap-5">
        {entries.map(({ project, metric }, i) => (
          <div key={`${project.slug}-${metric.label}`}>
            <div className="font-display font-semibold text-[26px]" style={{ color: i % 2 === 0 ? "var(--signal)" : "var(--amber)" }}>
              <StatCounter value={metric.value} />
            </div>
            <div className="annotation mt-1">{metric.label}</div>
            <div className="text-[11px] mt-0.5" style={{ color: "var(--muted-dim)" }}>
              {project.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
