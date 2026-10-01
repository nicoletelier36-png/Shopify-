import { Composition, Folder, Still } from "remotion";
import { StaticAd } from "./static/StaticAd";
import type { SwapAdProps } from "./swap/SwapAd";
import { SwapAd, swapDuration } from "./swap/SwapAd";
import { AEROBOOST_DURATION, AeroBoostAd } from "./AeroBoostAd";
import { AEROBOOST_DEMO_DURATION, AeroBoostDemo } from "./AeroBoostDemo";
import { SCRIPT_HOGAR, SCRIPT_PUERTA, SCRIPT_RIEL, SCRIPT_SILLON } from "./ugc/script";
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
  beforeAfter: null,
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
  beforeAfter: null,
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

// First 30s of the source, reordered and trimmed to the 30s voice-over: the
// hook is the moment she pulls crumbs out from under the cushion
// (11.9–13.4s); each later cut lands on its line of the script. The footage
// has no audio track. Ends on our own nozzle set and product shot.
const sillon: UgcAdProps = {
  video: "sillon.mp4",
  clips: [
    { trimBefore: 357, durationInFrames: 45 }, // crumbs under the cushion
    { trimBefore: 0, durationInFrames: 330 }, // crevices full of crumbs
    { trimBefore: 402, durationInFrames: 60 }, // full view of the vacuum
    { trimBefore: 465, durationInFrames: 165 }, // seams
    { trimBefore: 645, durationInFrames: 54 }, // full dust cup
    { trimBefore: 705, durationInFrames: 99 }, // more seams
  ],
  beforeAfter: null,
  endPhotos: [
    { src: "asp-piezas.jpg", imgW: 1264, imgH: 1264, durationInFrames: 45 },
    { src: "asp-estudio.jpg", imgW: 1264, imgH: 1264, durationInFrames: 102 },
  ],
  script: SCRIPT_SILLON,
  label: "Aspiradora inalámbrica 3 en 1",
  price: "$24.990",
  priceFromMs: 26730,
  voiceover: "voiceover/sillon.mp3",
};

// Product fixed in the centre while the place changes on every beat of the
// reference reel's music (every 1.76s), clean images with no text.
// Backgrounds generated with Canva AI (top-down, no product).
const swap: SwapAdProps = {
  scenes: [
    { bg: "fondos/auto-asiento.jpg", label: "Auto 🚗" },
    { bg: "fondos/sillon.jpg", label: "Sillón 🛋️", kind: "hair" },
    { bg: "fondos/escritorio.jpg", label: "Escritorio 💻" },
    { bg: "fondos/auto-alfombra.jpg", label: "Alfombra del auto" },
    { bg: "fondos/perro.jpg", label: "Rincón del perro 🐶", kind: "hair" },
  ],
  // Cuts at 1.76s, 3.52s, 5.28s, 7.04s, matching the music; 8.8s total.
  sceneFrames: [53, 53, 52, 53, 53],
  endFrames: 0,
  price: "$24.990",
  showText: false,
  audio: "lugares-audio.m4a",
};

// Window track full of dust (33s source). The meme at the end (30.4s+) is
// cut; slow stretches are sped up; a before/after split uses two frames of
// the same footage (4.0s and 24.6s). Angle: fun fact about household dust.
const riel: UgcAdProps = {
  video: "riel.mp4",
  clips: [
    // 215 × 1.3 ≈ 279 source frames: dirty track, vacuuming starts.
    { trimBefore: 0, durationInFrames: 215, playbackRate: 1.3 },
    { trimBefore: 312, durationInFrames: 78 }, // full dust cup
    // 66 × 1.5 = 99 source frames: the track already clean.
    { trimBefore: 591, durationInFrames: 66, playbackRate: 1.5 },
  ],
  beforeAfter: { before: "riel-antes.jpg", after: "riel-despues.jpg", durationInFrames: 75 },
  endPhotos: [{ src: "asp-estudio.jpg", imgW: 1264, imgH: 1264, durationInFrames: 75 }],
  script: SCRIPT_RIEL,
  label: "Aspiradora inalámbrica 3 en 1",
  price: "$24.990",
  priceFromMs: 14500,
  voiceover: null,
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
      <Folder name="Lugares">
        <Composition id="LugaresReel" component={SwapAd} durationInFrames={swapDuration(swap)} {...reel} defaultProps={swap} />
        <Composition id="LugaresFeed" component={SwapAd} durationInFrames={swapDuration(swap)} {...feed} defaultProps={swap} />
      </Folder>
      <Folder name="Riel">
        <Composition id="RielReel" component={UgcAd} durationInFrames={ugcDuration(riel.clips, riel.endPhotos, riel.beforeAfter)} {...reel} defaultProps={riel} />
        <Composition id="RielFeed" component={UgcAd} durationInFrames={ugcDuration(riel.clips, riel.endPhotos, riel.beforeAfter)} {...feed} defaultProps={riel} />
      </Folder>
      <Folder name="Sillon">
        <Composition id="SillonReel" component={UgcAd} durationInFrames={ugcDuration(sillon.clips, sillon.endPhotos)} {...reel} defaultProps={sillon} />
        <Composition id="SillonFeed" component={UgcAd} durationInFrames={ugcDuration(sillon.clips, sillon.endPhotos)} {...feed} defaultProps={sillon} />
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
