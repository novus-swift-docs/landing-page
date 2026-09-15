"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useGlow } from "@/hooks/useGlow";

type GlowLinkProps = ComponentProps<typeof Link> & { children: ReactNode; shineClassName?: string };

export default function GlowLink({ children, className, shineClassName = "panel-shine", ...props }: GlowLinkProps) {
  const { ref, onMouseMove } = useGlow<HTMLAnchorElement>();

  return (
    <Link ref={ref} onMouseMove={onMouseMove} className={className} {...props}>
      <span className={shineClassName} aria-hidden="true" />
      {children}
    </Link>
  );
}
