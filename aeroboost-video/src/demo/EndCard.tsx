import type React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { fadeUp } from "../components";
import { colors, fontFamily } from "../theme";
import { useSafeArea } from "./Overlays";

// Short closer: product, price and a nudge to the native "Comprar" button.
export const EndCard: React.FC<{ price: string }> = ({ price }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const safe = useSafeArea();
  const tall = height > 1500;
  const photo = tall ? 720 : 560;
  const pop = spring({ frame: frame - 10, fps, config: { damping: 11, stiffness: 160 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.cream,
        alignItems: "center",
        justifyContent: "center",
        gap: tall ? 40 : 24,
        paddingTop: safe.top + 60,
        paddingBottom: safe.bottom,
      }}
    >
      <Img
        src={staticFile("asp-estudio.jpg")}
        style={{
          width: photo,
          height: photo,
          objectFit: "cover",
          borderRadius: 40,
          scale: interpolate(frame, [0, 90], [1, 1.05]),
          ...fadeUp(frame, 0, fps),
        }}
      />
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: tall ? 140 : 110,
          letterSpacing: -4,
          color: colors.ink,
          lineHeight: 1,
          scale: interpolate(pop, [0, 1], [0.5, 1]),
          opacity: interpolate(pop, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {price}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: tall ? 54 : 46,
          color: colors.white,
          backgroundColor: colors.ink,
          padding: "22px 54px",
          borderRadius: 999,
          ...fadeUp(frame, 20, fps),
        }}
      >
        Toca &quot;Comprar&quot; 👇
      </div>
    </AbsoluteFill>
  );
};
