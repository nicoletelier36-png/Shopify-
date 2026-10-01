import { Composition, Folder } from "remotion";
import { AEROBOOST_DURATION, AeroBoostAd } from "./AeroBoostAd";
import { AEROBOOST_DEMO_DURATION, AeroBoostDemo } from "./AeroBoostDemo";
import { SCRIPT_HOGAR, SCRIPT_PUERTA } from "./ugc/script";
import type { UgcAdProps } from "./ugc/UgcAd";
import { UgcAd, ugcDuration } from "./ugc/UgcAd";
import { CtaScene } from "./scenes/CtaScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { HookScene } from "./scenes/HookScene";
import { RevealScene } from "./scenes/RevealScene";
import { UsesScene } from "./scenes/UsesScene";

const reel = { width: 1080, height: 1920, fps: 30 };
const feed = { width: 1080, height: 1350, fps: 30 };

const puerta: UgcAdProps = {
  video: "puerta-auto.mp4",
  clips: [{ trimBefore: 0, durationInFrames: 643 }],
  endPhoto: null,
  script: SCRIPT_PUERTA,
  label: "Aspiradora inalámbrica 3 en 1",
  price: "$24.990",
  priceFromMs: 18800,
  voiceover: null,
};

// The 3.43s–8.2s stretch of the source uses a wide floor head we don't sell,
// so it's cut; the ad closes on our real nozzle set instead. The first shot
// (frames 0–33) carries the creator's code in the top-left corner, so it is
// zoomed from the bottom-right to push that corner out of frame.
const hogar: UgcAdProps = {
  video: "hogar-mascotas.mp4",
  clips: [
    { trimBefore: 0, durationInFrames: 34, zoom: { scale: 1.22, origin: "100% 100%" } },
    { trimBefore: 34, durationInFrames: 69 },
    { trimBefore: 246, durationInFrames: 63 },
  ],
  endPhoto: { src: "asp-piezas.jpg", imgW: 1264, imgH: 1264, durationInFrames: 54 },
  script: SCRIPT_HOGAR,
  label: "Aspiradora inalámbrica 3 en 1",
  price: "$24.990",
  priceFromMs: 5600,
  voiceover: null,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="AeroBoostReel" component={AeroBoostAd} durationInFrames={AEROBOOST_DURATION} {...reel} />
      <Folder name="Puerta">
        <Composition id="PuertaReel" component={UgcAd} durationInFrames={ugcDuration(puerta.clips, puerta.endPhoto)} {...reel} defaultProps={puerta} />
        <Composition id="PuertaFeed" component={UgcAd} durationInFrames={ugcDuration(puerta.clips, puerta.endPhoto)} {...feed} defaultProps={puerta} />
      </Folder>
      <Folder name="Hogar">
        <Composition id="HogarReel" component={UgcAd} durationInFrames={ugcDuration(hogar.clips, hogar.endPhoto)} {...reel} defaultProps={hogar} />
        <Composition id="HogarFeed" component={UgcAd} durationInFrames={ugcDuration(hogar.clips, hogar.endPhoto)} {...feed} defaultProps={hogar} />
      </Folder>
      <Folder name="Demo">
        <Composition id="DemoReel" component={AeroBoostDemo} durationInFrames={AEROBOOST_DEMO_DURATION} {...reel} defaultProps={{ price: "$24.990" }} />
        <Composition id="DemoFeed" component={AeroBoostDemo} durationInFrames={AEROBOOST_DEMO_DURATION} {...feed} defaultProps={{ price: "$24.990" }} />
      </Folder>
      <Folder name="Escenas">
        <Composition
          id="Hook"
          component={HookScene}
          durationInFrames={75}
          {...reel}
          defaultProps={{ photo: "asp-persona-auto.jpg", text: "¿Tu auto lleno de migas?", highlight: ["migas"], objectPosition: "center 70%" }}
        />
        <Composition id="Producto" component={RevealScene} durationInFrames={90} {...reel} />
        <Composition id="Usos" component={UsesScene} durationInFrames={105} {...reel} />
        <Composition id="Caracteristicas" component={FeaturesScene} durationInFrames={105} {...reel} />
        <Composition id="CTA" component={CtaScene} durationInFrames={105} {...reel} defaultProps={{ price: "$24.990" }} />
      </Folder>
    </>
  );
};
