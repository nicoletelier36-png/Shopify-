import { Audio, Video } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TopLabel, useSafeArea } from "./demo/Overlays";
import { SCRIPT, scriptToCaptions } from "./puerta/script";
import { TikTokCaptions } from "./puerta/TikTokCaptions";
import { colors, fontFamily } from "./theme";

// Real footage (single 21.5s take cleaning a car door panel) + scripted
// voice-over captions, product label and price sticker, for Meta Ads.
export const PUERTA_DURATION = 643;
const PRICE_FROM = 564; // 18.8s, when the voice-over says the price

export type PuertaAutoAdProps = {
  price: string;
  // Path inside public/, e.g. "voiceover/puerta-auto.mp3". null = no VO yet.
  voiceover: string | null;
};

export const PuertaAutoAd: React.FC<PuertaAutoAdProps> = ({ price, voiceover }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quick zoom-out on the first frames to stop the scroll, then a slow push-in.
  const scale =
    interpolate(frame, [0, 10], [1.18, 1.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) +
    interpolate(frame, [10, PUERTA_DURATION], [0, 0.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      <AbsoluteFill style={{ scale }}>
        <Video
          name="Puerta del auto"
          src={staticFile("puerta-auto.mp4")}
          objectFit="cover"
          style={{ width: "100%", height: "100%" }}
          // Keep the vacuum sound as background ASMR under the voice.
          volume={voiceover ? 0.25 : 0.8}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      {voiceover ? <Audio name="Voz en off" src={staticFile(voiceover)} premountFor={fps} /> : null}
      <TopLabel text="Aspiradora inalámbrica 3 en 1" />
      <TikTokCaptions captions={scriptToCaptions(SCRIPT)} />
      <Sequence name="Precio" from={PRICE_FROM} premountFor={fps}>
        <PriceSticker price={price} />
      </Sequence>
    </AbsoluteFill>
  );
};

const PriceSticker: React.FC<{ price: string }> = ({ price }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const safe = useSafeArea();
  const pop = spring({ frame, fps, config: { damping: 10, stiffness: 180 } });
  const cta = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  const tall = height > 1500;

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: safe.top + (tall ? 170 : 90), gap: 18 }}>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: tall ? 120 : 96,
          letterSpacing: -3,
          color: colors.ink,
          backgroundColor: "#FFE14D",
          padding: "8px 40px",
          borderRadius: 28,
          rotate: "-4deg",
          boxShadow: "0 14px 40px rgba(0,0,0,0.45)",
          scale: interpolate(pop, [0, 1], [0.3, 1]),
          opacity: interpolate(pop, [0, 0.25], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {price}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: tall ? 50 : 42,
          color: colors.white,
          backgroundColor: colors.ink,
          padding: "16px 40px",
          borderRadius: 999,
          opacity: cta,
          translate: `0px ${interpolate(cta, [0, 1], [30, 0])}px`,
        }}
      >
        Toca &quot;Comprar&quot; 👇
      </div>
    </AbsoluteFill>
  );
};
