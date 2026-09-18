import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Novus Labs website: a marketing and contact site, not a hosted product.",
};

function Section({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="row py-10">
      <div className="grid grid-cols-1 sm:grid-cols-[60px_1fr] gap-x-6">
        <span className="ghost-num text-[32px] sm:text-[40px]">{index}</span>
        <div>
          <h2 className="display font-semibold text-[18px] sm:text-[21px] mb-3">{title}</h2>
          <div className="flex flex-col gap-3 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <Reveal>
          <p className="annotation mb-5" style={{ color: "var(--signal)" }}>
            [ TERMS ]
          </p>
          <h1 className="display text-[clamp(28px,6vw,48px)] mb-6">Terms of use.</h1>
          <p className="text-[16px] sm:text-[17px]" style={{ color: "var(--muted)" }}>
            This site is how we show our work and start a conversation. It is not a hosted product with its own
            account system, so these terms stay short.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col">
          <Section index="01" title="What this site is">
            <p>
              novuslabshq.com is a marketing and contact site for Novus Labs. Nothing on it constitutes a signed
              agreement to deliver work; any actual client engagement is governed by a separate written agreement
              between Novus Labs and that client, not by these terms.
            </p>
          </Section>

          <Section index="02" title="Project demos">
            <p>
              Public demo links on the Projects page (CloudDesk, SwiftDocs, HOS Trip Planner, and others) are
              illustrative deployments of real systems we&apos;ve built, kept separate from any confidential client
              implementation. They&apos;re provided as-is, without a guarantee of uptime, and may change or be taken
              down without notice.
            </p>
          </Section>

          <Section index="03" title="Content ownership">
            <p>
              The text, design, and code of this site belong to Novus Labs, except for third-party marks (client
              names are never published without permission) and linked external services, which remain the property
              of their respective owners.
            </p>
          </Section>

          <Section index="04" title="External services">
            <p>
              This site links to and embeds third-party services: Calendly for scheduling, LinkedIn for our company
              page, and individually hosted project demos. Each is governed by that provider&apos;s own terms, which we
              don&apos;t control.
            </p>
          </Section>

          <Section index="05" title="Changes">
            <p>
              We may update this site, including these terms, as the studio and its work evolve. The version live at
              the time you visit is the one that applies.
            </p>
          </Section>

          <Section index="06" title="Contact">
            <p>
              Questions about these terms can go to{" "}
              <a href="mailto:info@novuslabshq.com" className="border-b" style={{ borderColor: "var(--signal)", color: "var(--text)" }}>
                info@novuslabshq.com
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
