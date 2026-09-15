import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#081319",
          color: "#E9EEF1",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#4FC1E9" }} />
          <div style={{ fontSize: 22, letterSpacing: 2, color: "#7E8B93" }}>STATUS: 6 SYSTEMS SHIPPED</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15, display: "flex", flexDirection: "column" }}>
          <span>AI-integrated software.</span>
          <span>
            Engineered for <span style={{ color: "#4FC1E9" }}>production</span>, not demos.
          </span>
        </div>
        <div style={{ display: "flex", gap: 48, marginTop: 48 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, color: "#4FC1E9", fontWeight: 700 }}>91%</span>
            <span style={{ fontSize: 16, color: "#4A5860" }}>TICKET ROUTING ACCURACY</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, color: "#4FC1E9", fontWeight: 700 }}>98%</span>
            <span style={{ fontSize: 16, color: "#4A5860" }}>DOCUMENT EXTRACTION ACCURACY</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, color: "#4FC1E9", fontWeight: 700 }}>&lt;2s</span>
            <span style={{ fontSize: 16, color: "#4A5860" }}>AVG TICKET LATENCY</span>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 60, right: 80, fontSize: 22, color: "#7E8B93", letterSpacing: 1 }}>
          NOVUS LABS
        </div>
      </div>
    ),
    { ...size }
  );
}
