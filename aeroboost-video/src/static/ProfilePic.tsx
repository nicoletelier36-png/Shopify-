import type React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { colors, fontFamily } from "../theme";

// Instagram / Facebook profile picture (1080×1080). Both platforms crop it to
// a circle, so everything important stays inside the central ~80%.
// "producto": the vacuum on yellow, reads well even at 32px (the size
// it shows at next to the ads). "marca": the AeroBoost wordmark.
export type ProfilePicProps = { variant: "producto" | "marca" };

const YELLOW = "#FFE14D";
// Cut-out in public/aeroboost-cutout.png (1124×996, no charging cable).
const CUT_W = 1124;
const CUT_H = 996;

export const ProfilePic: React.FC<ProfilePicProps> = ({ variant }) => {
  if (variant === "producto") {
    const w = 760;
    return (
      <AbsoluteFill style={{ backgroundColor: YELLOW, alignItems: "center", justifyContent: "center" }}>
        <Img
          src={staticFile("aeroboost-cutout.png")}
          style={{
            width: w,
            height: (w * CUT_H) / CUT_W,
            rotate: "-12deg",
            translate: "20px 0px",
            filter: "drop-shadow(16px 26px 22px rgba(0,0,0,0.45))",
          }}
        />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily, fontWeight: 900, fontSize: 200, lineHeight: 0.92, letterSpacing: -8, textAlign: "center" }}>
        <div style={{ color: colors.white }}>Aero</div>
        <div style={{ color: YELLOW }}>Boost</div>
      </div>
    </AbsoluteFill>
  );
};
