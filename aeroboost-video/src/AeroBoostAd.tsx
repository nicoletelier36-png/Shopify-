import type React from "react";
import { linearTiming, springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { useVideoConfig } from "remotion";
import { CtaScene } from "./scenes/CtaScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { HookScene } from "./scenes/HookScene";
import { RevealScene } from "./scenes/RevealScene";
import { UsesScene } from "./scenes/UsesScene";

// 75 + 60 + 90 + 105 + 105 + 105 - 5 × 12 = 480 frames (16s @ 30fps)
export const AEROBOOST_DURATION = 480;

export const AeroBoostAd: React.FC = () => {
  const { fps } = useVideoConfig();
  const t = linearTiming({ durationInFrames: 12 });

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook auto" durationInFrames={75} premountFor={fps}>
        <HookScene photo="asp-persona-auto.jpg" text="¿Tu auto lleno de migas?" highlight={["migas"]} objectPosition="center 70%" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
      <TransitionSeries.Sequence name="Hook sillón" durationInFrames={60} premountFor={fps}>
        <HookScene photo="asp-sillon.jpg" text="¿Pelos de mascota en el sillón?" highlight={["Pelos", "mascota"]} objectPosition="35% center" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={t} />
      <TransitionSeries.Sequence name="Producto" durationInFrames={90} premountFor={fps}>
        <RevealScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 12 })} />
      <TransitionSeries.Sequence name="Usos" durationInFrames={105} premountFor={fps}>
        <UsesScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Características" durationInFrames={105} premountFor={fps}>
        <FeaturesScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Precio y CTA" durationInFrames={105} premountFor={fps}>
        <CtaScene price="$24.990" />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
