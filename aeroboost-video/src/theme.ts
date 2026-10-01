import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Montserrat variable font (600–900), bundled locally so renders never depend on Google Fonts.
export const fontFamily = "Montserrat";
loadFont({
  family: fontFamily,
  url: staticFile("Montserrat.woff2"),
  weight: "600 900",
});

export const colors = {
  ink: "#0E0F12",
  cream: "#F3EDE6",
  white: "#FFFFFF",
  accent: "#3DDCFF",
  accentInk: "#06222B",
};

// Reels UI covers the top ~250px and bottom ~420px of a 1080x1920 frame.
export const SAFE_TOP = 260;
export const SAFE_BOTTOM = 440;
export const SIDE = 80;
