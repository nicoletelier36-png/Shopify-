import type React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

export type Point = { x: number; y: number };

// Full-bleed photo that pushes in on a focal point (in source-image pixels).
// Children are laid out in the same image-pixel space, so overlays such as
// suction particles stay glued to the nozzle while the camera moves.
export const Shot: React.FC<{
  src: string;
  imgW: number;
  imgH: number;
  focus: Point;
  // Where the focal point sits on screen, as a fraction of the frame.
  anchor?: Point;
  zoomFrom?: number;
  zoomTo?: number;
  children?: React.ReactNode;
}> = ({ src, imgW, imgH, focus, anchor = { x: 0.5, y: 0.55 }, zoomFrom = 1.05, zoomTo = 1.18, children }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  const cover = Math.max(width / imgW, height / imgH);
  const zoom = interpolate(frame, [0, durationInFrames], [zoomFrom, zoomTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s = cover * zoom;
  const clamp = (v: number, min: number) => Math.min(0, Math.max(min, v));
  const tx = clamp(anchor.x * width - focus.x * s, width - imgW * s);
  const ty = clamp(anchor.y * height - focus.y * s, height - imgH * s);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: imgW,
          height: imgH,
          transformOrigin: "0 0",
          transform: `translate(${tx}px, ${ty}px) scale(${s})`,
        }}
      >
        <Img src={staticFile(src)} style={{ width: imgW, height: imgH, display: "block" }} />
        {children}
      </div>
      {/* Soft top/bottom shade so the label and captions always read. */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(14,15,18,0.45) 0%, rgba(14,15,18,0) 22%, rgba(14,15,18,0) 70%, rgba(14,15,18,0.35) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
