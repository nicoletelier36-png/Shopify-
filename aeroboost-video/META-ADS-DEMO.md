# AeroBoost 3 en 1: anuncio "Demo satisfactoria" para Meta Ads

Basado en el anuncio de la competencia de la Biblioteca de anuncios de Meta, ID `1025897413241142` (página **Tristeyst**, activo desde el 30 jun 2026).

## 1. Análisis del anuncio de referencia

| | |
|---|---|
| Formato | Video 9:16, 20 s, CTA **Comprar** (Shop Now) |
| Ubicaciones | Facebook, Instagram, Messenger, Threads y Audience Network (Advantage+ placements) |
| Producto | Aspiradora de mano inalámbrica 4 en 1 (aspira, sopla, infla, líquidos) |
| Destino | Ficha de producto en Shopify |

**Estructura del video (escena por escena):**

| Tiempo | Escena | Función |
|---|---|---|
| 0–2 s | Alfombra del auto llena de migas que desaparecen al pasar la boquilla | Gancho visual "satisfactorio" sin texto: el antes/después se ve en el primer segundo |
| 2–4 s | Boquilla en la ranura del tablero | Rincones difíciles |
| 4–7 s | Asiento de cuero con polvo que se va | Más demostración |
| 7–8 s | Vacía el depósito en el lavaplatos | Mantenimiento fácil |
| 8–11 s | Lava el filtro bajo la llave | Objeción "¿y el filtro?" |
| 11–20 s | Señora mayor limpiando zapatos en casa, sorprendida y luego riendo, hablándole a cámara | Prueba social / testimonio en estilo UGC, uso fuera del auto |

Durante todo el video hay una etiqueta fija arriba: *"Handheld Cordless Car Vacuum Cleaner"*. No tiene precio ni oferta en el video; la oferta va en el texto.

**Copy:** gancho con oferta ("Hot Sale! 50% Off"), luego PAS (migas, pelos de mascota y polvo que con un paño no salen), 5 viñetas ✅ con beneficios y especificaciones, y cierre con urgencia más el link.

**Por qué funciona:**
1. El primer segundo es pura demostración: el problema y la solución se ven sin necesidad de leer ni escuchar.
2. Cortes secos cada 2–3 s, así que no hay tiempo para aburrirse.
3. Se ve nativo, como un video de TikTok o Reels, no como publicidad.
4. Responde objeciones con imágenes (el filtro se lava, el depósito se vacía).
5. El testimonio final le pone humanidad y amplía el uso más allá del auto.

*No pude transcribir el audio porque Hugging Face está bloqueado en este entorno. El análisis se basa en lo visual y en el copy.*

## 2. Nuestra versión: `DemoReel` / `DemoFeed`

Código: `src/AeroBoostDemo.tsx` (escenas en `src/demo/`). 20 s, 30 fps.

| Tiempo | Escena | Texto en pantalla |
|---|---|---|
| 0–2,7 s | Asiento del auto: las migas son succionadas hacia la boquilla | Mira cómo desaparecen las migas 😳 |
| 2,7–4,9 s | Teclado: las migas desaparecen | Teclado limpio en segundos |
| 4,9–7,4 s | Sillón: los pelos de mascota son succionados | Pelos de mascota 🐱 fuera |
| 7,4–9,4 s | Persona limpiando el piso del auto | Hasta el piso del auto 🚗 |
| 9,4–11,6 s | Filtro bajo la llave | El filtro se lava con agua 💧 |
| 11,6–13,6 s | Boquillas | 3 boquillas para cada rincón |
| 13,6–15,4 s | Cargando | Sin cables: carga USB-C 🔌 |
| 15,4–17,2 s | Guantera | Y cabe en la guantera 📦 |
| 17,2–20 s | Cierre | $24.990 · Toca "Comprar" 👇 |

Etiqueta fija arriba: **"Aspiradora inalámbrica 3 en 1"**, igual que en la referencia.

Renderizar:

```bash
npx remotion render DemoReel out/demo-reel-9x16.mp4   # Reels / Stories
npx remotion render DemoFeed out/demo-feed-4x5.mp4    # Feed
```

**Pendiente para igualar la referencia:**
- **Audio:** el video no trae música. Al subirlo, agrega un audio en tendencia desde la biblioteca de Meta o Instagram, o un sonido de aspiradora y un "whoosh" en cada corte.
- **Testimonio (11–20 s en la referencia):** grábalo con un cliente real o un creador UGC (celular, luz natural, "no puedo creer cuánto saca"). No uses testimonios inventados ni personas generadas presentadas como clientes reales: es engañoso y Meta lo rechaza. Cuando lo tengas, se puede insertar como escena antes del cierre.

## 3. Copy para Meta Ads

> Usa solo especificaciones y ofertas reales. Si haces un descuento, pon el porcentaje y el precio real "antes/ahora".

**Variante A: demo/PAS (la más cercana a la referencia)**

Texto principal:
```
🚗 ¿Migas en el asiento, pelos de mascota en el sillón y polvo en el teclado? Con un paño no sale.

La AeroBoost 3 en 1 es una aspiradora de mano inalámbrica que llega a todos los rincones:

✅ 3 boquillas intercambiables para auto, casa y escritorio
✅ 100% inalámbrica, se carga con USB-C
✅ Filtro lavable: se enjuaga con agua y listo
✅ Compacta: cabe en la guantera

👉 Pídela hoy por $24.990
```
Título: `Limpia tu auto en 2 minutos`
Descripción: `Aspiradora inalámbrica 3 en 1`
CTA: **Comprar**

**Variante B: corta, para Reels/Stories**
```
Las migas del auto, fuera en segundos 😳
Aspiradora inalámbrica 3 en 1 · carga USB-C · filtro lavable.
$24.990 👇
```
Título: `AeroBoost 3 en 1 · $24.990`

**Variante C: ángulo mascotas**
```
🐱 Si tienes mascota, sabes que los pelos aparecen en TODOS lados: sillón, auto, cama.
La AeroBoost los saca con la boquilla de cepillo, sin enchufes ni cables.
✅ 3 boquillas ✅ Carga USB-C ✅ Filtro lavable
👉 $24.990, pídela hoy
```
Título: `Adiós pelos de mascota`

## 4. Estructura de campaña sugerida

- **Objetivo:** Ventas (Purchase). Requiere el píxel y la Conversions API de Shopify activos.
- **Campaña de prueba (ABO o CBO), 1 conjunto con Advantage+ Audience** (Chile, 18–65+), Advantage+ placements.
  - Anuncios: `DemoReel` + `DemoFeed` (Meta elige el formato por ubicación) × copies A, B y C = 3 anuncios. Opcional: sumar el reel anterior (`AeroBoostReel`) como cuarto concepto.
- **Presupuesto:** al menos 2–3× el CPA objetivo por día en el conjunto, 7 días sin tocar.
- **Decisión:** apagar los anuncios con más de 1.000 impresiones y CTR < 0,8 %, o gasto > 2× CPA sin compra. Escalar el ganador un 20 % cada 2–3 días.
- **Retargeting** (cuando haya datos): personas que vieron el 50 % del video o visitaron el sitio en los últimos 14 días, excluyendo compradores, con el copy B y el testimonio UGC.
