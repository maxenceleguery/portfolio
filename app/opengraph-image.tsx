import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Maxence Leguéry, freelance engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const corner = (pos: Record<string, number>) => ({
  position: "absolute" as const,
  width: 28,
  height: 28,
  borderColor: "#3d6485",
  borderStyle: "solid" as const,
  borderWidth: 0,
  ...pos,
});

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#0d1b2a",
          color: "#e4ecf3",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ ...corner({ top: 40, left: 40 }), borderTopWidth: 3, borderLeftWidth: 3 }} />
        <div style={{ ...corner({ top: 40, right: 40 }), borderTopWidth: 3, borderRightWidth: 3 }} />
        <div style={{ ...corner({ bottom: 40, left: 40 }), borderBottomWidth: 3, borderLeftWidth: 3 }} />
        <div style={{ ...corner({ bottom: 40, right: 40 }), borderBottomWidth: 3, borderRightWidth: 3 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#93a7bb" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#6be38a" }} />
          Open to new missions
        </div>
        <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: 6, marginTop: 28, textTransform: "uppercase" }}>
          Maxence Leguéry
        </div>
        <div style={{ fontSize: 40, fontWeight: 600, marginTop: 20, color: "#ffb547" }}>Freelance engineer, Paris</div>
        <div style={{ fontSize: 30, marginTop: 28, color: "#c3d0dc", maxWidth: 940 }}>
          Products, AI and the cloud underneath. Relevé, Adenor, Cutforge, Buddy AI Note.
        </div>
      </div>
    ),
    { ...size },
  );
}
