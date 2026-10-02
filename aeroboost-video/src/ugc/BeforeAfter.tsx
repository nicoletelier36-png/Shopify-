import type React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fontFamily } from "../theme";

export type BeforeAfterShot = {
  before: string;
  after: string;
  durationInFrames: number;
  // Frame (within the scene) where "después" starts wiping in, e.g. when the
  // voice-over says it.
  wipeFrom?: number;
};

// Two stills from the same footage stacked top/bottom: the "después" half
// wipes in so the change reads at a glance, even with the sound off.
export const BeforeAfter: React.FC<{ before: string; after: string; wipeFrom?: number }> = ({ before, after, wipeFrom = 12 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wipe = spring({ frame: frame - wipeFrom, fps, config: { damping: 200 }, durationInFrames: 18 });

  const half = (src: string, label: string, bg: string, edge: "top" | "bottom", clip?: string) => (
    <div style={{ position: "relative", flex: 1, overflow: "hidden", clipPath: clip }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", scale: 1.25 }} />
      <div
        style={{
          position: "absolute",
          left: 40,
          // Labels sit next to the seam, clear of the Reels UI at the edges.
          [edge]: 30,
          fontFamily,
          fontWeight: 900,
          fontSize: 64,
          color: bg === "#FFE14D" ? colors.ink : colors.white,
          backgroundColor: bg,
          padding: "6px 28px",
          borderRadius: 16,
        }}
      >
        {label}
      </div>
    </div>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, flexDirection: "column", gap: 8 }}>
      {half(before, "ANTES", colors.ink, "bottom")}
      {half(after, "DESPUÉS", "#FFE14D", "top", `inset(0 ${interpolate(wipe, [0, 1], [100, 0])}% 0 0)`)}
    </AbsoluteFill>
  );
};
