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
import { Chip, PopWords, fadeUp } from "../components";
import { SAFE_TOP, SIDE, colors, fontFamily } from "../theme";

// Product reveal on the same cream as the studio photo, so the cut-out blends in.
export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - 6, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.cream }}>
      <AbsoluteFill style={{ padding: `${SAFE_TOP}px ${SIDE}px 0` }}>
        <div style={{ fontFamily, fontWeight: 800, fontSize: 48, color: "rgba(14,15,18,0.6)", ...fadeUp(frame, 0, fps) }}>
          La solución:
        </div>
        <div style={{ marginTop: 10 }}>
          <PopWords text="AeroBoost 3 en 1" color={colors.ink} fontSize={118} delay={4} highlight={["3", "en", "1"]} highlightColor="#0098C2" />
        </div>
      </AbsoluteFill>
      <Img
        src={staticFile("asp-estudio.jpg")}
        style={{
          position: "absolute",
          width: 1080,
          height: 1080,
          top: 620,
          left: 0,
          objectFit: "cover",
          scale: interpolate(enter, [0, 1], [0.6, 1]) + interpolate(frame, [0, 90], [0, 0.06]),
          rotate: `${interpolate(enter, [0, 1], [-14, 0])}deg`,
          opacity: interpolate(enter, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />
      <div style={{ position: "absolute", left: SIDE, top: 640 }}>
        <Chip delay={30} dark>⚡ 120W de succión</Chip>
      </div>
      <div style={{ position: "absolute", left: SIDE, top: 760 }}>
        <Chip delay={40}>🔋 100% inalámbrica</Chip>
      </div>
    </AbsoluteFill>
  );
};
