import type React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Chip, PhotoBg, PopWords } from "../components";
import { SAFE_TOP, SIDE } from "../theme";

const UseCut: React.FC<{ photo: string; label: string; title: string; objectPosition?: string }> = ({
  photo,
  label,
  title,
  objectPosition,
}) => (
  <AbsoluteFill>
    <PhotoBg src={photo} objectPosition={objectPosition} zoomFrom={1.08} zoomTo={1.2} />
    <AbsoluteFill style={{ padding: `${SAFE_TOP}px ${SIDE}px 0` }}>
      <Chip>{label}</Chip>
      <div style={{ marginTop: 28 }}>
        <PopWords text={title} fontSize={96} delay={4} />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// Quick montage: one product, every place you need it.
export const UsesScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence name="Auto" durationInFrames={35} premountFor={fps}>
        <UseCut photo="asp-auto.jpg" label="🚗 Auto" title="Asientos impecables" objectPosition="60% center" />
      </Sequence>
      <Sequence name="Escritorio" from={35} durationInFrames={35} premountFor={fps}>
        <UseCut photo="asp-escritorio.jpg" label="💻 Escritorio" title="Teclado sin migas" objectPosition="55% center" />
      </Sequence>
      <Sequence name="Guantera" from={70} durationInFrames={35} premountFor={fps}>
        <UseCut photo="asp-guantera.jpg" label="📦 Compacta" title="Cabe en la guantera" />
      </Sequence>
    </AbsoluteFill>
  );
};
