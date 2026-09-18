import StageRail, { type Stage } from "@/components/StageRail";

const STAGES: Stage[] = [
  { key: "problem", label: "Problem", icon: "Compass", body: "The operational bottleneck we're actually solving." },
  { key: "data", label: "Data", icon: "Database", body: "The real inputs: documents, tickets, transactions, telemetry." },
  { key: "logic", label: "Logic", icon: "Code", body: "Deterministic rules where the problem calls for them." },
  { key: "ai", label: "AI", icon: "Brain", body: "Fine-tuned models where AI is the actual advantage." },
  { key: "application", label: "Application", icon: "Stack", body: "A real interface a team uses every day." },
  { key: "outcome", label: "Outcome", icon: "RocketLaunch", body: "A measured result, not a projected one." },
];

/**
 * "How we think": the Problem -> Outcome system pipeline, presented via
 * StageRail's numbered-stage/connector-rail timeline. See StageRail for the
 * shared interaction; this file only owns the stage data.
 */
export default function PipelineViz() {
  return <StageRail stages={STAGES} trackLabel="pipeline-viz-stage" />;
}
