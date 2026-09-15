import Image from "next/image";
import Link from "next/link";
import IconGlyph from "@/components/IconGlyph";

export default function SiteFooter() {
  return (
    <footer className="border-t mt-10" style={{ borderColor: "var(--line)" }}>
      <div className="container pt-10 pb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo.svg" alt="Novus Labs" width={120} height={87} className="h-9 w-auto" />
          <p className="font-mono text-[11.5px] max-w-[280px]" style={{ color: "var(--muted)" }}>
            Founder-led AI &amp; software engineering studio.
          </p>
        </div>
      </div>
      <div className="container pb-8 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]" style={{ color: "var(--muted-dim)" }}>
        <div>NOVUS LABS © 2026</div>
        <div className="flex items-center gap-5 flex-wrap">
          {/* internal page links: desktop/tablet only — a mobile footer
              re-listing the same four nav destinations the user just
              scrolled past is redundant, so it's dropped below sm. */}
          <Link href="/services" className="hidden sm:inline hover:[color:var(--signal)] transition-colors">Services</Link>
          <Link href="/projects" className="hidden sm:inline hover:[color:var(--signal)] transition-colors">Projects</Link>
          <Link href="/about" className="hidden sm:inline hover:[color:var(--signal)] transition-colors">About</Link>
          <Link href="/contact" className="hover:[color:var(--signal)] transition-colors">Contact</Link>
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
        </div>
        <div>ISLAMABAD, PK</div>
      </div>
    </footer>
  );
}
