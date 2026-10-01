import type React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors, fontFamily } from "../theme";

// Static "offer" image (4:5 feed), the format competitors scale the most:
// big headline, product hero, price burst, check-list and the included
// accessories so buyers see exactly what comes in the box.
export type StaticAdProps = {
  headline: string;
  highlight: string;
  photo: string;
  bullets: string[];
  price: string;
  footer: string;
};

const YELLOW = "#FFE14D";

export const StaticAd: React.FC<StaticAdProps> = ({ headline, highlight, photo, bullets, price, footer }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily }}>
      <Img
        src={staticFile(photo)}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{ background: "linear-gradient(180deg, rgba(14,15,18,0.9) 0%, rgba(14,15,18,0.2) 26%, rgba(14,15,18,0) 42%, rgba(14,15,18,0.75) 66%, rgba(14,15,18,0.95) 100%)" }}
      />

      <div style={{ position: "absolute", top: 56, left: 60, right: 60 }}>
        <div style={{ fontWeight: 900, fontSize: 84, lineHeight: 0.98, letterSpacing: -3, color: colors.white, textTransform: "uppercase" }}>
          {headline}
        </div>
        <div style={{ fontWeight: 900, fontSize: 84, lineHeight: 1.02, letterSpacing: -3, color: YELLOW, textTransform: "uppercase" }}>
          {highlight}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 300,
          right: 44,
          width: 320,
          height: 320,
          borderRadius: "50%",
          backgroundColor: YELLOW,
          color: colors.ink,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          rotate: "-8deg",
          boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 34 }}>SOLO</div>
        <div style={{ fontWeight: 900, fontSize: 68, letterSpacing: -2, lineHeight: 1 }}>{price}</div>
      </div>

      <div style={{ position: "absolute", left: 60, bottom: 330, display: "flex", flexDirection: "column", gap: 16 }}>
        {bullets.map((b) => (
          <div key={b} style={{ display: "flex", alignItems: "center", gap: 18, fontWeight: 800, fontSize: 44, color: colors.white, textShadow: "0 3px 12px rgba(0,0,0,0.7)" }}>
            <span style={{ display: "inline-flex", width: 52, height: 52, borderRadius: 12, backgroundColor: "#2BD46B", color: colors.ink, alignItems: "center", justifyContent: "center", fontSize: 36 }}>
              ✓
            </span>
            {b}
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", left: 60, right: 60, bottom: 120, height: 180, borderRadius: 24, overflow: "hidden", border: `4px solid ${colors.white}` }}>
        <Img src={staticFile("asp-piezas.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 62%" }} />
        <div style={{ position: "absolute", left: 16, top: 12, backgroundColor: colors.white, color: colors.ink, fontWeight: 900, fontSize: 28, padding: "6px 16px", borderRadius: 999 }}>
          Incluye 3 boquillas
        </div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 36, textAlign: "center", fontWeight: 800, fontSize: 38, color: YELLOW }}>{footer}</div>
    </AbsoluteFill>
  );
};
