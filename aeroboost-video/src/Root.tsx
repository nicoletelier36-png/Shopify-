import { Composition, Folder } from "remotion";
import { AEROBOOST_DURATION, AeroBoostAd } from "./AeroBoostAd";
import { AEROBOOST_DEMO_DURATION, AeroBoostDemo } from "./AeroBoostDemo";
import { PUERTA_DURATION, PuertaAutoAd } from "./PuertaAutoAd";
import { CtaScene } from "./scenes/CtaScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { HookScene } from "./scenes/HookScene";
import { RevealScene } from "./scenes/RevealScene";
import { UsesScene } from "./scenes/UsesScene";

const reel = { width: 1080, height: 1920, fps: 30 };
const feed = { width: 1080, height: 1350, fps: 30 };

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="AeroBoostReel" component={AeroBoostAd} durationInFrames={AEROBOOST_DURATION} {...reel} />
      <Folder name="Puerta">
        <Composition id="PuertaReel" component={PuertaAutoAd} durationInFrames={PUERTA_DURATION} {...reel} defaultProps={{ price: "$24.990", voiceover: null }} />
        <Composition id="PuertaFeed" component={PuertaAutoAd} durationInFrames={PUERTA_DURATION} {...feed} defaultProps={{ price: "$24.990", voiceover: null }} />
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
