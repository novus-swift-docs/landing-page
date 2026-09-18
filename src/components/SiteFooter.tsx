import Image from "next/image";
import Link from "next/link";
import IconGlyph from "@/components/IconGlyph";

export default function SiteFooter() {
  return (
    <footer className="border-t mt-10" style={{ borderColor: "var(--line)" }}>
      {/* One grid, three responsive templates via named areas — not three
          copies of the markup. Three zones: logo+tagline (left), the page
          links (true-centered, not just evenly-gapped), and copyright +
          LinkedIn + location together (right). True centering needs both
          outer columns equal-width, which only has room once the three
          zones' combined natural width actually fits the row. Measured
          directly (not guessed): logo ~373px, links ~245px, meta ~307px,
          plus 2×32px gaps = ~989px, plus .container's own 80px side padding
          = ~1069px minimum viewport. min-[1100px] gives that a small margin
          for font-rendering variance across browsers — deliberately NOT
          1440px (an earlier version of this used that, on the mistaken
          assumption it needed to match .container's large-desktop-density
          step elsewhere on the site; it doesn't, that step is unrelated to
          this fit calculation, and 1440 left the footer wrongly two-lined on
          any real desktop viewport between ~1069 and 1439px, e.g. a common
          1440×900 or 1366×768 laptop screen at 100% zoom — reproducible by
          zooming out, which pushes the effective CSS viewport width up past
          whatever the threshold is).

          The two-rule breakpoint pair is written as sm:max-[1099.98px]: /
          min-[1100px]: — deliberately non-overlapping ranges, not left to
          overlap and rely on cascade order to pick a winner: an arbitrary
          variant isn't guaranteed to land after sm: in the generated
          stylesheet the way a registered breakpoint's ordering is supposed
          to, and in this project's compiled CSS it didn't — sm: kept
          winning even above the "wider" breakpoint regardless of whether
          that breakpoint was arbitrary or a registered --breakpoint-* theme
          token (both were tried). Bounding sm: to sm:max-[1099.98px]: makes
          the two rules mutually exclusive by construction, so which one
          "wins" can no longer depend on generation/cascade order at all. If
          you need a fourth zone or another breakpoint here, keep every pair
          of rules that touch the same property non-overlapping the same
          way, and remeasure the actual content width rather than reusing an
          unrelated breakpoint value.

          ISLAMABAD, PK isn't a page link, so it rides with copyright+
          LinkedIn in "meta" rather than in the centered "links" group. */}
      <div
        className="container pt-6 pb-6 grid gap-x-8 gap-y-4 font-mono text-[11px] [grid-template-areas:'logo'_'links'_'meta'] sm:items-center sm:max-[1099.98px]:grid-cols-[1fr_auto] sm:max-[1099.98px]:[grid-template-areas:'logo_logo'_'links_meta'] min-[1100px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[1100px]:[grid-template-areas:'logo_links_meta']"
        style={{ color: "var(--muted-dim)" }}
      >
        {/* flex-nowrap (not flex-wrap): the logo mark and tagline must stay
            on the same line as each other at every width — flex-wrap was
            letting the row break between them once the pair didn't fit,
            dropping the tagline to its own line below the logo. min-w-0 on
            the paragraph lets it keep shrinking and wrapping its own text
            internally (normal, expected at narrow widths) instead of
            forcing the row wider or refusing to shrink below its
            unwrapped-text width (the classic flex min-content overflow). */}
        <div className="flex flex-nowrap items-center gap-x-3" style={{ gridArea: "logo" }}>
          <Image src="/brand/logo.svg" alt="Novus Labs" width={120} height={87} className="h-9 w-auto shrink-0" />
          <p className="font-mono text-[11.5px] max-w-[320px] min-w-0" style={{ color: "var(--muted)" }}>
            Founder-led AI &amp; software engineering studio.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2" style={{ gridArea: "links" }}>
          {/* desktop/tablet only — a mobile footer re-listing the same four
              nav destinations the user just scrolled past is redundant, so
              it's dropped below sm. */}
          <Link href="/services" className="hidden sm:inline hover:[color:var(--signal)] transition-colors">Services</Link>
          <Link href="/projects" className="hidden sm:inline hover:[color:var(--signal)] transition-colors">Projects</Link>
          <Link href="/about" className="hidden sm:inline hover:[color:var(--signal)] transition-colors">About</Link>
          <Link href="/contact" className="hover:[color:var(--signal)] transition-colors">Contact</Link>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-self-end" style={{ gridArea: "meta" }}>
          <span>NOVUS LABS © 2026</span>
          <a
            href="https://www.linkedin.com/company/novus-labs-tech/"
            target="_blank"
            rel="noopener"
            data-track="footer-linkedin"
            data-track-event="linkedin_click"
            className="hover:[color:var(--signal)] transition-colors inline-flex items-center gap-1"
          >
            LinkedIn <IconGlyph name="ArrowUpRight" size={12} weight="bold" aria-hidden="true" />
          </a>
          <span>ISLAMABAD, PK</span>
        </div>
      </div>
    </footer>
  );
}
