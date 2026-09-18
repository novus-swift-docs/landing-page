"use client";

import {
  Robot,
  ChartLineUp,
  FileMagnifyingGlass,
  ShieldCheck,
  Stack,
  MagicWand,
  Brain,
  Database,
  ArrowRight,
  ArrowUpRight,
  LinkedinLogo,
  Compass,
  PuzzlePiece,
  Code,
  RocketLaunch,
  TestTube,
  ArrowLeft,
  ArrowUp,
  ArrowsClockwise,
  CheckCircle,
  WarningCircle,
  X,
  type IconProps,
} from "@phosphor-icons/react";
import type { IconName } from "@/lib/iconMap";

const REGISTRY = {
  Robot,
  ChartLineUp,
  FileMagnifyingGlass,
  ShieldCheck,
  Stack,
  MagicWand,
  Brain,
  Database,
  ArrowRight,
  ArrowUpRight,
  LinkedinLogo,
  Compass,
  PuzzlePiece,
  Code,
  RocketLaunch,
  TestTube,
  ArrowLeft,
  ArrowUp,
  ArrowsClockwise,
  CheckCircle,
  WarningCircle,
  X,
} as const;

export default function IconGlyph({ name, ...props }: { name: IconName } & IconProps) {
  const Cmp = REGISTRY[name];
  return <Cmp {...props} />;
}
