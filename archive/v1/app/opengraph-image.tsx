import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Maxence Leguéry — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.75, marginBottom: 16 }}>
          maxenceleguery.net
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>
          Maxence Leguéry
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 500,
            marginTop: 24,
            color: "#93c5fd",
          }}
        >
          Freelance AI Engineer
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 32,
            opacity: 0.85,
            maxWidth: 900,
          }}
        >
          Shipping production AI products end to end — currently building Buddy AI Note with Podtech
        </div>
      </div>
    ),
    { ...size },
  );
}
