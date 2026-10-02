# Campaña Meta Ads: AeroBoost 3 en 1, paso a paso

**Estructura:** 1 campaña → 1 conjunto de anuncios → 5 anuncios.

Hazla en el computador en **business.facebook.com → Administrador de anuncios → + Crear**. En el celular faltan opciones.

## 0. Antes de empezar (obligatorio)

- [x] **Stock en Shopify:** 283 unidades cargadas en la bodega de Av. Las Condes 9765.
- [ ] **Píxel conectado:** en Shopify, en la app *Facebook & Instagram*, revisa que el píxel y la API de conversiones estén activos. En el Administrador de eventos de Meta tiene que aparecer el evento **Purchase** (Compra).
- [x] **Envío:** ya configurado en Shopify: gratis en RM y Valparaíso, $4.000 al resto de Chile. Los textos de los anuncios lo dicen.
- [x] **Ficha de producto:** revisada. Abre https://aeroboost.cl/products/aeroboost-aspiradora-inalambrica-3-en-1 y confirma que carga, que se ve el precio $24.990 y que se puede agregar al carrito.
- [ ] **Videos descargados:** los 10 archivos (5 anuncios × 2 formatos) están en `out/`:

| Anuncio | 9:16 (Reels, Stories) | 4:5 (Feed) |
|---|---|---|
| 01 Auto | `puerta-reel-9x16.mp4` | `puerta-feed-4x5.mp4` |
| 02 Hogar | `hogar-reel-9x16.mp4` | `hogar-feed-4x5.mp4` |
| 03 Sillón | `sillon-reel-9x16.mp4` | `sillon-feed-4x5.mp4` |
| 04 Riel | `riel-reel-9x16.mp4` | `riel-feed-4x5.mp4` |
| 05 Unboxing | `unboxing-reel-9x16.mp4` | `unboxing-feed-4x5.mp4` |

## 1. Campaña

| Campo | Qué poner |
|---|---|
| Objetivo | **Ventas** |
| Configuración | **Campaña de ventas manual** (no Advantage+ de ventas). Así controlas el conjunto y los 5 anuncios |
| Nombre | `AeroBoost · Ventas · Prueba 5 creativos · Oct 2026` |
| Categorías especiales | Ninguna |
| Prueba A/B | Desactivada |
| Presupuesto de la campaña Advantage+ | **Activado**, presupuesto **diario** de $20.000 CLP (ver nota) |
| Estrategia de puja | Volumen más alto (sin límite de costo) |

> **Presupuesto:** $20.000 diarios es un punto de partida razonable para probar 5 anuncios en Chile. La regla es invertir al menos 2–3 veces lo que estás dispuesto a pagar por una venta. Si tu margen por unidad es menor a $7.000, baja a $15.000.

## 2. Conjunto de anuncios

| Campo | Qué poner |
|---|---|
| Nombre | `Chile · Advantage+ · Compra` |
| Ubicación de la conversión | **Sitio web** |
| Píxel / conjunto de datos | El de tu tienda Shopify |
| Evento de conversión | **Compra** |
| Objetivo de rendimiento | Maximizar el número de conversiones |
| Calendario | Que empiece mañana a las 00:00, sin fecha de término |
| Público | **Público Advantage+**. Controles: **Chile**, edad mínima 18. No agregues intereses |
| Idiomas | Vacío |
| Ubicaciones | **Ubicaciones Advantage+** (todas) |
| Atribución | Clic de 7 días + visualización de 1 día (la que viene por defecto) |

## 3. Los 5 anuncios

**Configuración común a los 5:**
- **Identidad:** tu página de Facebook y tu cuenta de Instagram.
- **Formato:** imagen o video individual. Sube **los dos videos** (9:16 y 4:5) en "Personalizar contenido por ubicación": el **4:5 para Feeds** y el **9:16 para Stories y Reels**.
- **Mejoras de Advantage+ Creative:** **desactiva** "Agregar música", "Superposiciones de texto" y "Subtítulos automáticos". Los videos ya traen voz y subtítulos, y Meta les pondría otros encima. Las demás mejoras (brillo, recorte) pueden quedar activadas.
- **Llamada a la acción:** **Comprar**.
- **URL del sitio web:** `https://aeroboost.cl/products/aeroboost-aspiradora-inalambrica-3-en-1`
- **Parámetros de URL** (para verlo en Shopify y Google Analytics):
  `utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`

### Anuncio 01 · Auto
Nombre: `01 Auto · puerta · Catalina`
Texto principal:
```
¿Hace cuánto que no limpias la puerta de tu auto? 👀

Migas, tierra y polvo en las ranuras donde el paño no llega. La AeroBoost 3 en 1 lo saca en segundos:

✅ Inalámbrica, se carga con USB-C
✅ 3 boquillas para ranuras, asientos y alfombras
✅ Filtro lavable
✅ Cabe en la guantera

🚚 Envío gratis en RM y V Región
👉 $24.990. Toca "Comprar".
```
Título: `Tu auto limpio en minutos`
Descripción: `Aspiradora inalámbrica 3 en 1`

### Anuncio 02 · Hogar
Nombre: `02 Hogar · aspiradora grande · Victoria`
Texto principal:
```
¿Sacas la aspiradora grande cada vez que cae algo al piso? 🙃

La AeroBoost 3 en 1 la tienes a mano: la tierrita de las orillas, lo que se mete en las puertas, el rincón del perro y hasta el auto.

✅ Inalámbrica, se carga con USB-C
✅ 3 boquillas incluidas
✅ Se vacía directo al basurero
✅ Filtro lavable

🚚 Envío gratis en RM y V Región
👉 $24.990. Toca "Comprar".
```
Título: `La aspiradora que sí vas a usar`
Descripción: `Inalámbrica, 3 en 1, carga USB-C`

### Anuncio 03 · Sillón
Nombre: `03 Sillón · lo que esconde · Victoria`
Texto principal:
```
¿Has mirado entre los cojines de tu sillón? 😳

Ahí se junta todo: migas, pelusas, pelos y tierrita que la aspiradora grande no alcanza.

La AeroBoost 3 en 1 llega al fondo de las costuras en segundos:
✅ Inalámbrica, carga USB-C
✅ 3 boquillas (sillón, auto y escritorio)
✅ Filtro lavable

🚚 Envío gratis en RM y V Región
👉 $24.990. Toca "Comprar".
```
Título: `Lo que esconde tu sillón`
Descripción: `Aspiradora inalámbrica 3 en 1`

### Anuncio 04 · Riel
Nombre: `04 Riel · dato curioso · Cristian`
Texto principal:
```
Dato curioso 🤓: más de la mitad del polvo de tu casa entra desde afuera… y se queda en los rieles de las ventanas.

La AeroBoost 3 en 1 lo saca en segundos con su boquilla fina:
✅ Inalámbrica, carga USB-C
✅ 3 boquillas
✅ Filtro lavable

🚚 Envío gratis en RM y V Región
👉 $24.990. Toca "Comprar".
```
Título: `¿Hace cuánto no limpias tus rieles?`
Descripción: `Aspiradora inalámbrica 3 en 1`

### Anuncio 05 · Unboxing
Nombre: `05 Unboxing · qué trae · Catalina`
Texto principal:
```
¿Tu auto también está así? 😅

Esto es lo que trae la AeroBoost 3 en 1 👇
✅ Aspiradora inalámbrica
✅ 3 boquillas: ranuras, asientos y alfombras
✅ Filtro lavable y cable USB-C

Asientos, portavasos, ranuras… y la alfombra queda como nueva.

🚚 Envío gratis en RM y V Región
👉 $24.990. Toca "Comprar".
```
Título: `Mira lo que trae la caja`
Descripción: `Aspiradora inalámbrica 3 en 1`

## 4. Antes de publicar

- [ ] Revisa la **vista previa** de cada anuncio en Reels, Stories y Feed. El texto no puede quedar tapado y el formato tiene que ser el correcto en cada ubicación.
- [ ] Confirma que los 5 anuncios usan **la misma URL** con los parámetros UTM.
- [ ] Publica. Meta revisa los anuncios en unas horas, a veces hasta 24.

## 5. Qué hacer después de publicar

| Momento | Qué hacer |
|---|---|
| Días 1–3 | **No tocar nada.** Cualquier cambio reinicia la fase de aprendizaje |
| Día 4 | Revisa por anuncio: hook rate (reproducciones de 3 s / impresiones) **> 25 %**, CTR (enlace) **> 1 %**. Apaga los que tengan más de 1.000 impresiones y CTR < 0,7 % |
| Día 7 | Mira el **costo por compra** de cada anuncio. Apaga el que gaste más de 2 veces tu margen sin vender |
| Día 8+ | Con 1–2 ganadores, sube el presupuesto un 20 % cada 2–3 días. Haz variantes del ganador cambiando solo los primeros 3 segundos |

Columnas útiles en el Administrador: *Rendimiento y clics*, más *Reproducciones de video de 3 s*, *Compras*, *Costo por compra* y *ROAS*.

## 6. Riesgos

- **Derechos:** los 5 videos son de otros creadores o marcas. Si alguno reclama, Meta puede bajar el anuncio. El más delicado es el **05 Unboxing** (anuncio de la tienda 3endi). Para escalar un ganador, lo ideal es regrabarlo con tu producto.
- **Producto distinto en pantalla:** en el Sillón (detalles naranjos) y el Riel (gris plateado) la aspiradora no es idéntica a la tuya. Todos cierran con tu producto real, pero si recibes reclamos de "no es lo que vi", apaga esos dos primero.
