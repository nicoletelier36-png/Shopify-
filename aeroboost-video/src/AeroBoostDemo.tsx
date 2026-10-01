import type React from "react";
import { AbsoluteFill, Series } from "remotion";
import { EndCard } from "./demo/EndCard";
import { Caption, TopLabel } from "./demo/Overlays";
import { Shot } from "./demo/Shot";
import { Suction } from "./demo/Suction";

// Modeled on a competitor's Meta ad (Ad Library 1025897413241142): a 20s
// run of hard-cut, no-talking "satisfying" demos with the product name
// pinned on top. We add sound-off captions and a short price card.
// 81 + 66 + 75 + 60 + 66 + 60 + 54 + 54 + 84 = 600 frames (20s @ 30fps)
export const AEROBOOST_DEMO_DURATION = 600;

export const AeroBoostDemo: React.FC<{ price: string }> = ({ price }) => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence name="Asiento auto" durationInFrames={81}>
          <Shot src="asp-auto.jpg" imgW={1456} imgH={1088} focus={{ x: 379, y: 815 }} anchor={{ x: 0.42, y: 0.52 }} zoomFrom={1.2} zoomTo={1.38}>
            <Suction tip={{ x: 379, y: 815 }} seed="auto" fromDeg={-10} toDeg={200} radius={330} count={90} />
          </Shot>
          <Caption text="Mira cómo desaparecen las migas 😳" delay={2} />
        </Series.Sequence>
        <Series.Sequence name="Teclado" durationInFrames={66}>
          <Shot src="asp-escritorio.jpg" imgW={1456} imgH={1088} focus={{ x: 364, y: 757 }} anchor={{ x: 0.42, y: 0.52 }} zoomFrom={1.15} zoomTo={1.3}>
            <Suction tip={{ x: 364, y: 757 }} seed="desk" fromDeg={20} toDeg={190} radius={260} count={60} start={4} sweep={34} />
          </Shot>
          <Caption text="Teclado limpio en segundos" />
        </Series.Sequence>
        <Series.Sequence name="Sillón" durationInFrames={75}>
          <Shot src="asp-sillon.jpg" imgW={1456} imgH={1088} focus={{ x: 437, y: 903 }} anchor={{ x: 0.45, y: 0.55 }} zoomFrom={1.15} zoomTo={1.3}>
            <Suction tip={{ x: 437, y: 903 }} seed="sofa" kind="hair" fromDeg={-20} toDeg={200} radius={300} count={70} start={4} />
          </Shot>
          <Caption text="Pelos de mascota 🐱 fuera" />
        </Series.Sequence>
        <Series.Sequence name="Alfombra auto" durationInFrames={60}>
          <Shot src="asp-persona-auto.jpg" imgW={1088} imgH={1360} focus={{ x: 560, y: 760 }} zoomFrom={1.0} zoomTo={1.12}>
            <Suction tip={{ x: 340, y: 952 }} seed="mat" fromDeg={0} toDeg={180} radius={170} count={50} start={2} sweep={30} />
          </Shot>
          <Caption text="Hasta el piso del auto 🚗" />
        </Series.Sequence>
        <Series.Sequence name="Filtro" durationInFrames={66}>
          <Shot src="asp-filtro.jpg" imgW={1088} imgH={1360} focus={{ x: 450, y: 560 }} zoomFrom={1.05} zoomTo={1.2} />
          <Caption text="El filtro se lava con agua 💧" />
        </Series.Sequence>
        <Series.Sequence name="Boquillas" durationInFrames={60}>
          <Shot src="asp-piezas.jpg" imgW={1264} imgH={1264} focus={{ x: 632, y: 632 }} zoomFrom={1.0} zoomTo={1.12} />
          <Caption text="3 boquillas para cada rincón" />
        </Series.Sequence>
        <Series.Sequence name="Carga" durationInFrames={54}>
          <Shot src="asp-cargando.jpg" imgW={1088} imgH={1360} focus={{ x: 465, y: 640 }} zoomFrom={1.05} zoomTo={1.18} />
          <Caption text="Sin cables: carga USB-C 🔌" />
        </Series.Sequence>
        <Series.Sequence name="Guantera" durationInFrames={54}>
          <Shot src="asp-guantera.jpg" imgW={1088} imgH={1360} focus={{ x: 735, y: 640 }} zoomFrom={1.05} zoomTo={1.18} />
          <Caption text="Y cabe en la guantera 📦" />
        </Series.Sequence>
        <Series.Sequence name="Precio" durationInFrames={84}>
          <EndCard price={price} />
        </Series.Sequence>
      </Series>
      <Series>
        <Series.Sequence durationInFrames={AEROBOOST_DEMO_DURATION - 84}>
          <TopLabel text="Aspiradora inalámbrica 3 en 1" />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
