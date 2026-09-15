import IconGlyph from "@/components/IconGlyph";
import type { IconName } from "@/lib/iconMap";

export default function BtnIcon({ name, size = 12 }: { name: IconName; size?: number }) {
  return (
    <span className="btn-icon-circle">
      <IconGlyph name={name} size={size} weight="bold" aria-hidden="true" />
    </span>
  );
}
