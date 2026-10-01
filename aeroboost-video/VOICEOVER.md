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
5. Renderiza y normaliza el volumen a unos −15 LUFS (el nivel normal en Reels):

```bash
npx remotion render PuertaReel out/puerta-reel-9x16.mp4
npx remotion render PuertaFeed out/puerta-feed-4x5.mp4
for f in out/puerta-reel-9x16 out/puerta-feed-4x5; do
  ffmpeg -y -i $f.mp4 -c:v copy -af loudnorm=I=-15:TP=-1.5:LRA=11 -c:a aac -b:a 192k $f-final.mp4
done
```

**Estado:** la voz ya está grabada (ElevenLabs, voz "Catalina - Chilean Spanish") en `public/voiceover/puerta-auto.mp3`, y los subtítulos están ajustados a sus tiempos reales. La voz dura 22,2 s, así que el video corre al 96 % de velocidad para calzar.

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

Video: `public/hogar-mascotas.mp4`, editado a 11,7 s para calzar con la voz. Composiciones: `HogarReel` (9:16) y `HogarFeed` (4:5). Guion en `src/ugc/script.ts` (`SCRIPT_HOGAR`). Los cortes están en el objeto `hogar` de `src/Root.tsx`.

**Ángulo:** comodidad. No vale la pena sacar la aspiradora grande para cada mugre chica. Es distinto al del auto ("tu auto está más sucio de lo que crees"), así que sirven para probarlos uno contra otro en Meta.

**Edición:**
- Se sacaron todas las tomas con la boquilla ancha para pisos, porque no viene con nuestro producto: de 3,43 s a 8,2 s del original (escalera, borde de la cama, sillón y alfombra del perro).
- La primera toma tiene un zoom para tapar el código del creador ("code dqd7438"), que aparece arriba a la izquierda.
- Al final van la foto de nuestras 3 boquillas reales (cuando la voz dice "tres boquillas") y la foto del producto con el precio.
- **Voz:** ElevenLabs, voz "Victoria", en `public/voiceover/hogar.mp3`. Dura 11,7 s, así que las tomas reales van más lentas (entre 62 % y 90 % de velocidad).

| Tiempo | Lo que se ve | Voz en off |
|---|---|---|
| 0–2,0 s | Pone la boquilla | Deja de sacar la aspiradora grande. |
| 2,4–5,5 s | Orilla de la alfombra, luego el riel de la puerta | Esta saca la tierrita de las orillas y lo que se mete en las puertas, |
| 5,6–7,3 s | Vacía el depósito en el basurero | y se vacía directo al basurero. |
| 7,7–8,8 s | Foto de las 3 boquillas | Trae tres boquillas. |
| 9,1–11,4 s | Foto del producto + precio | Veinticuatro mil novecientos noventa. |


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

---

# Anuncio "Sillón": guion de voz en off

Video: `public/sillon.mp4` (los primeros 30 s del original, que viene sin audio). Composiciones: `SillonReel` (9:16) y `SillonFeed` (4:5). Guion en `src/ugc/script.ts` (`SCRIPT_SILLON`). Cortes en el objeto `sillon` de `src/Root.tsx`.

**Ángulo:** "lo que esconde tu sillón". Curiosidad con algo de asco, el mismo gancho que escala Uproot Clean ("lo que está enterrado en tu alfombra").

**Edición:**
- Abre con el momento en que saca migas de debajo del cojín (11,9–13,4 s del original), para que la mugre se vea en el primer segundo.
- Después van las tomas del original recortadas para que cada una caiga con su frase. Cierra con la foto de nuestras 3 boquillas y la del producto con el precio. Dura 30 s.
- **Voz:** ElevenLabs, voz "Victoria", en `public/voiceover/sillon.mp3`. Los subtítulos siguen las 12 pausas reales de la grabación.

| Tiempo | Imagen | Voz en off |
|---|---|---|
| 0–2,6 s | Saca migas de debajo del cojín | ¿Has mirado lo que esconde tu sillón entre los cojines? |
| 2,9–7,5 s | Aspira la costura llena de migas | Migas, pelusas, tierrita: todo lo que se cae y nunca ves. |
| 7,9–11,7 s | Boquilla larga en las costuras | Con la boquilla larga llegas al fondo de las costuras sin mover nada. |
| 12–14,7 s | Se ve la aspiradora completa | Es inalámbrica y se carga con USB-C. |
| 15,2–19,5 s | Uniones del sillón | Pásala por las uniones y sale todo, hasta lo que la aspiradora grande no alcanza. |
| 19,9–21,2 s | Depósito lleno | Mira todo lo que sacó. |
| 21,6–24,9 s | Sigue aspirando | Y no es solo para el sillón: sirve para el auto y el escritorio. |
| 25,2–26,3 s | Foto de las 3 boquillas | Trae tres boquillas. |
| 26,7–30 s | Producto + precio | Veinticuatro mil novecientos noventa. Toca Comprar. |

Texto para pegar en ElevenLabs (voz Victoria o Catalina):
```
¿Has mirado lo que esconde tu sillón entre los cojines? Migas, pelusas, tierrita: todo lo que se cae y nunca ves. Con la boquilla larga llegas al fondo de las costuras sin mover nada. Es inalámbrica y se carga con USB-C. Pásala por las uniones y sale todo, hasta lo que la aspiradora grande no alcanza. Mira todo lo que sacó. Y no es solo para el sillón: sirve para el auto y el escritorio. Trae tres boquillas. Veinticuatro mil novecientos noventa. Toca Comprar.
```

## Texto del anuncio en Meta
```
¿Has mirado entre los cojines de tu sillón? 😳

Ahí se junta todo: migas, pelusas, pelos y tierrita que la aspiradora grande no alcanza.

La AeroBoost 3 en 1 llega al fondo de las costuras en segundos:
✅ Inalámbrica, carga USB-C
✅ 3 boquillas (sillón, auto y escritorio)
✅ Filtro lavable

👉 $24.990. Toca "Comprar".
```
Título: `Lo que esconde tu sillón` · CTA: Comprar

**Ojo:**
- La aspiradora del video tiene **detalles naranjos**, y la AeroBoost es **toda negra**. El cierre con nuestras fotos ayuda, pero si un cliente espera el modelo naranjo puede reclamar. Lo ideal es regrabar estas mismas tomas con tu producto.
- El video es de otra creadora (TikTok @melissabojorquez25, por el nombre del archivo). Para pautarlo necesitas su permiso.

---

# Anuncio "Riel": dato curioso

Video: `public/riel.mp4` (33 s), editado a 17 s. Composiciones: `RielReel` (9:16) y `RielFeed` (4:5). Guion en `src/ugc/script.ts` (`SCRIPT_RIEL`).

**Ángulo:** dato curioso con humor. Un estudio de 2009 (Layton y Beamer, *Environmental Science & Technology*) encontró que cerca del 60 % del polvo de una casa viene de afuera. El riel de la ventana es justo por donde entra.

**Edición:**
- Se sacó el meme del final (desde el segundo 30,4).
- Las partes lentas van más rápidas (1,3× y 1,5×).
- Se agregó un **antes y después** con dos cuadros del mismo video (4,0 s y 24,6 s).
- Cierra con nuestra foto del producto y el precio.

| Tiempo | Imagen | Voz en off |
|---|---|---|
| 0–3,8 s | Riel lleno de tierra | Dato curioso: más de la mitad del polvo de tu casa viene de afuera. |
| 4–5,6 s | Empieza a aspirar | ¿Y por dónde entra? Por acá. |
| 5,8–8,2 s | Aspirando | Mi riel tenía más tierra que mis plantas. |
| 8,4–9,7 s | Depósito lleno | Mira el depósito. |
| 9,9–11,9 s | Riel limpio | Y eso que era un solo riel. |
| 12,1–14,3 s | Antes / Después | Antes… y después. |
| 14,5–17 s | Producto + precio | Veinticuatro mil novecientos noventa. Toca Comprar. |

Texto para pegar en ElevenLabs (Victoria o Catalina):
```
Dato curioso: más de la mitad del polvo de tu casa viene de afuera. ¿Y por dónde entra? Por acá. Mi riel tenía más tierra que mis plantas. Mira el depósito. Y eso que era un solo riel. Antes… y después. Veinticuatro mil novecientos noventa. Toca Comprar.
```

## Texto del anuncio en Meta
```
Dato curioso 🤓: más de la mitad del polvo de tu casa entra desde afuera… y se queda en los rieles de las ventanas.

La AeroBoost 3 en 1 lo saca en segundos con su boquilla fina:
✅ Inalámbrica, carga USB-C
✅ 3 boquillas
✅ Filtro lavable

👉 $24.990. Toca "Comprar".
```
Título: `¿Hace cuánto no limpias tus rieles?` · CTA: Comprar

**Ojo:**
- La aspiradora del video es **gris plateada** y la AeroBoost es negra.
- El video es de otro creador (TikTok @carrielifepro, por el nombre del archivo). Para pautarlo necesitas su permiso.
