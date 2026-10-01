# Anuncio "Puerta del auto": guion de voz en off

Video: `public/puerta-auto.mp4` (toma real de 21,5 s). Composiciones: `PuertaReel` (9:16, para Reels y Stories) y `PuertaFeed` (4:5, para el feed).
Los subtítulos de pantalla salen de `src/puerta/script.ts`. Si cambias una frase, cámbiala ahí y en este documento.

## Guion

Tono: cercano y chileno, como alguien que le muestra algo a un amigo, no como un locutor de comercial. Ritmo rápido, sin pausas largas.

| Tiempo | Lo que se ve | Voz en off |
|---|---|---|
| 0,2–2,8 s | El panel de la puerta lleno de migas | ¿Hace cuánto que no limpias la puerta de tu auto? |
| 3,0–6,6 s | Primeras pasadas | Mira todo lo que se junta ahí: migas, tierra, de todo. |
| 6,9–11,4 s | Aspira los botones y las ranuras | Con esta aspiradora inalámbrica lo saco en segundos, hasta de las ranuras. |
| 11,7–15,9 s | Bolsillo de la puerta, junto al peluche | Trae tres boquillas, se carga con USB-C y cabe en la guantera. |
| 16,2–18,6 s | Se ve el depósito lleno | Y mira cómo quedó el depósito. |
| 18,8–21,2 s | Aparece el sticker de precio | Está a veinticuatro mil novecientos noventa. Toca Comprar y pídela. |

El gancho (0–3 s) es lo más importante: tiene que sonar como una pregunta real, con energía.

## Cómo grabar y agregar la voz

1. Graba con el celular en un lugar sin eco (un clóset o un auto cerrado sirven), a 15–20 cm del micrófono. Otra opción es generarla en ElevenLabs con una voz en español latino.
2. Guarda el archivo como `public/voiceover/puerta-auto.mp3`.
3. En `src/Root.tsx`, en las dos composiciones `Puerta*`, cambia `voiceover: null` por `voiceover: "voiceover/puerta-auto.mp3"`. El sonido original de la aspiradora baja solo al 25 % para que quede de fondo.
4. Si la grabación quedó con otros tiempos, ajusta `startMs` y `endMs` de cada línea en `src/puerta/script.ts` para que los subtítulos calcen.
5. Renderiza:

```bash
npx remotion render PuertaReel out/puerta-reel-9x16.mp4
npx remotion render PuertaFeed out/puerta-feed-4x5.mp4
```

## Texto del anuncio en Meta

Texto principal:
```
¿Hace cuánto que no limpias la puerta de tu auto? 👀

Migas, tierra y polvo en las ranuras donde el paño no llega. La AeroBoost 3 en 1 lo saca en segundos:

✅ Inalámbrica, se carga con USB-C
✅ 3 boquillas para ranuras, asientos y alfombras
✅ Filtro lavable
✅ Compacta, cabe en la guantera

👉 $24.990. Toca "Comprar" y pídela.
```
Título: `Tu auto limpio en minutos`
Descripción: `Aspiradora inalámbrica 3 en 1`
CTA: **Comprar**

Versión corta para Stories o para probar contra la anterior:
```
Mira todo lo que sale de la puerta del auto 😳 Aspiradora inalámbrica 3 en 1 a $24.990 👇
```

## Recomendaciones para Meta Ads

- Sube las dos versiones (9:16 y 4:5) en el mismo anuncio con Advantage+ placements. Meta elige la que corresponde a cada ubicación.
- Objetivo **Ventas**, Advantage+ Audience en Chile. Pruébalo contra `AeroBoostReel` y `DemoReel` en el mismo conjunto de anuncios para ver qué concepto gana.
- Mira la **tasa de retención a 3 s** (hook rate, la meta es más del 25 %) y el CTR. Si el hook rate es bajo, cambia solo la primera frase del guion, por ejemplo "Esto es lo que había en la puerta de mi auto 😳".
- Los subtítulos ya están en el video, porque la mayoría lo ve sin sonido. No agregues los subtítulos automáticos de Meta encima.
