import { Composition, Folder } from "remotion";
import { AEROBOOST_DURATION, AeroBoostAd } from "./AeroBoostAd";
import { CtaScene } from "./scenes/CtaScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { HookScene } from "./scenes/HookScene";
import { RevealScene } from "./scenes/RevealScene";
import { UsesScene } from "./scenes/UsesScene";

const reel = { width: 1080, height: 1920, fps: 30 };

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="AeroBoostReel" component={AeroBoostAd} durationInFrames={AEROBOOST_DURATION} {...reel} />
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
