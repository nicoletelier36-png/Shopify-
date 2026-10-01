# Anuncio "Puerta del auto": guion de voz en off

Video: `public/puerta-auto.mp4` (toma real de 21,5 s). Composiciones: `PuertaReel` (9:16, para Reels y Stories) y `PuertaFeed` (4:5, para el feed).
Los subtítulos de pantalla salen de `src/ugc/script.ts` (`SCRIPT_PUERTA`). Si cambias una frase, cámbiala ahí y en este documento.

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
3. En `src/Root.tsx`, en el objeto `puerta`, cambia `voiceover: null` por `voiceover: "voiceover/puerta-auto.mp3"`. El sonido original de la aspiradora baja solo al 25 % para que quede de fondo.
4. Si la grabación quedó con otros tiempos, ajusta `startMs` y `endMs` de cada línea en `src/ugc/script.ts` (`SCRIPT_PUERTA`) para que los subtítulos calcen.
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

---

# Anuncio "Hogar": guion de voz en off

Video: `public/hogar-mascotas.mp4`, editado a 7,3 s. Composiciones: `HogarReel` (9:16) y `HogarFeed` (4:5). Guion en `src/ugc/script.ts` (`SCRIPT_HOGAR`). Los cortes están en el objeto `hogar` de `src/Root.tsx`.

**Ángulo:** comodidad. No vale la pena sacar la aspiradora grande para cada mugre chica. Es distinto al del auto ("tu auto está más sucio de lo que crees"), así que sirven para probarlos uno contra otro en Meta.

**Edición:**
- Se sacaron todas las tomas con la boquilla ancha para pisos, porque no viene con nuestro producto: de 3,43 s a 8,2 s del original (escalera, borde de la cama, sillón y alfombra del perro).
- La primera toma tiene un zoom para tapar el código del creador ("code dqd7438"), que aparece arriba a la izquierda.
- Al final se agregan 1,8 s con la foto de nuestras boquillas reales, para que el cliente vea lo que recibe.

| Tiempo | Lo que se ve | Voz en off |
|---|---|---|
| 0,1–1,6 s | Pone la boquilla | Deja de sacar la aspiradora grande. |
| 1,7–3,4 s | Zócalos y riel de la puerta | Esta llega a zócalos y rieles, |
| 3,5–5,4 s | Vacía el depósito en el basurero | y se vacía directo al basurero. |
| 5,6–7,2 s | Foto de las 3 boquillas + precio | Trae tres boquillas. Veinticuatro mil novecientos noventa. |

Para agregar la voz, sigue los mismos pasos que en el anuncio del auto: archivo `public/voiceover/hogar.mp3` y `voiceover` en el objeto `hogar`.

## Texto del anuncio en Meta

Texto principal:
```
¿Sacas la aspiradora grande cada vez que cae algo al piso? 🙃

La AeroBoost 3 en 1 queda a mano y la usas en 10 segundos: zócalos, rieles de ventanas y puertas, el plato del perro, el auto.

✅ Inalámbrica, se carga con USB-C
✅ 3 boquillas incluidas
✅ Depósito que se vacía directo al basurero
✅ Filtro lavable

👉 $24.990. Toca "Comprar".
```
Título: `La aspiradora que sí vas a usar`
Descripción: `Inalámbrica, 3 en 1, carga USB-C`
CTA: **Comprar**

**Nota sobre derechos:** el video original es de otro creador (TikTok @mrsdscleaningreviews, por el nombre del archivo y el código en pantalla). Para usarlo en anuncios pagados necesitas su permiso o una licencia. Lo mismo aplica al video del auto si no es tuyo. Si Meta recibe un reclamo de derechos de autor, puede bajar el anuncio o restringir la cuenta.
