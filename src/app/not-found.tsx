import Link from "next/link";
import GlowLink from "@/components/GlowLink";
import BtnIcon from "@/components/BtnIcon";

export default function NotFound() {
  return (
    <div className="pt-40 pb-32">
      <div className="container">
        <div className="max-w-[600px]">
          <div className="font-mono text-[12px] mb-6 flex items-center gap-2" style={{ color: "var(--danger)" }}>
            <span aria-hidden="true">[✗]</span> ROUTE NOT FOUND
          </div>
          <h1 className="display font-semibold mb-5" style={{ fontSize: "clamp(28px,4.5vw,44px)" }}>
            404: this page never shipped.
          </h1>
          <p className="text-[16px] mb-4" style={{ color: "var(--muted)" }}>
            Unlike everything else on this site, this route isn&apos;t live in production. Check the URL, or pick a
            page that actually exists.
          </p>
          <div className="font-mono text-[13px] mb-10 p-4 rounded-md" style={{ background: "var(--bg-raised)", border: "1px solid var(--line)", color: "var(--muted-dim)" }}>
            $ curl novuslabshq.com/…
            <br />
            <span style={{ color: "var(--danger)" }}>404 Not Found</span>
          </div>
          <div className="flex gap-4 flex-wrap">
            <GlowLink href="/" className="btn btn-primary" shineClassName="btn-shine">
              Back to home <BtnIcon name="ArrowRight" />
            </GlowLink>
            <Link href="/projects" className="btn btn-ghost">
              View case studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
