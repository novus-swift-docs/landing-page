export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[200] -translate-y-24 focus:translate-y-0 font-mono text-[12px] px-4 py-2.5 transition-transform"
      style={{ background: "var(--signal)", color: "#081319", fontWeight: 600, borderRadius: 3 }}
    >
      Skip to content
    </a>
  );
}
