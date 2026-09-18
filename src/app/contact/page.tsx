import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import IconGlyph from "@/components/IconGlyph";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Novus Labs what you're trying to build, automate, or improve, or book a meeting directly. Two ways to start a conversation, no pricing page, no forms that go nowhere.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <Reveal>
          <p className="annotation mb-5" style={{ color: "var(--signal)" }}>
            [ CONTACT ]
          </p>
          <h1 className="display text-[clamp(28px,6vw,48px)] mb-6">Let&apos;s build something real.</h1>
          <p className="text-[16px] sm:text-[17px] mb-4" style={{ color: "var(--muted)" }}>
            Send a message, or book a meeting directly. Both reach us, not a queue.
          </p>
          <Link href="/faq" className="font-mono text-[13px] inline-flex items-center gap-1.5" style={{ color: "var(--signal)" }}>
            Have a quick question first? Check the FAQ <IconGlyph name="ArrowRight" size={12} weight="bold" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-0 mt-20 items-start">
          <section id="message" className="lg:pr-12 lg:border-r pb-2" style={{ scrollMarginTop: "100px", borderColor: "var(--line)" }}>
            <Reveal>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="ghost-num text-[36px]">01</span>
                <h2 className="display font-semibold text-[24px]">Tell us.</h2>
              </div>
              <p className="text-[14.5px] mb-7" style={{ color: "var(--muted)" }}>
                Tell us what you&apos;re trying to build, automate, or improve. We read every message ourselves.
              </p>
              <ContactForm />
            </Reveal>
          </section>

          <section id="calendly" className="lg:pl-12" style={{ scrollMarginTop: "100px" }}>
            <Reveal delay={0.08}>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="ghost-num text-[36px]">02</span>
                <h2 className="display font-semibold text-[24px]">Talk to us.</h2>
              </div>
              <p className="text-[14.5px] mb-7" style={{ color: "var(--muted)" }}>
                Pick a time that works for you.
              </p>
              <CalendlyEmbed />
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  );
}
