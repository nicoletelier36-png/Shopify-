import type { Caption } from "@remotion/captions";

// Voice-over script, timed to the footage in public/puerta-auto.mp4.
// This is the single source of truth: on-screen captions are generated from
// it, and VOICEOVER.md is the recording guide for the same lines.
export type ScriptLine = { startMs: number; endMs: number; text: string };

export const SCRIPT: ScriptLine[] = [
  { startMs: 200, endMs: 2800, text: "¿Hace cuánto que no limpias la puerta de tu auto?" },
  { startMs: 3000, endMs: 6600, text: "Mira todo lo que se junta ahí: migas, tierra, de todo." },
  { startMs: 6900, endMs: 11400, text: "Con esta aspiradora inalámbrica lo saco en segundos, hasta de las ranuras." },
  { startMs: 11700, endMs: 15900, text: "Trae tres boquillas, se carga con USB-C y cabe en la guantera." },
  { startMs: 16200, endMs: 18600, text: "Y mira cómo quedó el depósito." },
  { startMs: 18800, endMs: 21200, text: "Está a $24.990. Toca Comprar y pídela." },
];

// Split each line into words and spread them across the line's time span,
// weighted by length (a rough stand-in for how long each word takes to say).
// Re-time against the real recording once it exists.
export const scriptToCaptions = (script: ScriptLine[]): Caption[] =>
  script.flatMap((line) => {
    const words = line.text.split(" ");
    const weights = words.map((w) => w.length + 2);
    const total = weights.reduce((a, b) => a + b, 0);
    const span = line.endMs - line.startMs;
    let t = line.startMs;
    return words.map((word, i) => {
      const startMs = t;
      t += (weights[i] / total) * span;
      return {
        text: (i === 0 ? "" : " ") + word,
        startMs: Math.round(startMs),
        endMs: Math.round(t),
        timestampMs: null,
        confidence: null,
        pageBreakAfter: i === words.length - 1,
      };
    });
  });
