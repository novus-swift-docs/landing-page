export default function SkipLink() {
  return (
    <a
      href="#main-content"
      // Positioned fully off-screen via `top` (not a transform on an
      // in-place element) so it is genuinely absent from the viewport until
      // focused, rather than merely translated up and potentially still
      // peeking over the top edge (usability audit finding).
      className="fixed left-4 -top-24 focus:top-4 z-[200] font-mono text-[12px] px-4 py-2.5 transition-[top]"
      style={{ background: "var(--signal)", color: "#081319", fontWeight: 600, borderRadius: 3 }}
    >
      Skip to content
    </a>
  );
}
