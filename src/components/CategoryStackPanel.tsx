import type { Project } from "@/lib/data";

/**
 * A fourth panel shape (see CategoryMetricPanel for the other three): real
 * technology badges from a real project's `stack` field, for categories
 * where "what it's actually built with" is the more honest proof than a
 * metric would be.
 */
export default function CategoryStackPanel({ label, project, items }: { label: string; project: Project; items: string[] }) {
  return (
    <div className="panel p-6 w-full">
      <div className="font-mono text-[11px] mb-5" style={{ color: "var(--muted-dim)" }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((s, i) => (
          <span
            key={s}
            className="stack-badge font-mono text-[12px] pl-2.5 pr-3.5 py-1.5 rounded-full border flex items-center gap-2"
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
      <div className="text-[11px] mt-5" style={{ color: "var(--muted-dim)" }}>
        {project.name}
      </div>
    </div>
  );
}
