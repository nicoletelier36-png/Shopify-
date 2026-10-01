import type React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PopWords, fadeUp } from "../components";
import { SAFE_TOP, SIDE, colors, fontFamily } from "../theme";

// Offer + call to action. Price is pulled from Shopify (24.990 CLP).
export const CtaScene: React.FC<{ price: string }> = ({ price }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const priceIn = spring({ frame: frame - 14, fps, config: { damping: 11, stiffness: 160 } });
  const pulse = 1 + 0.04 * Math.sin(((frame - 30) / fps) * Math.PI * 2.2) * (frame > 30 ? 1 : 0);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, alignItems: "center" }}>
      <AbsoluteFill
        style={{ background: "radial-gradient(circle at 50% 46%, rgba(61,220,255,0.28) 0%, rgba(14,15,18,0) 55%)" }}
      />
      <AbsoluteFill style={{ padding: `${SAFE_TOP}px ${SIDE}px 0`, alignItems: "center" }}>
        <PopWords text="Limpieza pro, sin cables" fontSize={92} align="center" highlight={["pro"]} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 520,
          width: 600,
          height: 600,
          borderRadius: "50%",
          overflow: "hidden",
          border: `8px solid ${colors.accent}`,
          ...fadeUp(frame, 0, fps),
        }}
      >
        <Img src={staticFile("asp-estudio.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", scale: 1.15 }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1150,
          fontFamily,
          fontWeight: 900,
          fontSize: 150,
          letterSpacing: -4,
          color: colors.white,
          scale: interpolate(priceIn, [0, 1], [0.4, 1]),
          opacity: interpolate(priceIn, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {price}
      </div>
      <div
        style={{
          position: "absolute",
          top: 1340,
          padding: "30px 70px",
          borderRadius: 999,
          backgroundColor: colors.accent,
          color: colors.accentInk,
          fontFamily,
          fontWeight: 900,
          fontSize: 60,
          scale: pulse,
          boxShadow: "0 12px 50px rgba(61,220,255,0.45)",
          ...fadeUp(frame, 24, fps),
        }}
      >
        Pídela hoy 👉
      </div>
    </AbsoluteFill>
  );
};
