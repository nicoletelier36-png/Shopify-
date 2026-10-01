import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type React from "react";
import { useMemo } from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useSafeArea } from "../demo/Overlays";
import { fontFamily } from "../theme";

const ACTIVE = "#FFE14D";

// Word-by-word captions in the native Reels/TikTok style: big white words
// with a heavy outline, the word being spoken in yellow.
export const TikTokCaptions: React.FC<{ captions: Caption[] }> = ({ captions }) => {
  const { fps } = useVideoConfig();
  const { pages } = useMemo(
    () => createTikTokStyleCaptions({ captions, combineTokensWithinMilliseconds: 900 }),
    [captions],
  );

  return (
    <AbsoluteFill>
      {pages.map((page, i) => {
        const next = pages[i + 1];
        const from = Math.round((page.startMs / 1000) * fps);
        const endMs = next ? Math.min(next.startMs, page.startMs + page.durationMs + 600) : page.startMs + page.durationMs + 400;
        const duration = Math.max(1, Math.round((endMs / 1000) * fps) - from);
        return (
          <Sequence key={i} from={from} durationInFrames={duration} name={`Subtítulo: ${page.text.trim()}`}>
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const CaptionPage: React.FC<{ page: ReturnType<typeof createTikTokStyleCaptions>["pages"][number] }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const safe = useSafeArea();
  const nowMs = page.startMs + (frame / fps) * 1000;
  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 260 }, durationInFrames: 8 });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: safe.bottom + 40,
        paddingLeft: safe.side,
        paddingRight: safe.side,
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 76,
          lineHeight: 1.12,
          textAlign: "center",
          color: "white",
          WebkitTextStroke: "14px black",
          paintOrder: "stroke",
          textShadow: "0 6px 18px rgba(0,0,0,0.45)",
          scale: interpolate(pop, [0, 1], [0.85, 1]),
        }}
      >
        {page.tokens.map((t) => {
          const active = nowMs >= t.fromMs && nowMs < t.toMs;
          return (
            <span key={t.fromMs} style={{ color: active ? ACTIVE : "white", whiteSpace: "pre" }}>
              {t.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
