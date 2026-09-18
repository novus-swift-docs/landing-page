export type IconName =
  | "Robot"
  | "ChartLineUp"
  | "FileMagnifyingGlass"
  | "ShieldCheck"
  | "Stack"
  | "MagicWand"
  | "Brain"
  | "Database"
  | "ArrowRight"
  | "ArrowUpRight"
  | "LinkedinLogo"
  | "Compass"
  | "PuzzlePiece"
  | "Code"
  | "RocketLaunch"
  | "TestTube"
  | "ArrowLeft"
  | "ArrowUp"
  | "ArrowsClockwise"
  | "CheckCircle"
  | "WarningCircle"
  | "X"
  | "CaretDown";

export const CATEGORY_ICON: Record<string, IconName> = {
  "automation-agents": "Robot",
  "data-intelligence": "ChartLineUp",
  "document-extraction": "FileMagnifyingGlass",
  "regulatory-compliance": "ShieldCheck",
  "full-stack-development": "Stack",
  "ui-ux-interaction": "MagicWand",
  "llm-nlp": "Brain",
  "database-systems-architecture": "Database",
};
