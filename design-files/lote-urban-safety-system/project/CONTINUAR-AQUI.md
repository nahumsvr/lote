# Lote — Nota de continuidad (handoff)

Pega este archivo (y los demás del proyecto) en el chat nuevo para retomar sin perder contexto.

## Qué es
**Lote** — app de seguridad urbana en tiempo real para CDMX durante el Mundial 2026.
Voz de marca: cálida, directa y local — *como el carnal que te dice las cosas al chile, sin sugarcoating*. No corporativa, no alarmista. El nombre viene de **ajolote**.

## Archivos del proyecto
| Archivo | Qué es |
|---|---|
| `Lote Design System.dc.html` | **Sistema de diseño completo** (página scrollable): paleta, semáforo, superficies, tipografía, forma, componentes, las 3 pantallas dark+light, voz y tono. |
| `LoteScreen.dc.html` | Componente reutilizable del teléfono (Map / Chat / Zonas) tematizado por `mode` (dark/light) y `screen`. Lo importa el DS. |
| `Lote Map.dc.html` | **Pantalla Mapa** empujada más allá del mockup: colonias como blobs orgánicos, barrido radar, pin "TÚ", marcador de incidente, tira de alerta en voz chilanga, 390px dark. |
| `Lote-Sistema-de-Diseno.md` | El sistema de diseño en Markdown (tokens, tablas, CSS). |
| `support.js` | Runtime de los Design Components (NO editar, requerido). |
| `uploads/` | Briefs originales (color + marketing) y los 3 mockups PNG. |

> `Lote Design System-print.dc.html` es un export auto-generado; ignóralo.

## Tokens (copiar al CSS)
```css
--color-primary:   #D93030;  /* Rojo Lote — único acento primario */
--color-secondary: #E8563A;  /* Coral Azteca */
--color-accent:    #C8A84B;  /* Oro Mundial — datos/mono */
--color-bg-dark:   #13172A;  /* Tinta Profunda */
--color-surface-dark: #1E2438;
--color-bg-light:  #F4F2EE;  /* Niebla */
--color-safe:   #2ECC71;  /* Tranquilo */
--color-warn:   #F0B429;  /* Monitorear */
--color-danger: #D93030;  /* Evitar */
--font-display: 'Geist', sans-serif;          /* + body */
--font-mono:    'JetBrains Mono', monospace;  /* coordenadas, timestamps, fuentes */
/* Forma: chips 6px · inputs 12px · cards 16px · burbujas 20px */
```
Ajustes de acento por modo: oro `#D6B85E` (dark)/`#9C7016` (light); rojo de texto `#EE8B86` (dark)/`#C42828` (light); verde de texto `#5BD996` (dark)/`#1E9E54` (light).

Fuentes:
```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```
> Nota: el brief de color decía *Inter*; el cliente confirmó **Geist + JetBrains Mono**. Geist gana.

## Reglas de construcción (Design Components)
- Cada diseño es un solo `Nombre.dc.html` que se edita con las herramientas `dc_write` / `dc_html_str_replace` / `dc_js_str_replace` (NO `write_file`).
- Solo estilos inline; nada de clases/stylesheets (salvo `@font-face`/`@keyframes` en `<helmet>`).
- Siempre poner `, sans-serif` después de `'Geist'` (evita flash serif).
- Sin emojis: solo SVG icons de línea (stroke ~1.7–1.8).

## ⏭ TAREA PENDIENTE — Pantalla de Recomendaciones (Zonas)
Diseñar la pantalla de **Recomendaciones**. Dark mode, 390px, sin emojis (solo SVG).
- Lista de zonas cercanas **ordenadas por nivel de riesgo**, cada una con: nombre, alcaldía, chip de estado (TRANQUILO/MONITOREAR/EVITAR), descripción, nº de fuentes y timestamp.
- Abajo, **contactos de emergencia siempre visibles**: 911, LOCATEL (55 5658-1111), Policía Turística (55 5250-8222).
- Objetivo: que se sienta como un **briefing de alguien que de verdad se preocupa por tu seguridad** — no un dashboard ni un feed de noticias. Libertad creativa en layout/tratamiento si comunica mejor esa idea.
- Base: reutilizar tokens + la tarjeta de zona de `LoteScreen.dc.html` (screen `zonas`) y el lenguaje del `Lote Map.dc.html`, pero se puede empujar más (p. ej. encabezado tipo saludo/briefing, agrupar por nivel, jerarquía emocional).

## Estado
DS, LoteScreen y Map: ✅ hechos y verificados. Recomendaciones: ⏳ pendiente.
