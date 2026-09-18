import Link from "next/link";
import SoundFamiliar from "@/components/SoundFamiliar";
import ProblemShapes from "@/components/ProblemShapes";
import ProjectShowcase from "@/components/ProjectShowcase";
import EngineeringProcess from "@/components/EngineeringProcess";
import Testimonials from "@/components/Testimonials";
import Founders from "@/components/Founders";
import CTASection from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { visibleProjects } from "@/lib/data";
import IconGlyph from "@/components/IconGlyph";
import GlowLink from "@/components/GlowLink";
import BtnIcon from "@/components/BtnIcon";

const featuredProjects = visibleProjects.filter((p) => p.featured);

export default function HomePage() {
  return (
    <>
      {/* ─────────────────────────  HERO  ─────────────────────────
          Recognition, not philosophy: the two-line positioning from
          01-brand-positioning.md, verbatim. No floating accuracy stats here
          — enterprise-sounding proof in the first five seconds is exactly
          what invites the questions a two-person studio can't answer.
          Metrics now live beside the systems they actually describe, in the
          proof section below. */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="coord-grid" aria-hidden="true" />
        <div className="glow glow-signal" style={{ width: "min(600px, 90vw)", height: 600, top: -220, right: "-8vw" }} aria-hidden="true" />
        <div className="container">
          <div>
            <p className="annotation mb-6" style={{ color: "var(--signal)" }}>
              [ CUSTOM SOFTWARE FOR OPERATIONS ]
            </p>
            <h1 className="display text-[clamp(32px,4.6vw,64px)] mb-7 max-w-6xl">
              Novus Labs builds custom software for businesses still run on registers, spreadsheets, and{" "}
              <span style={{ color: "var(--signal)" }}>WhatsApp</span>.
            </h1>
            <p className="text-[17px] sm:text-[19px] mb-10 max-w-5xl" style={{ color: "var(--muted)" }}>
              Whatever your team does by hand every day (chasing rent, answering the same order questions,
              retyping invoices into Excel), we build the software that does it instead.
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
        </div>
      </section>

      {/* ─────────────────────────  SOUND FAMILIAR?  ─────────────────────────
          The recognition moment. Positioned immediately after the hero, on
          purpose: everything after this section only works if the visitor
          has already placed themselves in one of these three lines. */}
      <section className="relative pt-4 pb-20 sm:pb-28">
        <div className="container">
          <SoundFamiliar />
        </div>
      </section>

      {/* ─────────────────────────  THREE PROBLEM SHAPES  ───────────────────────── */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container">
          <div className="section-head">
            <span className="section-tag" aria-hidden="true">01</span>
            <h2 className="section-title">The shape of the work</h2>
          </div>
          <ProblemShapes />
        </div>
      </section>

      {/* ─────────────────────────  PROOF (full-bleed)  ─────────────────────────
          SwiftDocs leads: a freely explorable live system, no login wall.
          The rent & tenant system will take this slot once it has real
          screenshots and metrics — see the `flagship`/`hidden` fields on
          that entry in lib/data.ts. */}
      <section className="relative">
        <div className="container">
          <div className="section-head">
            <span className="section-tag" aria-hidden="true">02</span>
            <h2 className="section-title">Proof, not a pitch</h2>
          </div>
        </div>
        <div className="container">
          <ProjectShowcase projects={featuredProjects} />
        </div>
        <div className="container">
          <Reveal className="mt-4 mb-8">
            <Link href="/projects" className="font-mono text-[13px] inline-flex items-center gap-1.5" style={{ color: "var(--signal)" }}>
              View every system we&apos;ve built <IconGlyph name="ArrowRight" size={12} weight="bold" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────  ENGINEERING (compact)  ─────────────────────────
          A trust signal, not a lecture: the full six-stage walkthrough lives
          on /about for the visitor who wants it. The standalone "Capabilities"
          link-out that used to sit here was removed: it put a second
          "go read more elsewhere" link directly under the proof section's own
          "View every system we've built" link, and the two read as one
          cluttered pair. /services is still reachable from the nav and
          footer on every page. */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container">
          <div className="section-head">
            <span className="section-tag" aria-hidden="true">03</span>
            <h2 className="section-title">How it gets built</h2>
          </div>
          <EngineeringProcess compact />
        </div>
      </section>

      {/* ─────────────────────────  CLIENT FEEDBACK  ───────────────────────── */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container">
          <div className="section-head">
            <span className="section-tag" aria-hidden="true">04</span>
            <h2 className="section-title">Client feedback</h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ─────────────────────────  FOUNDERS  ───────────────────────── */}
      <section className="relative pb-20 sm:pb-28">
        <div className="container">
          <div className="section-head">
            <span className="section-tag" aria-hidden="true">05</span>
            <h2 className="section-title">Founders</h2>
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
          <CTASection
            trackPrefix="home-final"
            note="We don't take on retainer-based managed services. Every engagement builds something specific, then hands it off."
          />
        </div>
      </section>
    </>
  );
}
