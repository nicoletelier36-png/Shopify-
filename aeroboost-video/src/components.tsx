import type React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fontFamily } from "./theme";

// Full-bleed photo with a slow Ken Burns push-in.
export const PhotoBg: React.FC<{
  src: string;
  objectPosition?: string;
  zoomFrom?: number;
  zoomTo?: number;
  dim?: number;
}> = ({ src, objectPosition = "center", zoomFrom = 1.05, zoomTo = 1.2, dim = 0.35 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, overflow: "hidden" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          scale: interpolate(frame, [0, durationInFrames], [zoomFrom, zoomTo], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(14,15,18,${dim + 0.35}) 0%, rgba(14,15,18,${dim}) 35%, rgba(14,15,18,0) 60%, rgba(14,15,18,${dim}) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// Headline whose words pop in one after another.
export const PopWords: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  highlight?: string[];
  highlightColor?: string;
  align?: "left" | "center";
}> = ({
  text,
  delay = 0,
  fontSize = 104,
  color = colors.white,
  highlight = [],
  highlightColor = colors.accent,
  align = "left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        fontFamily,
        fontWeight: 900,
        fontSize,
        lineHeight: 1.02,
        letterSpacing: -2,
        color,
        textAlign: align,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        columnGap: fontSize * 0.25,
        textShadow: color === colors.white ? "0 6px 30px rgba(0,0,0,0.45)" : "none",
      }}
    >
      {words.map((word, i) => {
        const progress = spring({
          frame: frame - delay - i * 4,
          fps,
          config: { damping: 14, stiffness: 180 },
        });
        const clean = word.replace(/[¿?¡!,.]/g, "");
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              color: highlight.includes(clean) ? highlightColor : undefined,
              opacity: interpolate(progress, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
              translate: `0px ${interpolate(progress, [0, 1], [60, 0])}px`,
              scale: interpolate(progress, [0, 1], [0.7, 1]),
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// Small pill label that slides in.
export const Chip: React.FC<{
  children: React.ReactNode;
  delay?: number;
  dark?: boolean;
}> = ({ children, delay = 0, dark = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });

  return (
    <div
      style={{
        display: "inline-flex",
        alignSelf: "flex-start",
        alignItems: "center",
        gap: 16,
        padding: "18px 34px",
        borderRadius: 999,
        backgroundColor: dark ? colors.ink : colors.accent,
        color: dark ? colors.white : colors.accentInk,
        fontFamily,
        fontWeight: 800,
        fontSize: 46,
        letterSpacing: 0.5,
        opacity: progress,
        translate: `${interpolate(progress, [0, 1], [-80, 0])}px 0px`,
      }}
    >
      {children}
    </div>
  );
};

export const fadeUp = (frame: number, start: number, fps: number) => ({
  opacity: interpolate(frame, [start, start + 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  }),
  translate: `0px ${interpolate(frame, [start, start + 0.5 * fps], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })}px`,
});
