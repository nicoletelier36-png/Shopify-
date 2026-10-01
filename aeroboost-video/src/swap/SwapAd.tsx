import type React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Img, Series, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TopLabel, useSafeArea } from "../demo/Overlays";
import { Suction } from "../demo/Suction";
import { colors, fontFamily } from "../theme";

// "Same product, different worlds": the product stays fixed in the centre,
// seen from above, while the background swaps every beat (car, sofa, desk…).
// Crumbs around the nozzle get sucked in on each scene so the swap also shows
// the product working. Modeled on a ViewShift Productions reel.
export type SwapScene = { bg: string; label: string; kind?: "crumbs" | "hair" };

export type SwapAdProps = {
  scenes: SwapScene[];
  // One duration per scene, so cuts can land on the music's beats.
  sceneFrames: number[];
  // 0 = no closing price card.
  endFrames: number;
  price: string;
  // false = clean images only (no label, chips or captions).
  showText: boolean;
  // Music inside public/, or null.
  audio: string | null;
};

export const swapDuration = (p: SwapAdProps) => p.sceneFrames.reduce((a, b) => a + b, 0) + p.endFrames;

// Cut-out in public/aeroboost-cutout.png (1124×996, no charging cable).
const CUT_W = 1124;
const CUT_H = 996;
// Brush tip inside the cut-out, where crumbs get sucked in.
const TIP = { x: 85, y: 935 };

const Product: React.FC<{ seed: string; kind: "crumbs" | "hair" }> = ({ seed, kind }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const w = width * 0.82;
  const s = w / CUT_W;
  // Small "drop" on every cut, like the product landing on the new surface.
  const land = spring({ frame, fps, config: { damping: 14, stiffness: 220 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          position: "relative",
          width: CUT_W,
          height: CUT_H,
          transform: `scale(${s * interpolate(land, [0, 1], [1.06, 1])})`,
          rotate: "-8deg",
        }}
      >
        <Suction tip={TIP} seed={seed} kind={kind} fromDeg={60} toDeg={250} radius={360} count={kind === "hair" ? 60 : 80} start={8} sweep={26} />
        <Img
          src={staticFile("aeroboost-cutout.png")}
          style={{
            position: "absolute",
            inset: 0,
            width: CUT_W,
            height: CUT_H,
            filter: "drop-shadow(18px 28px 22px rgba(0,0,0,0.45))",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const SceneChip: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const safe = useSafeArea();
  const pop = spring({ frame: frame - 2, fps, config: { damping: 12, stiffness: 220 } });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: safe.bottom + 40 }}>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 72,
          color: colors.ink,
          backgroundColor: "#FFE14D",
          padding: "12px 40px",
          borderRadius: 20,
          boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
          scale: interpolate(pop, [0, 1], [0.6, 1]),
          opacity: interpolate(pop, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC<{ price: string }> = ({ price }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const safe = useSafeArea();
  const pop = spring({ frame: frame - 6, fps, config: { damping: 10, stiffness: 180 } });
  const w = width * 0.78;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.cream, alignItems: "center", justifyContent: "center", gap: 30, paddingTop: safe.top, paddingBottom: safe.bottom }}>
      <div style={{ fontFamily, fontWeight: 900, fontSize: 64, color: colors.ink, textAlign: "center", lineHeight: 1.05 }}>
        Auto, casa y escritorio.
        <br />
        Una sola aspiradora.
      </div>
      <Img src={staticFile("aeroboost-cutout.png")} style={{ width: w, height: (w * CUT_H) / CUT_W, rotate: "-8deg", filter: "drop-shadow(14px 22px 18px rgba(0,0,0,0.25))" }} />
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 120,
          letterSpacing: -3,
          color: colors.ink,
          backgroundColor: "#FFE14D",
          padding: "4px 40px",
          borderRadius: 26,
          rotate: "-3deg",
          scale: interpolate(pop, [0, 1], [0.4, 1]),
        }}
      >
        {price}
      </div>
      <div style={{ fontFamily, fontWeight: 800, fontSize: 46, color: colors.white, backgroundColor: colors.ink, padding: "14px 40px", borderRadius: 999 }}>
        Toca &quot;Comprar&quot; 👇
      </div>
    </AbsoluteFill>
  );
};

export const SwapAd: React.FC<SwapAdProps> = ({ scenes, sceneFrames, endFrames, price, showText, audio }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      <Series>
        {scenes.map((scene, i) => (
          <Series.Sequence key={scene.bg} name={scene.label} durationInFrames={sceneFrames[i]} premountFor={fps}>
            <Img src={staticFile(scene.bg)} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
            {showText ? (
              <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.35) 100%)" }} />
            ) : null}
            <Product seed={`swap-${i}`} kind={scene.kind ?? "crumbs"} />
            {showText ? <SceneChip text={scene.label} /> : null}
            {showText ? <TopLabel text="Aspiradora inalámbrica 3 en 1" /> : null}
          </Series.Sequence>
        ))}
        {endFrames > 0 ? (
          <Series.Sequence name="Precio" durationInFrames={endFrames} premountFor={fps}>
            <EndCard price={price} />
          </Series.Sequence>
        ) : null}
      </Series>
      {audio ? <Audio name="Música" src={staticFile(audio)} /> : null}
    </AbsoluteFill>
  );
};
