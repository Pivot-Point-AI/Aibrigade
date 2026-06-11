import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AIBrigade — AI for Fintech & HealthTech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0E1B3D 0%, #0D1535 35%, #190D3A 65%, #0E1B3D 100%)",
          color: "white",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 24 }}>AIBrigade</div>
        <div style={{ fontSize: 32, fontWeight: 400, color: "#00D4FF" }}>
          AI for Fintech &amp; HealthTech
        </div>
      </div>
    ),
    { ...size }
  );
}
