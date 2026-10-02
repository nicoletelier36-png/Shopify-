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

// public/hogar-mascotas.mp4, edited to 11.7s (see Root.tsx). Angle: stop
// dragging out the big vacuum for every little mess at home. Timed to
// public/voiceover/hogar.mp3 (ElevenLabs, "Victoria").
export const SCRIPT_HOGAR: ScriptLine[] = [
  { startMs: 0, endMs: 2000, text: "Deja de sacar la aspiradora grande." },
  { startMs: 2370, endMs: 5510, text: "Esta saca la tierrita de las orillas y lo que se mete en las puertas," },
  { startMs: 5650, endMs: 7260, text: "y se vacía directo al basurero." },
  { startMs: 7720, endMs: 8830, text: "Trae tres boquillas." },
  { startMs: 9070, endMs: 11440, text: "$24.990." },
];

// public/sillon.mp4, first 30s reordered (see Root.tsx). Angle: what's hiding
// in your sofa. Timed to public/voiceover/sillon.mp3 (ElevenLabs, "Victoria").
export const SCRIPT_SILLON: ScriptLine[] = [
  { startMs: 0, endMs: 2620, text: "¿Has mirado lo que esconde tu sillón entre los cojines?" },
  { startMs: 2930, endMs: 5050, text: "Migas, pelusas, tierrita:" },
  { startMs: 5310, endMs: 7460, text: "todo lo que se cae y nunca ves." },
  { startMs: 7910, endMs: 11690, text: "Con la boquilla larga llegas al fondo de las costuras sin mover nada." },
  { startMs: 12010, endMs: 14650, text: "Es inalámbrica y se carga con USB-C." },
  { startMs: 15150, endMs: 19520, text: "Pásala por las uniones y sale todo, hasta lo que la aspiradora grande no alcanza." },
  { startMs: 19930, endMs: 21210, text: "Mira todo lo que sacó." },
  { startMs: 21570, endMs: 22830, text: "Y no es solo para el sillón:" },
  { startMs: 23140, endMs: 24880, text: "sirve para el auto y el escritorio." },
  { startMs: 25220, endMs: 26340, text: "Trae tres boquillas." },
  { startMs: 26730, endMs: 28480, text: "$24.990." },
  { startMs: 28830, endMs: 29750, text: "Toca Comprar." },
];

// public/riel.mp4, edited to 14.3s (see Root.tsx). Angle: fun fact. A 2009
// study (Layton & Beamer, Environmental Science & Technology) found about 60%
// of house dust comes from outdoors. Timed to public/voiceover/riel.mp3
// (ElevenLabs, "Cristian Cornejo - Spanish Chilean"); the take doesn't say the
// price, the sticker shows it.
export const SCRIPT_RIEL: ScriptLine[] = [
  { startMs: 0, endMs: 740, text: "Dato curioso:" },
  { startMs: 930, endMs: 3490, text: "más de la mitad del polvo de tu casa viene de afuera." },
  { startMs: 3730, endMs: 4560, text: "¿Y por dónde entra?" },
  { startMs: 4820, endMs: 5250, text: "Por acá." },
  { startMs: 5510, endMs: 7660, text: "Mi riel tenía más tierra que mis plantas." },
  { startMs: 7810, endMs: 8660, text: "Mira el depósito." },
  { startMs: 8870, endMs: 10330, text: "Y eso que era un solo riel." },
  { startMs: 10570, endMs: 11180, text: "Antes…" },
  { startMs: 11530, endMs: 12140, text: "y después." },
  { startMs: 12410, endMs: 13320, text: "Toca Comprar." },
];

// public/unboxing.mp4, edited to 13.9s (see Root.tsx). Angle: unboxing +
// result ("what's in the box" and a real before/after of the driver's mat).
// Timings are estimates until the voice-over is recorded.
export const SCRIPT_UNBOXING: ScriptLine[] = [
  { startMs: 100, endMs: 1700, text: "¿Tu auto también está así?" },
  { startMs: 1800, endMs: 2900, text: "Tranqui, tiene solución." },
  { startMs: 3000, endMs: 7600, text: "Esta aspiradora inalámbrica trae sus boquillas, el filtro y el cable USB-C." },
  { startMs: 7800, endMs: 9900, text: "Asientos, portavasos, ranuras…" },
  { startMs: 10000, endMs: 11800, text: "Y así quedó." },
  { startMs: 12000, endMs: 13800, text: "$24.990. Toca Comprar." },
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
