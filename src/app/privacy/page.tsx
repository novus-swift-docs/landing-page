import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Novus Labs collects when you visit this site or send a message, in plain language, matching what the site actually does.",
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

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <Reveal>
          <p className="annotation mb-5" style={{ color: "var(--signal)" }}>
            [ PRIVACY ]
          </p>
          <h1 className="display text-[clamp(28px,6vw,48px)] mb-6">What we collect, and why.</h1>
          <p className="text-[16px] sm:text-[17px]" style={{ color: "var(--muted)" }}>
            This is a marketing and contact site, not a product with user accounts. What follows describes exactly
            what this site does today, no more, no less.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col">
          <Section index="01" title="Anonymous analytics">
            <p>
              We track how this site is used so we know what&apos;s working: page views, scroll depth (at 25/50/75/90/100%),
              and clicks on specific buttons and links (e.g. &ldquo;Discuss a project&rdquo;, project demo links, testimonial
              navigation). Each event is tagged with the page it happened on and a short label, never with the content of
              anything you typed.
            </p>
            <p>
              A random identifier is generated in your browser&apos;s local storage the first time you visit (identifying
              this browser, not you), and a separate session identifier in session storage that expires after 30 minutes
              of inactivity. Neither is a cookie, and neither is shared with any advertising network or used for
              cross-site tracking. We also record coarse, non-identifying technical details (device type, browser, OS)
              and how you arrived here (referrer, UTM parameters) to understand which channels bring visitors, using the
              same first-party identifiers.
            </p>
            <p>
              If your browser sends a Do Not Track signal, none of this runs: analytics is skipped entirely for that
              visit.
            </p>
            <p>This data is stored in our Supabase project and is not sold or shared with third parties.</p>
          </Section>

          <Section index="02" title="Contact form">
            <p>
              If you send a message, we store your name, email, company (if provided), what you&apos;re looking to build,
              and any additional details you write, along with the referring page. This is sent to our contact address
              and stored so we can reply; it is never used for analytics or shared beyond that purpose. A hidden field
              exists purely to catch automated spam submissions; real visitors never see or need to fill it in.
            </p>
          </Section>

          <Section index="03" title="Booking a meeting">
            <p>
              The scheduling section on our Contact page embeds Calendly directly. Calendly&apos;s script only loads once
              you scroll to that section, and any cookies or tracking it sets are governed by{" "}
              <a href="https://calendly.com/privacy" target="_blank" rel="noopener" className="border-b" style={{ borderColor: "var(--signal)", color: "var(--text)" }}>
                Calendly&apos;s own privacy policy
              </a>
              , not ours. On our side, we only log that the widget was opened and, if Calendly tells us, that a meeting
              was actually scheduled: never the specific date, time, or your calendar details.
            </p>
          </Section>

          <Section index="04" title="What we don't do">
            <p>
              No device fingerprinting. No advertising pixels. No selling or sharing of visitor data with third parties.
              No tracking of what you actually type into the contact form as an analytics event; the message itself is
              only ever stored as a message, in the contact system described above.
            </p>
          </Section>

          <Section index="05" title="Who else touches this data">
            <p>
              Supabase stores analytics and contact-message data on our behalf. If configured, Resend delivers an email
              notification to us when a message is submitted; it doesn&apos;t independently collect anything from
              visitors. Our hosting and infrastructure providers process standard request logs as part of serving the
              site, as any host does.
            </p>
          </Section>

          <Section index="06" title="Questions or requests">
            <p>
              To ask what we hold about you, or to have it deleted, email{" "}
              <a href="mailto:info@novuslabshq.com" className="border-b" style={{ borderColor: "var(--signal)", color: "var(--text)" }}>
                info@novuslabshq.com
              </a>
              . We read every message ourselves.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
