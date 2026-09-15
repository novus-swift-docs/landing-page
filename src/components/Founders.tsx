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
      <div className="row py-10">
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-6 sm:gap-10">
          <div>
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
            <div
              className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] border flex items-center justify-center font-display font-semibold text-[32px] sm:text-[44px]"
              style={{ borderColor: "var(--line)", background: "linear-gradient(155deg, #12242E, #081319)", color: "var(--signal)", borderRadius: 4 }}
            >
              {founder.initials}
            </div>
          </div>
          <div>
            <div className="annotation mb-2" style={{ color: "var(--signal)" }}>
              {founder.role}
            </div>
            <div className="display font-semibold text-[26px] sm:text-[32px] mb-4">{founder.name}</div>
            <p className="text-[15px] leading-relaxed max-w-[540px] mb-5" style={{ color: "var(--muted)" }}>
              {founder.focus}
            </p>
            <Link
              href={founder.linkedin}
              target="_blank"
              rel="noopener"
              data-track={`founder-linkedin-${founder.initials.toLowerCase()}`}
              data-track-event="linkedin_click"
              className="inline-flex items-center gap-2 font-mono text-[12.5px]"
              style={{ color: "var(--muted-dim)" }}
            >
              <IconGlyph name="LinkedinLogo" size={14} weight="regular" aria-hidden="true" />
              LinkedIn
            </Link>
          </div>
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
          <p className="display text-[clamp(22px,4vw,38px)] max-w-[720px] mb-12">{statement}</p>
        </Reveal>
      )}
      <div>
        {FOUNDERS.map((f, i) => (
          <FounderProfile key={f.initials} founder={f} index={i} />
        ))}
      </div>
    </div>
  );
}
