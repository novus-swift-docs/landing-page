"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import IconGlyph from "@/components/IconGlyph";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const reduced = useReducedMotionSafe();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }
  const { scrollYProgress } = useScroll();
  const widthPct = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[2px] z-[100]" style={{ background: "var(--line)" }}>
        <motion.div className="h-full" style={{ width: widthPct, background: "var(--signal)" }} />
      </div>

      {/* A technical status bar, not a floating pill: sharp-cornered, full
          width up to the container, a live indicator sitting beside the
          logo instead of buried in the hero copy. Reads as a systems
          status header rather than generic marketing chrome. */}
      <div className="nav-offset fixed left-0 w-full z-[99] px-4 sm:px-6 flex justify-center">
        <nav
          className="nav-shell w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border backdrop-blur-md"
          style={{ background: "rgba(8,19,25,0.82)", borderColor: "var(--line)", borderRadius: 8 }}
        >
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Novus Labs home">
              <Image src="/brand/logo.svg" alt="Novus Labs" width={160} height={116} className="h-8 sm:h-9 w-auto" priority />
            </Link>
            <div className="hidden lg:flex items-center gap-1.5 font-mono text-[10.5px] tracking-wide shrink-0" style={{ color: "var(--muted-dim)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--signal)", boxShadow: "0 0 6px var(--signal)" }} aria-hidden="true" />
              SYSTEMS: OPERATIONAL
            </div>
          </div>

          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  data-track={`nav-${l.label.toLowerCase()}`}
                  data-track-event="navigation_click"
                  className="group font-mono text-[12.5px] px-2 lg:px-2.5 py-2.5 transition-colors"
                  style={{ color: active ? "var(--signal)" : "var(--muted)" }}
                >
                  <span className="transition-opacity" style={{ opacity: active ? 1 : 0 }}>
                    [
                  </span>
                  {l.label}
                  <span className="transition-opacity" style={{ opacity: active ? 1 : 0 }}>
                    ]
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CTA appears as soon as the mobile menu is gone (md, 768px) so
              there's never a range with neither — the LinkedIn icon only
              rejoins it once there's more room (lg, 1024px). Previously both
              were `lg:flex` while the hamburger was `md:hidden`, leaving no
              way to reach the primary CTA between 768–1023px. */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <a
              href="https://www.linkedin.com/company/novus-labs-tech/"
              target="_blank"
              rel="noopener"
              aria-label="Novus Labs on LinkedIn"
              data-track="nav-linkedin"
              data-track-event="linkedin_click"
              className="hidden lg:flex w-9 h-9 border items-center justify-center transition-colors"
              style={{ borderColor: "var(--line)", color: "var(--muted)", borderRadius: 3 }}
            >
              <IconGlyph name="LinkedinLogo" size={14} weight="regular" aria-hidden="true" />
            </a>
            <Link href="/contact#message" data-track="nav-discuss-project" className="btn btn-primary !py-2.5 !px-4 !text-[12px]">
              Discuss a project
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden relative w-9 h-9 border flex items-center justify-center transition-colors"
            style={{
              borderColor: open ? "var(--signal)" : "var(--line)",
              background: open ? "rgba(79,193,233,0.1)" : "var(--bg-raised)",
              borderRadius: 3,
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <motion.span
              className="absolute"
              style={{ width: 15, height: 1.5, background: "var(--text)" }}
              animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3.5 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.span
              className="absolute"
              style={{ width: 15, height: 1.5, background: "var(--text)" }}
              animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3.5 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: [0.65, 0, 0.35, 1] }}
            />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[97] md:hidden"
              style={{ background: "rgba(4,8,10,0.7)", backdropFilter: "blur(2px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-[76px] left-4 right-4 z-[98] md:hidden border backdrop-blur-md overflow-hidden"
              style={{ background: "rgba(8,19,25,0.96)", borderColor: "var(--line)", borderRadius: 8 }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-2">
                {NAV_LINKS.map((l, i) => {
                  const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      data-track={`nav-mobile-${l.label.toLowerCase()}`}
                      data-track-event="navigation_click"
                      className="flex items-center gap-3 px-3.5 py-3.5 transition-colors"
                      style={{ background: active ? "rgba(79,193,233,0.08)" : "transparent", borderRadius: 4 }}
                    >
                      <span className="font-mono text-[11px] w-6" style={{ color: active ? "var(--signal)" : "var(--muted-dim)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[16px]" style={{ color: active ? "var(--signal)" : "var(--text)", fontWeight: active ? 600 : 500 }}>
                        {l.label}
                      </span>
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "var(--signal)", boxShadow: "0 0 6px var(--signal)" }} aria-hidden="true" />
                      )}
                    </Link>
                  );
                })}
              </div>
              <div className="h-px" style={{ background: "var(--line)" }} />
              <div className="p-3 flex flex-col gap-2.5">
                <Link href="/contact#message" data-track="nav-mobile-discuss-project" className="btn btn-primary w-full justify-center">
                  Discuss a project
                </Link>
                <a
                  href="https://www.linkedin.com/company/novus-labs-tech/"
                  target="_blank"
                  rel="noopener"
                  data-track="nav-mobile-linkedin"
                  data-track-event="linkedin_click"
                  className="flex items-center justify-center gap-2 px-5 py-3 font-mono text-[13px]"
                  style={{ color: "var(--muted)" }}
                >
                  <IconGlyph name="LinkedinLogo" size={15} weight="regular" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
