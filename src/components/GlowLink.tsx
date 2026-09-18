"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useGlow } from "@/hooks/useGlow";

type GlowLinkProps = ComponentProps<typeof Link> & { children: ReactNode; shineClassName?: string };

export default function GlowLink({ children, className, shineClassName = "panel-shine", ...props }: GlowLinkProps) {
  const { ref, onMouseMove } = useGlow<HTMLAnchorElement>();

  // `glow-host` gives the shine a sensible default everywhere GlowLink is
  // used (see globals.css): a positioning/clipping context plus the hover
  // trigger, whether or not the caller's className also happens to be a
  // `.panel` or `.btn-primary`.
  return (
    <Link ref={ref} onMouseMove={onMouseMove} className={`glow-host${className ? ` ${className}` : ""}`} {...props}>
      <span className={shineClassName} aria-hidden="true" />
      {children}
    </Link>
  );
}
