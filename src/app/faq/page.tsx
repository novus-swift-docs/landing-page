import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import IconGlyph from "@/components/IconGlyph";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to what people actually ask before reaching out to Novus Labs: pricing, who does the work, confidentiality, and how to start.",
};

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How much does a project cost?",
    answer:
      "It depends on the problem, which is why there's no price list on this site. Tell us what you're doing by hand and we'll give you a real number once we understand it, not a generic starting price.",
  },
  {
    question: "Do you take on ongoing retainer work?",
    answer:
      "No. Every engagement builds something specific, then hands it off. If you need changes later, we're reachable, but we don't sell open-ended monthly retainers.",
  },
  {
    question: "Who actually builds the software?",
    answer:
      "The two of us, directly. Product thinking, engineering, design, and deployment are all done by us, not delegated to a team we manage from a distance.",
  },
  {
    question: "Is AI involved in everything you build?",
    answer:
      "Only where it's genuinely the right tool. HOS Trip Planner's core engine has no LLM in it at all, because the problem is deterministic rule simulation. CloudDesk uses fine-tuned NLP because classification is exactly what that architecture is good at. We pick the tool the problem calls for, not the one that's trending.",
  },
  {
    question: "Do you build marketing websites?",
    answer:
      "Not as a starting point. We build software that replaces work your team is doing by hand: tracking rent, answering the same questions, retyping documents. If a website is the right shape for that (a booking flow, an ordering system, a catalog), that's exactly the kind of project we take on.",
  },
  {
    question: "Will my business information stay confidential?",
    answer:
      "Yes. Every public case study on our Projects page separates the public demo from the confidential client implementation, and client names are never published without permission.",
  },
  {
    question: "What if my problem doesn't fit one of your service categories?",
    answer:
      "It probably still does. The eight categories on our Services page describe the shapes of work we've already built. If yours doesn't match a named product exactly, ask us; most problems are a variant of something we've solved before.",
  },
  {
    question: "How do I get started?",
    answer: "Send a message describing what you're doing by hand, or book a meeting directly. Both reach us, not a queue.",
  },
];

export default function FaqPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <Reveal>
          <p className="annotation mb-5" style={{ color: "var(--signal)" }}>
            [ FAQ ]
          </p>
          <h1 className="display text-[clamp(28px,6vw,48px)] mb-6">Questions people actually ask.</h1>
          <p className="text-[16px] sm:text-[17px]" style={{ color: "var(--muted)" }}>
            The things that usually come up before someone reaches out. If yours isn&apos;t here, ask us directly.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 0.03}>
              {/* Native <details>/<summary>: keyboard and screen-reader
                  accessible by default with zero JS, matching this list's
                  low-ceremony content better than a controlled React
                  accordion would. */}
              <details className="row faq-details group py-7">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                  <span className="flex items-baseline gap-4 min-w-0">
                    <span className="font-mono text-[13px] shrink-0" style={{ color: "var(--line-strong)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display font-semibold text-[16px] sm:text-[18px]">{faq.question}</span>
                  </span>
                  <IconGlyph
                    name="CaretDown"
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                    className="faq-caret shrink-0 mt-1 transition-transform"
                    color="var(--muted-dim)"
                  />
                </summary>
                <p className="text-[14px] sm:text-[15px] leading-relaxed mt-4 pl-[calc(13px+1rem)]" style={{ color: "var(--muted)" }}>
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
