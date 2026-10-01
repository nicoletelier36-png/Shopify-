import { Audio, Video } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, Sequence, Series, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Shot } from "../demo/Shot";
import { TopLabel, useSafeArea } from "../demo/Overlays";
import { colors, fontFamily } from "../theme";
import type { ScriptLine } from "./script";
import { scriptToCaptions } from "./script";
import { TikTokCaptions } from "./TikTokCaptions";

// Real (UGC-style) footage + voice-over script captions, product label and a
// price sticker, for Meta Ads. One component, one script per video.
export type Clip = {
  trimBefore: number;
  durationInFrames: number;
  // Optional punch-in for this clip, e.g. to crop a watermark out of frame.
  zoom?: { scale: number; origin: string };
  // Slightly slow footage down (e.g. 0.96) to fit a longer voice-over.
  // durationInFrames is output frames; source used = durationInFrames × rate.
  playbackRate?: number;
};
export type EndPhoto = { src: string; imgW: number; imgH: number; durationInFrames: number };

// Total length of an ad, for the <Composition> durationInFrames.
export const ugcDuration = (clips: Clip[], endPhotos: EndPhoto[]) =>
  [...clips, ...endPhotos].reduce((sum, c) => sum + c.durationInFrames, 0);

export type UgcAdProps = {
  // Footage inside public/, and the parts of it to keep (in source frames).
  video: string;
  clips: Clip[];
  // Product shots after the footage (e.g. what's in the box), in order.
  endPhotos: EndPhoto[];
  script: ScriptLine[];
  label: string;
  price: string;
  // When the voice-over says the price.
  priceFromMs: number;
  // Path inside public/, e.g. "voiceover/puerta-auto.mp3". null = no VO yet.
  voiceover: string | null;
};

export const UgcAd: React.FC<UgcAdProps> = ({ video, clips, endPhotos, script, label, price, priceFromMs, voiceover }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Quick zoom-out on the first frames to stop the scroll, then a slow push-in.
  const scale =
    interpolate(frame, [0, 10], [1.18, 1.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) +
    interpolate(frame, [10, durationInFrames], [0, 0.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      <AbsoluteFill style={{ scale }}>
        <Series>
          {clips.map((clip) => (
            <Series.Sequence key={clip.trimBefore} name={`Corte ${clip.trimBefore}`} durationInFrames={clip.durationInFrames} premountFor={fps}>
              <Video
                src={staticFile(video)}
                trimBefore={clip.trimBefore}
                playbackRate={clip.playbackRate ?? 1}
                objectFit="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  scale: clip.zoom?.scale ?? 1,
                  transformOrigin: clip.zoom?.origin ?? "center",
                }}
                // Keep the original sound as background ASMR under the voice.
                volume={voiceover ? 0.25 : 0.8}
              />
            </Series.Sequence>
          ))}
          {endPhotos.map((photo) => (
            <Series.Sequence key={photo.src} name={`Foto ${photo.src}`} durationInFrames={photo.durationInFrames} premountFor={fps}>
              <Shot src={photo.src} imgW={photo.imgW} imgH={photo.imgH} focus={{ x: photo.imgW / 2, y: photo.imgH / 2 }} zoomFrom={1.0} zoomTo={1.1} />
            </Series.Sequence>
          ))}
        </Series>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      {voiceover ? <Audio name="Voz en off" src={staticFile(voiceover)} premountFor={fps} /> : null}
      <TopLabel text={label} />
      <TikTokCaptions captions={scriptToCaptions(script)} />
      <Sequence name="Precio" from={Math.round((priceFromMs / 1000) * fps)} premountFor={fps}>
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
