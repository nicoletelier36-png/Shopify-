import type React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import type { Point } from "./Shot";

const CRUMBS = ["#E6D6B8", "#C9A97C", "#9C7650", "#6E5038", "#F2EBDD", "#B98F5E"];
const HAIRS = ["#D9D2C7", "#B7A898", "#8E7F70", "#F1ECE4"];

// Dirt scattered in front of the nozzle that gets pulled into it, closest
// pieces first — the "satisfying" before/after beat of the reference ad.
// Coordinates are source-image pixels (render inside <Shot>).
export const Suction: React.FC<{
  tip: Point;
  seed: string;
  // Sector (degrees, screen space: 0 = right, 90 = down) where dirt lies.
  fromDeg: number;
  toDeg: number;
  radius?: number;
  count?: number;
  kind?: "crumbs" | "hair";
  start?: number;
  // Frames between the first and the last piece being sucked in.
  sweep?: number;
}> = ({ tip, seed, fromDeg, toDeg, radius = 280, count = 70, kind = "crumbs", start = 8, sweep = 40 }) => {
  const frame = useCurrentFrame();
  const palette = kind === "hair" ? HAIRS : CRUMBS;

  return (
    <>
      {new Array(count).fill(true).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const angle = ((fromDeg + (toDeg - fromDeg) * r("a")) * Math.PI) / 180;
        const dist = 30 + radius * Math.sqrt(r("d"));
        const x0 = tip.x + Math.cos(angle) * dist;
        const y0 = tip.y + Math.sin(angle) * dist;
        const pickup = start + (dist / (radius + 30)) * sweep + r("t") * 8;
        const travel = 7 + r("v") * 5;

        const p = interpolate(frame, [pickup, pickup + travel], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.in(Easing.quad),
        });
        if (p >= 1) return null;

        // Air starts tugging just before pickup.
        const tremble = interpolate(frame, [pickup - 6, pickup], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const jx = Math.sin(frame * 2.3 + i) * 2.5 * tremble;
        const jy = Math.cos(frame * 2.9 + i) * 2.5 * tremble;
        // Slight swirl on the way in.
        const swirl = Math.sin(p * Math.PI) * 30 * (r("s") - 0.5);
        const x = x0 + (tip.x - x0) * p + jx + swirl;
        const y = y0 + (tip.y - y0) * p + jy - swirl * 0.5;

        const isHair = kind === "hair";
        const w = isHair ? 26 + r("w") * 34 : 7 + r("w") * 13;
        const h = isHair ? 2 + r("h") * 1.5 : 6 + r("h") * 9;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - w / 2,
              top: y - h / 2,
              width: w,
              height: h,
              borderRadius: isHair ? h : `${30 + r("b") * 40}%`,
              backgroundColor: palette[Math.floor(r("c") * palette.length)],
              boxShadow: isHair ? "none" : "0 1px 1.5px rgba(0,0,0,0.45)",
              rotate: `${r("rot") * 360 + p * 540}deg`,
              scale: 1 - p * 0.85,
              opacity: 1 - interpolate(p, [0.75, 1], [0, 1], { extrapolateLeft: "clamp" }),
            }}
          />
        );
      })}
    </>
  );
};
