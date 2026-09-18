import Link from "next/link";
import IconGlyph from "@/components/IconGlyph";
import { Reveal } from "@/components/Reveal";

export type Founder = {
  initials: string;
  name: string;
  role: string;
  focus: string;
  linkedin: string;
};

export const FOUNDERS: Founder[] = [
  {
    initials: "MK",
    name: "Mughees Khawaja",
    role: "CO-FOUNDER",
    focus:
      "3rd-year Computer Science student at FAST-ISB. Handles backend architecture, AI systems, deployment, and integration, the parts that have to hold up once a system is actually live and taking real traffic.",
    linkedin: "https://www.linkedin.com/in/mugheestariq",
  },
  {
    initials: "MM",
    name: "Muhammad Mustafa",
    role: "CO-FOUNDER",
    focus:
      "3rd-year Computer Science student at FAST-ISB. Works across product design, data analysis, and applied machine learning, shaping how a system should behave, then building the models that make it work.",
    linkedin: "https://www.linkedin.com/in/muhammad-mustafa-ab5b273a9/",
  },
];

function FounderProfile({ founder, index }: { founder: Founder; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      {/* Image slot commented out, not a visible placeholder box: initials
          in a bordered tile read as a broken/empty avatar rather than
          intentional design. Founder identity is carried by typography
          (the large index numeral + name + role + bio) until real
          photography exists, at which point this Image can be uncommented
          in place with no other layout change. */}
      {/*
        <Image
          src={`/images/founders/${founder.initials.toLowerCase()}.jpg`}
          alt={founder.name}
          width={140}
          height={140}
          className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] object-cover border"
          style={{ borderColor: "var(--line)" }}
        />
      */}
      {/* Second column gets a hairline divider at sm+ (where the two sit
          side by side) so they read as equal, adjacent entries rather than
          one implicitly ranked above the other. Matching left/right padding
          around the divider (pr-10 on column 1, pl-10 + border-l on column
          2) keeps the gap symmetric instead of the border sitting flush
          against one side's content. */}
      <div
        className={`grid grid-cols-[52px_1fr] sm:grid-cols-[64px_1fr] gap-x-4 sm:gap-x-6 items-baseline h-full ${index === 0 ? "sm:pr-10" : "sm:pl-10 sm:border-l"}`}
        style={index === 1 ? { borderColor: "var(--line)" } : undefined}
      >
        <span className="ghost-num text-[40px] sm:text-[48px]">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <div className="annotation mb-2" style={{ color: "var(--signal)" }}>
            {founder.role}
          </div>
          <div className="display font-semibold text-[26px] sm:text-[28px] mb-4">{founder.name}</div>
          <p className="text-[15px] leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
            {founder.focus}
          </p>
          <Link
            href={founder.linkedin}
            target="_blank"
            rel="noopener"
            data-track={`founder-linkedin-${founder.initials.toLowerCase()}`}
            data-track-event="linkedin_click"
            className="inline-flex items-center gap-2 font-mono text-[13px]"
            style={{ color: "var(--muted-dim)" }}
          >
            <IconGlyph name="LinkedinLogo" size={14} weight="regular" aria-hidden="true" />
            LinkedIn
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function Founders({ statement }: { statement?: string }) {
  return (
    <div>
      {statement && (
        <Reveal>
          <p className="display text-[clamp(22px,4vw,38px)] mb-12">{statement}</p>
        </Reveal>
      )}
      {/* One shared row (not one row per founder): both co-founders sit as
          equal, side-by-side columns at sm+ instead of a stacked "first,
          then second" sequence. */}
      <div className="row py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10">
          {FOUNDERS.map((f, i) => (
            <FounderProfile key={f.initials} founder={f} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
