---
compositionId: aeroboost-beat
duration_s: 16.0
canvas: {"w": 1080, "h": 1920, "fps": 30}
message: "La AeroBoost 3 en 1 limpia auto, sillón y escritorio sin cables, por $24.990"
audience: "Compradores chilenos en Instagram/Facebook Reels"
mode: autonomous
style:
  font: "Barlow / IBM Plex Mono"
  palette: ["#111111", "#E85D26", "#F0ECE5", "#888880", "#282826"]
assets: "assets/public/ has 9 product photos from Shopify"
build_notes: ["one paused timeline per frame", "no remote assets", "Reels safe zone: key copy between y=260 and y=1480"]
avoid: ["generic slideshow", "tiny unreadable hero text", "copy under the Reels UI"]
---

## Frame 1 — f1

- src: compositions/frames/01-f1.html
- duration: 4.0s
- span_sec: [0.0, 4.0]
- pacing: beat_cut
- mood: [tense, hype]
- feel: sparse intro over a steady hi-hat fill and snare roll rising into the SURGE at 4s

### Groups

- **g1** — asset
  - span_sec: [0.0, 4.0]
  - asset: { treatment: beat_cut, clips: [assets/public/asp-persona-auto.jpg, assets/public/asp-sillon.jpg], anchors: [0.0, 1.79], overlay_copy: ["¿migas en el auto?", "¿pelos en el sillón?"] }

## Frame 2 — f2

- src: compositions/frames/02-f2.html
- duration: 8.0s
- span_sec: [4.0, 12.0]
- pacing: beat_cut
- mood: [hype, aggressive]
- feel: full-energy drop at 4s, dense four-on-the-floor groove with offbeat stabs until the drop-out at 12s

### Groups

- **g1** — free_design
  - span_sec: [4.0, 7.78]
  - free_design: { dominant_system: "hero product slam on the fire-orange register, spec words swapping on beats", primitives: ["crash-zoom-in", "braam-punch", "content-swap"], density_topology: "accumulate" }
  - anchors: [4.0, 4.78, 5.78, 6.78]
  - copy: ["aeroboost 3 en 1", "120W", "sin cables", "liviana"]
  - notes: "hero image assets/public/asp-estudio.jpg slams in on 4.0; spec words swap on the later anchors"
- **g2** — asset
  - span_sec: [7.78, 12.0]
  - asset: { treatment: beat_cut, clips: [assets/public/asp-auto.jpg, assets/public/asp-escritorio.jpg, assets/public/asp-guantera.jpg, assets/public/asp-filtro.jpg], anchors: [7.78, 8.78, 9.78, 10.77], overlay_copy: ["auto", "escritorio", "guantera", "filtro lavable"] }

## Frame 3 — f3

- src: compositions/frames/03-f3.html
- duration: 2.0s
- span_sec: [12.0, 14.0]
- pacing: beat_cut
- mood: [tense]
- feel: kick drops out, accelerating snare/hi-hat roll, hard silence from 13.5 into the final hit

### Groups

- **g1** — free_design
  - span_sec: [12.0, 14.0]
  - free_design: { dominant_system: "word flipbook on the roll resolving to one held line, then freeze in the silence", primitives: ["content-swap", "freeze-hold"], density_topology: "accelerate-then-hold" }
  - anchors: [12.0, 12.28, 12.75, 12.86, 13.42]
  - copy: ["auto", "sillón", "teclado", "mascotas", "todo en uno"]

## Frame 4 — f4

- src: compositions/frames/04-f4.html
- duration: 2.0s
- span_sec: [14.0, 16.0]
- pacing: beat_cut
- mood: [hype]
- feel: final SURGE hit at 14s, half bar of groove, chord stinger at 15s, track ends at 16s

### Groups

- **g1** — free_design
  - span_sec: [14.0, 16.0]
  - free_design: { dominant_system: "price slam + CTA lockup held to the end", primitives: ["braam-punch", "overlay-pop", "negative-space-hold"], density_topology: "hit-then-hold" }
  - anchors: [14.0, 14.03, 15.0, 15.21]
  - copy: ["$24.990", "aeroboost 3 en 1", "pídela hoy →"]
