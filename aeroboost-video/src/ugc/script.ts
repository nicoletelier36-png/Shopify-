import type { Caption } from "@remotion/captions";

// Voice-over scripts, each timed to its footage in public/. These are the
// single source of truth: on-screen captions are generated from them, and the
// VOICEOVER*.md guides list the same lines for recording.
export type ScriptLine = { startMs: number; endMs: number; text: string };

// public/puerta-auto.mp4 (21.5s, played at 0.96× to fit the voice-over).
// Angle: your car is dirtier than you think. Timed to
// public/voiceover/puerta-auto.mp3 (ElevenLabs, "Catalina - Chilean Spanish").
export const SCRIPT_PUERTA: ScriptLine[] = [
  { startMs: 0, endMs: 2440, text: "¿Hace cuánto que no limpias la puerta de tu auto?" },
  { startMs: 2790, endMs: 4360, text: "Mira todo lo que se junta ahí:" },
  { startMs: 4670, endMs: 6720, text: "migas, tierra, de todo." },
  { startMs: 7220, endMs: 11320, text: "Con esta aspiradora inalámbrica lo saco en segundos, hasta de las ranuras." },
  { startMs: 11720, endMs: 15670, text: "Trae tres boquillas, se carga con USB-C y cabe en la guantera." },
  { startMs: 16130, endMs: 17580, text: "Y mira cómo quedó el depósito." },
  { startMs: 17870, endMs: 20210, text: "Está a $24.990." },
  { startMs: 20580, endMs: 22000, text: "Toca Comprar y pídela." },
];

// public/hogar-mascotas.mp4, edited down to 7.3s (see Root.tsx). Angle: stop
// dragging out the big vacuum for every little mess at home.
export const SCRIPT_HOGAR: ScriptLine[] = [
  { startMs: 100, endMs: 1600, text: "Deja de sacar la aspiradora grande." },
  { startMs: 1700, endMs: 3400, text: "Esta llega a zócalos y rieles," },
  { startMs: 3500, endMs: 5400, text: "y se vacía directo al basurero." },
  { startMs: 5600, endMs: 7200, text: "Trae tres boquillas. $24.990." },
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
