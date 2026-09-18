import { problems } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export default function ProblemsSection() {
  return (
    <div>
      <Reveal>
        <p className="display text-[clamp(22px,4vw,38px)] mb-16">
          Most software problems don&apos;t start with software.
        </p>
      </Reveal>

      <div>
        {problems.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <div className="row grid grid-cols-[52px_minmax(0,1fr)] sm:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] gap-x-4 sm:gap-x-8 py-7 items-baseline">
              <span className="annotation" style={{ color: "var(--line-strong)", fontSize: 22, fontFamily: "var(--font-mono)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display font-semibold text-[17px] sm:text-[20px] col-span-1">{p.title}</span>
              <span className="text-[14px] sm:text-[15px] col-span-2 sm:col-span-1 mt-1 sm:mt-0" style={{ color: "var(--muted)" }}>
                {p.body}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
