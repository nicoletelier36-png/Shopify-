import type React from "react";
import { AbsoluteFill } from "remotion";
import { PhotoBg, PopWords } from "../components";
import { SAFE_TOP, SIDE } from "../theme";

// 0–2.5s: pattern interrupt with the most relatable pain point.
export const HookScene: React.FC<{
  photo: string;
  text: string;
  highlight: string[];
  objectPosition?: string;
}> = ({ photo, text, highlight, objectPosition }) => {
  return (
    <AbsoluteFill>
      <PhotoBg src={photo} objectPosition={objectPosition} zoomFrom={1.15} zoomTo={1.32} />
      <AbsoluteFill style={{ padding: `${SAFE_TOP}px ${SIDE}px 0` }}>
        <PopWords text={text} highlight={highlight} fontSize={112} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
