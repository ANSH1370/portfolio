import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

// Social share card (LinkedIn / WhatsApp / X) — generated at build time.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#05060a",
          backgroundImage:
            "radial-gradient(circle at 15% 5%, rgba(139,92,246,0.35), transparent 45%), radial-gradient(circle at 90% 90%, rgba(34,211,238,0.25), transparent 45%)",
          color: "#f2f4f8",
        }}
      >
        {/* top row: domain */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 16,
              height: 16,
              borderRadius: 9999,
              backgroundImage: "linear-gradient(90deg, #8b5cf6, #22d3ee)",
            }}
          />
          <div style={{ display: "flex", fontSize: 26, color: "#9aa3b5" }}>
            {site.url.replace("https://", "")}
          </div>
        </div>

        {/* center: name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 88, letterSpacing: -3 }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 42, color: "#22d3ee" }}>{site.role}</div>
          <div style={{ display: "flex", fontSize: 28, color: "#9aa3b5" }}>{site.titleLine}</div>
        </div>

        {/* bottom: gradient bar */}
        <div
          style={{
            display: "flex",
            height: 8,
            width: 420,
            borderRadius: 8,
            backgroundImage: "linear-gradient(90deg, #8b5cf6, #22d3ee)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
