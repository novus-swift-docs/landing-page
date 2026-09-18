import Link from "next/link";
import PipelineViz from "@/components/PipelineViz";
import StatCounter from "@/components/StatCounter";
import ProblemsSection from "@/components/ProblemsSection";
import IndustryRail from "@/components/IndustryRail";
import ServicesExplorer from "@/components/ServicesExplorer";
import ProjectShowcase from "@/components/ProjectShowcase";
import EngineeringProcess from "@/components/EngineeringProcess";
import Testimonials from "@/components/Testimonials";
import Founders from "@/components/Founders";
import CTASection from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/data";
import IconGlyph from "@/components/IconGlyph";
import GlowLink from "@/components/GlowLink";
import BtnIcon from "@/components/BtnIcon";

const FLAGSHIP_STATS = [
  { value: "91%", label: "TICKET ROUTING ACCURACY", system: "CloudDesk" },
  { value: "98%", label: "DOCUMENT EXTRACTION ACCURACY", system: "SwiftDocs" },
  { value: "<2s", label: "AVG TICKET LATENCY", system: "CloudDesk" },
  { value: "5", label: "REGULATORY THRESHOLDS SIMULATED", system: "HOS Trip Planner" },
];

const featuredProjects = projects.filter((p) => p.featured);

export default function HomePage() {
  return (
    <>
      {/* ─────────────────────────  HERO  ───────────────────────── */}
      {/* <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="coord-grid" aria-hidden="true" />
        <div className="glow glow-signal" style={{ width: "min(600px, 90vw)", height: 600, top: -220, right: "-8vw" }} aria-hidden="true" />
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-14 lg:gap-10 items-start">
            <div>
              <p className="annotation mb-6" style={{ color: "var(--signal)" }}>
                [ FOUNDER-LED AI &amp; SOFTWARE STUDIO ]
              </p>
              <h1 className="display text-[clamp(34px,5.4vw,70px)] mb-7">
                AI-integrated software. 
                <br/>Engineered for <span style={{ color: "var(--signal)" }}>real-world use</span>.
              </h1>
              <p className="text-[17px] sm:text-[19px] mb-10" style={{ color: "var(--muted)" }}>
                A founder-led studio building custom software, AI-powered workflows, and automation.{" "}
                <strong style={{ color: "var(--text)", fontWeight: 500 }}>Engineering first, AI where it&apos;s the actual advantage.</strong>
              </p>
              <div className="flex gap-4 flex-wrap">
                <GlowLink href="/contact#message" className="btn btn-primary" shineClassName="btn-shine" data-track="hero-discuss-project">
                  Discuss a project <BtnIcon name="ArrowRight" />
                </GlowLink>
                <Link href="/projects" className="btn btn-ghost" data-track="hero-view-projects">
                  Explore our work
                </Link>
              </div>
            </div> */}

            {/* Technical readout: the hero's asymmetric counterweight, folding
                the "immediate proof" moment directly into the hero instead of
                a separate thin strip below it. */}
            {/* <Reveal delay={0.15} className="lg:pt-2 lg:text-center">
              <div className="annotation mb-4" style={{ color: "var(--muted-dim)" }}>
                {"// MEASURED, NOT PROJECTED"}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-6 lg:gap-y-5">
                {FLAGSHIP_STATS.map((s) => (
                  <div key={s.label} className="lg:row lg:py-4 lg:first:border-t-0">
                    <div className="font-display font-semibold" style={{ fontSize: "clamp(26px,3.2vw,40px)", lineHeight: 1, color: "var(--signal)" }}>
                      <StatCounter value={s.value} />
                    </div>
                    <div className="annotation mt-2">{s.label}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                      {s.system} system
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section> */}

      {/* ─────────────────────────  HERO  ───────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="coord-grid" aria-hidden="true" />
        <div className="glow glow-signal" style={{ width: "min(600px, 90vw)", height: 600, top: -220, right: "-8vw" }} aria-hidden="true" />
        <div className="container">
          {/* Updated grid definition to give left column max space and right column auto width */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-14 lg:gap-16 items-start justify-between">
            <div>
              <p className="annotation mb-6" style={{ color: "var(--signal)" }}>
                [ FOUNDER-LED AI &amp; SOFTWARE STUDIO ]
              </p>
              
              {/* Removed <br/> to let the heading expand horizontally */}
              <h1 className="display text-[clamp(40px,5.4vw,78px)] mb-7 max-w-4xl">
                AI-integrated software. Engineered for <span style={{ color: "var(--signal)" }}>real-world use</span>.
              </h1>
              
              <p className="text-[17px] sm:text-[19px] mb-10 max-w-2xl" style={{ color: "var(--muted)" }}>
                A founder-led studio building custom software, AI-powered workflows, and automation.{" "}
                <strong style={{ color: "var(--text)", fontWeight: 500 }}>Engineering first, AI where it&apos;s the actual advantage.</strong>
              </p>
              <div className="flex gap-4 flex-wrap">
                <GlowLink href="/contact#message" className="btn btn-primary" shineClassName="btn-shine" data-track="hero-discuss-project">
                  Discuss a project <BtnIcon name="ArrowRight" />
                </GlowLink>
                <Link href="/projects" className="btn btn-ghost" data-track="hero-view-projects">
                  Explore our work
                </Link>
              </div>
            </div>

            {/* Added lg:justify-self-end and min-w-[260px] to lock metrics to the far right while keeping text centered */}
            <Reveal delay={0.15} className="lg:pt-2 lg:text-center lg:justify-self-end min-w-[260px] lg:translate-x-10">
              <div className="annotation mb-4" style={{ color: "var(--muted-dim)" }}>
                {"// MEASURED, NOT PROJECTED"}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-6 lg:gap-y-3">
                {FLAGSHIP_STATS.map((s) => (
                  <div key={s.label} className="lg:row lg:py-4 lg:first:border-t-0">
                    <div className="font-display font-semibold" style={{ fontSize: "clamp(26px,3.2vw,40px)", lineHeight: 1, color: "var(--signal)" }}>
                      <StatCounter value={s.value} />
                    </div>
                    <div className="annotation mt-2">{s.label}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                      {s.system} system
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────  SYSTEM PIPELINE  ───────────────────────── */}
      <section className="relative pt-4 pb-20 sm:pb-28">
        <div className="container">
          <p className="annotation mb-4">[ HOW WE THINK ]</p>
          <h2 className="display text-[clamp(24px,4vw,38px)] mb-14">
            From problem to outcome, in one system.
          </h2>
          <PipelineViz />
        </div>
      </section>

      {/* ─────────────────────────  PROBLEMS + INDUSTRIES  ───────────────────────── */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">01</span>
            <span className="section-title">What we solve</span>
          </div>
          <ProblemsSection />

          <div className="mt-20 sm:mt-28">
            <p className="text-[14px] mb-2" style={{ color: "var(--muted-dim)" }}>
              Built for operations-heavy teams
            </p>
            <p className="display text-[clamp(20px,3vw,28px)] mb-10">Who we build for.</p>
            <IndustryRail />
          </div>
        </div>
      </section>

      {/* ─────────────────────────  CAPABILITIES  ───────────────────────── */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">02</span>
            <span className="section-title">Capabilities</span>
          </div>
          <ServicesExplorer />
          <Reveal className="mt-12">
            <Link href="/services" className="font-mono text-[13px] inline-flex items-center gap-1.5" style={{ color: "var(--signal)" }}>
              See the full capability map <IconGlyph name="ArrowRight" size={12} weight="bold" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────  SELECTED SYSTEMS (full-bleed)  ───────────────────────── */}
      <section className="relative">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">03</span>
            <span className="section-title">Selected systems</span>
          </div>
        </div>
        <div className="container">
          <ProjectShowcase projects={featuredProjects} />
        </div>
        <div className="container">
          <Reveal className="mt-4 mb-8">
            <Link href="/projects" className="font-mono text-[13px] inline-flex items-center gap-1.5" style={{ color: "var(--signal)" }}>
              View selected case studies <IconGlyph name="ArrowRight" size={12} weight="bold" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────  ENGINEERING PROCESS  ───────────────────────── */}
      <section className="relative pt-8 pb-20 sm:pb-28">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">04</span>
            <span className="section-title">Engineering approach</span>
          </div>
          <EngineeringProcess />
        </div>
      </section>

      {/* ─────────────────────────  CLIENT FEEDBACK  ───────────────────────── */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">05</span>
            <span className="section-title">Client feedback</span>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ─────────────────────────  FOUNDERS  ───────────────────────── */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">06</span>
            <span className="section-title">Founders</span>
          </div>
          <Founders statement="Built directly by the people behind Novus Labs." />
          <Reveal className="mt-4">
            <Link href="/about" className="font-mono text-[13px] inline-flex items-center gap-1.5" style={{ color: "var(--signal)" }}>
              More about Novus Labs <IconGlyph name="ArrowRight" size={12} weight="bold" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────  FINAL CTA  ───────────────────────── */}
      <section className="relative pb-24 sm:pb-32">
        <div className="container">
          <CTASection trackPrefix="home-final" />
        </div>
      </section>
    </>
  );
}
