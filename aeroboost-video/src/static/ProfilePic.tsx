import type React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

// Instagram / Facebook profile picture (1080×1080), built from the logo mark on
// aeroboost.cl (theme asset aeroboost-logo.svg: orange #ff5b14 arrow with speed
// lines). Both platforms crop it to a circle, so the mark stays in the middle.
export type ProfilePicProps = { variant: "blanco" | "naranja" };

const ORANGE = "#ff5b14";
// Mark viewBox is 72 × 76.6; the arrow tip makes it look right-heavy, so nudge it left.
const MARK_W = 72;
const MARK_H = 76.6;

export const ProfilePic: React.FC<ProfilePicProps> = ({ variant }) => {
  const w = 520;
  return (
    <AbsoluteFill
      style={{ backgroundColor: variant === "blanco" ? "#ffffff" : ORANGE, alignItems: "center", justifyContent: "center" }}
    >
      <Img
        src={staticFile(variant === "blanco" ? "aeroboost-mark.svg" : "aeroboost-mark-blanco.svg")}
        style={{ width: w, height: (w * MARK_H) / MARK_W, translate: "-10px 0px" }}
      />
    </AbsoluteFill>
  );
};
