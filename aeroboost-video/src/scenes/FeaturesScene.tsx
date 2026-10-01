import type React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { PopWords, fadeUp } from "../components";
import { SAFE_TOP, SIDE, colors, fontFamily } from "../theme";

const Feature: React.FC<{ icon: string; title: string; start: number }> = ({ icon, title, start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, ...fadeUp(frame, start, fps) }}>
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 28,
          backgroundColor: colors.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
        }}
      >
        {icon}
      </div>
      <div style={{ fontFamily, fontWeight: 800, fontSize: 54, color: colors.white }}>{title}</div>
    </div>
  );
};

// Everything in the box + the three key specs.
export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      <Img
        src={staticFile("asp-piezas.jpg")}
        style={{
          position: "absolute",
          top: 0,
          width: 1080,
          height: 1080,
          objectFit: "cover",
          scale: interpolate(frame, [0, 105], [1.0, 1.08]),
        }}
      />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(14,15,18,0.55) 0%, rgba(14,15,18,0) 25%, rgba(14,15,18,0) 45%, #0E0F12 58%)" }} />
      <AbsoluteFill style={{ padding: `${SAFE_TOP}px ${SIDE}px 0` }}>
        <PopWords text="Todo lo que necesitas" fontSize={88} highlight={["Todo"]} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: SIDE, right: SIDE, top: 1010, display: "flex", flexDirection: "column", gap: 34 }}>
        <Feature icon="🧩" title="3 boquillas intercambiables" start={10} />
        <Feature icon="🔌" title="Carga USB Tipo-C" start={22} />
        <Feature icon="💧" title="Filtro lavable" start={34} />
      </div>
    </AbsoluteFill>
  );
};
