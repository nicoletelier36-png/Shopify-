import type React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, fontFamily } from "../theme";

// Reels/Stories UI eats the top and bottom of a 9:16 frame; a 4:5 feed post
// only needs a small margin.
export const useSafeArea = () => {
  const { width, height } = useVideoConfig();
  const tall = height / width > 1.5;
  return tall ? { top: 250, bottom: 440, side: 70 } : { top: 56, bottom: 90, side: 60 };
};

// Persistent product name across the top, like the reference ad.
export const TopLabel: React.FC<{ text: string }> = ({ text }) => {
  const safe = useSafeArea();
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: safe.top, pointerEvents: "none" }}>
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 46,
          color: colors.white,
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0,0,0,0.85), 0 0 18px rgba(0,0,0,0.5)",
          maxWidth: 820,
          lineHeight: 1.15,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// Native-looking caption (white box, dark text) for sound-off viewing. Sits
// under the top label: the suction action lives in the lower half.
export const Caption: React.FC<{ text: string; delay?: number }> = ({ text, delay = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const safe = useSafeArea();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: 200 } });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        paddingTop: safe.top + 90,
        paddingLeft: safe.side,
        paddingRight: safe.side,
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 58,
          lineHeight: 1.18,
          color: colors.ink,
          backgroundColor: colors.white,
          padding: "16px 30px",
          borderRadius: 18,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          opacity: interpolate(enter, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
          scale: interpolate(enter, [0, 1], [0.8, 1]),
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
