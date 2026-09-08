import { ImageResponse } from "next/og";

export const alt = "Suraj Ghimire — full-stack developer in Lumbini, Nepal";
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
          justifyContent: "space-between",
          background: "#0b1a15",
          padding: "72px",
          color: "#ece7dc",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#e9a23b" }}>
          Suraj Ghimire
        </div>
        <div style={{ display: "flex", fontSize: 82, lineHeight: 1.05, letterSpacing: -3 }}>
          I build web platforms that go into production.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a3b2a6" }}>
          Full-stack developer · Lumbini, Nepal
        </div>
      </div>
    ),
    size
  );
}
