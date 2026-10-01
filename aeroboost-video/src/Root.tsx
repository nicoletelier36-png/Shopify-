import { Composition, Folder, Still } from "remotion";
import { StaticAd } from "./static/StaticAd";
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
  // 668 output frames × 0.96 = 641 source frames, so the 22.2s voice fits.
  clips: [{ trimBefore: 0, durationInFrames: 668, playbackRate: 0.96 }],
  endPhotos: [],
  script: SCRIPT_PUERTA,
  label: "Aspiradora inalámbrica 3 en 1",
  price: "$24.990",
  priceFromMs: 17870,
  voiceover: "voiceover/puerta-auto.mp3",
};

// The 3.43s–8.2s stretch of the source uses a wide floor head we don't sell,
// so it's cut; the ad closes on our real nozzle set and the product. The first
// shot (frames 0–33) carries the creator's code in the top-left corner, so it
// is zoomed from the bottom-right to push that corner out of frame. Clips are
// slowed so the 11.7s voice-over fits.
const hogar: UgcAdProps = {
  video: "hogar-mascotas.mp4",
  clips: [
    // 49 × 0.7 ≈ 34 source frames (pone la boquilla).
    { trimBefore: 0, durationInFrames: 49, playbackRate: 0.7, zoom: { scale: 1.22, origin: "100% 100%" } },
    // 111 × 0.62 ≈ 69 source frames: orillas de la alfombra ("las orillas"),
    // then the door track ("lo que se mete en las puertas").
    { trimBefore: 34, durationInFrames: 111, playbackRate: 0.62 },
    // 70 × 0.9 = 63 source frames (vaciado al basurero).
    { trimBefore: 246, durationInFrames: 70, playbackRate: 0.9 },
  ],
  endPhotos: [
    { src: "asp-piezas.jpg", imgW: 1264, imgH: 1264, durationInFrames: 40 },
    { src: "asp-estudio.jpg", imgW: 1264, imgH: 1264, durationInFrames: 80 },
  ],
  script: SCRIPT_HOGAR,
  label: "Aspiradora inalámbrica 3 en 1",
  price: "$24.990",
  priceFromMs: 9070,
  voiceover: "voiceover/hogar.mp3",
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="AeroBoostReel" component={AeroBoostAd} durationInFrames={AEROBOOST_DURATION} {...reel} />
      <Folder name="Puerta">
        <Composition id="PuertaReel" component={UgcAd} durationInFrames={ugcDuration(puerta.clips, puerta.endPhotos)} {...reel} defaultProps={puerta} />
        <Composition id="PuertaFeed" component={UgcAd} durationInFrames={ugcDuration(puerta.clips, puerta.endPhotos)} {...feed} defaultProps={puerta} />
      </Folder>
      <Folder name="Estaticos">
        <Still
          id="EstaticoAuto"
          component={StaticAd}
          {...{ width: 1080, height: 1350 }}
          defaultProps={{
            headline: "¿Tu auto lleno de",
            highlight: "migas y polvo?",
            photo: "asp-auto.jpg",
            bullets: ["Inalámbrica, 120W", "Carga USB-C", "Filtro lavable", "Cabe en la guantera"],
            price: "$24.990",
            footer: "Toca \"Comprar\" y pídela hoy 👇",
          }}
        />
        <Still
          id="EstaticoHogar"
          component={StaticAd}
          {...{ width: 1080, height: 1350 }}
          defaultProps={{
            headline: "Olvídate de la",
            highlight: "aspiradora grande",
            photo: "asp-sillon.jpg",
            bullets: ["Pelos de mascota", "Migas y polvo", "Sillón, auto y escritorio", "Inalámbrica, carga USB-C"],
            price: "$24.990",
            footer: "Toca \"Comprar\" y pídela hoy 👇",
          }}
        />
      </Folder>
      <Folder name="Hogar">
        <Composition id="HogarReel" component={UgcAd} durationInFrames={ugcDuration(hogar.clips, hogar.endPhotos)} {...reel} defaultProps={hogar} />
        <Composition id="HogarFeed" component={UgcAd} durationInFrames={ugcDuration(hogar.clips, hogar.endPhotos)} {...feed} defaultProps={hogar} />
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
