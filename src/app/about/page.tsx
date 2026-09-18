import type { Metadata } from "next";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import Founders from "@/components/Founders";
import IconGlyph from "@/components/IconGlyph";
import GlowLink from "@/components/GlowLink";
import BtnIcon from "@/components/BtnIcon";
import type { IconName } from "@/lib/iconMap";

export const metadata: Metadata = {
  title: "About",
  description:
    "Novus Labs is a Pakistan-based AI-integrated software studio: production-first, evidence over claims, run by two FAST-ISB CS students shipping live systems.",
};

const PILLARS = [
  {
    tag: "$ run",
    title: "Ship working software.",
    body: "Every project on our Projects page is a live system, or in SoleVault's case a deliberately built showcase, not a slide deck. We measure a system by whether it holds up under real input, not whether it demos well once.",
  },
  {
    tag: "$ integrate",
    title: "Apply AI selectively.",
    body: "HOS Trip Planner has no LLM in its core engine, because the problem is deterministic rule simulation, not language. CloudDesk is fine-tuned NLP because classification is exactly what that architecture is good at. We pick the tool the problem calls for, not the one that's trending.",
  },
  {
    tag: "$ measure",
    title: "Measure what matters.",
    body: "91% ticket-routing accuracy and 98% extraction accuracy are numbers we track against labeled holdout data, not numbers we quote from a best-case run. If we can't measure a claim, we don't put it on this site.",
  },
];

const CAPABILITIES: { icon: IconName; title: string; body: string; href: string }[] = [
  {
    icon: "Brain",
    title: "Fine-tuned LLMs & NLP",
    body: "Domain-tuned models rather than generic prompting, proven in CloudDesk's ticket classifier.",
    href: "/services#llm-nlp",
  },
  {
    icon: "Robot",
    title: "AI agents & automation",
    body: "Pipelines that decide, not just route, proven in CloudDesk's sub-2-second triage.",
    href: "/services#automation-agents",
  },
  {
    icon: "Database",
    title: "Database & systems architecture",
    body: "Stateless where statelessness is correct (HOS Trip Planner), persistent where it isn't (Sales Intelligence).",
    href: "/services#database-systems-architecture",
  },
  {
    icon: "Stack",
    title: "Full-stack builds on AWS & Vercel",
    body: "Django/DRF and Next.js, deployed separately and connected by environment configuration, not hardcoded hosts.",
    href: "/services#full-stack-development",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <Reveal>
          <p className="annotation mb-5" style={{ color: "var(--signal)" }}>
            [ ABOUT ]
          </p>
          <h1 className="display text-[clamp(28px,6vw,52px)] mb-8">Production-first, evidence over claims.</h1>
          <p className="text-[16px] sm:text-[17px] mb-4" style={{ color: "var(--muted)" }}>
            Novus Labs is a Pakistan-based AI-integrated software studio. We design and ship production AI systems
            and full-stack products: live deployed tools with real accuracy numbers and real infrastructure behind
            them, not prototypes built to impress in a single demo.
          </p>
          <p className="text-[16px] sm:text-[17px] mb-4" style={{ color: "var(--muted)" }}>
            We work across two motions: building our own product portfolio to demonstrate capability, and custom
            client engagements that apply the same capability to a client&apos;s specific problem. Every claim on
            this site is backed by a specific number, a specific product, or a specific engineering decision, the
            same standard we hold our outreach to.
          </p>
          <p className="text-[16px] sm:text-[17px]" style={{ color: "var(--muted)" }}>
            We started Novus Labs because we wanted to build software that goes beyond demos: systems that solve
            concrete problems, automate real workflows, and make complex technology useful. We&apos;re two
            undergraduate CS founders who handle the work end to end: product thinking, engineering, design, and
            deployment, all done directly by us, not delegated to a team we manage from a distance.
          </p>
        </Reveal>

        <section className="pt-20 pb-4">
          <div className="section-head">
            <span className="section-tag">01</span>
            <span className="section-title">Approach</span>
          </div>
          <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {PILLARS.map((p) => (
              <RevealItem key={p.tag}>
                <div className="border-l-2 pl-5 h-full" style={{ borderColor: "var(--signal)" }}>
                  <div className="annotation mb-3">{p.tag}</div>
                  <div className="font-display font-semibold text-[17px] mb-2.5">{p.title}</div>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    {p.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <section className="pt-20 pb-4">
          <div className="section-head">
            <span className="section-tag">02</span>
            <span className="section-title">Capability stack</span>
          </div>
          {/* Editorial rows, not a bordered card grid: a numbered hairline
              row per capability, echoing `.row`/ProblemsSection/
              ServicesExplorer elsewhere on the site rather than a
              conventional SaaS feature-card layout. */}
          <RevealGroup>
            {CAPABILITIES.map((c, i) => (
              <RevealItem key={c.title}>
                <GlowLink
                  href={c.href}
                  className="row grid grid-cols-[40px_1fr_auto] sm:grid-cols-[52px_28px_1fr_auto] items-center gap-x-4 sm:gap-x-6 py-6 transition-colors"
                >
                  <span className="font-mono text-[13px]" style={{ color: "var(--line-strong)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <IconGlyph name={c.icon} size={20} color="var(--signal)" weight="regular" aria-hidden="true" className="hidden sm:block" />
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-[15px] sm:text-[16px] mb-1">{c.title}</div>
                    <div className="text-[13.5px]" style={{ color: "var(--muted)" }}>
                      {c.body}
                    </div>
                  </div>
                  <IconGlyph name="ArrowUpRight" size={14} color="var(--muted-dim)" weight="bold" aria-hidden="true" className="shrink-0" />
                </GlowLink>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        <section className="pt-20 pb-4">
          <div className="section-head">
            <span className="section-tag">03</span>
            <span className="section-title">Team</span>
          </div>
          <Founders />
        </section>

        <Reveal className="pt-14 text-center">
          <div className="max-w-[500px] mx-auto">
            <GlowLink href="/contact#message" className="btn btn-primary w-full justify-center" shineClassName="btn-shine" data-track="about-discuss-project">
              Discuss a project <BtnIcon name="ArrowRight" />
            </GlowLink>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
