
# Lote — Sistema de Diseño

**Versión 1.0** · Ciudad de México · Mundial 2026

> *Tu carnal en la ciudad. El que sabe lo que está pasando.*

App de seguridad urbana en tiempo real para la Ciudad de México durante el Mundial 2026. El sistema visual es **cálido pero tecnológico, mexicano pero universal, honesto pero no aterrador**.

---

## 00 · Filosofía de color

Cada color tiene una razón de existir. La paleta no es decorativa.

- **El rojo** no es el rojo de peligro corporativo — es el del barro, del chile, del corazón mexicano.
- **El fondo** no es negro vacío: es la noche de CDMX, con el tono azulado del cielo antes del amanecer.
- **El oro** no es lujo — es el único guiño al Mundial que cabe sin gritar.

---

## 01 · Paleta principal

Los 5 colores base.

| Color | Nombre | Hex | Rol | Uso | Token |
|---|---|---|---|---|---|
| 🟥 | **Rojo Lote** | `#D93030` | Primario · Identidad | CTAs, logo, alertas, borders de énfasis | `--color-primary` |
| 🟧 | **Coral Azteca** | `#E8563A` | Secundario · Calidez | Gradientes, hovers, acentos. Barro prehispánico | `--color-secondary` |
| 🟨 | **Oro Mundial** | `#C8A84B` | Acento · Datos | Labels, timestamps, mono, precisión | `--color-accent` |
| ⬛ | **Tinta Profunda** | `#13172A` | Fondo dark | Background oscuro. Negro azulado, vivo | `--color-bg-dark` |
| ⬜ | **Niebla** | `#F4F2EE` | Fondo light | Background claro. Blanco cálido, humano | `--color-bg-light` |

---

## 02 · El semáforo de Lote

Los tres estados de zona son el corazón funcional del producto. Calibrados para comunicar urgencia **sin generar pánico**.

| Estado | Hex | Significado | En la UI | Token |
|---|---|---|---|---|
| 🟢 **Tranquilo** | `#2ECC71` | Sin incidencias reportadas. Te puedes mover con confianza. | Polígono verde suave en el mapa. Sin notificación. | `--color-safe` |
| 🟡 **Monitorear** | `#F0B429` | Actividad detectada. No urgente, pero revísalo antes de salir. | Polígono amarillo pulsante. Notificación pasiva. | `--color-warn` |
| 🔴 **Evitar** | `#D93030` | Riesgo activo confirmado por varias fuentes. Lote te redirige. | Polígono rojo sólido. Alerta activa + ruta alternativa. | `--color-danger` |

---

## 03 · Superficies — Dark y Light

Lote es switcheable entre modo oscuro y claro. La paleta funciona en ambos sin perder identidad.

### Dark mode
| Rol | Hex |
|---|---|
| Background | `#13172A` Tinta Profunda |
| Superficie (cards) | `#1E2438` Tinta Media |
| Texto principal | `#F4F2EE` Niebla |
| Texto secundario | `rgba(244,242,238,0.55)` |

### Light mode
| Rol | Hex |
|---|---|
| Background | `#F4F2EE` Niebla |
| Superficie (cards) | `#FFFFFF` Blanco puro |
| Texto principal | `#13172A` Tinta Profunda |
| Texto secundario | `rgba(19,23,42,0.55)` |

> **Nota de acento por modo:** el oro y el rojo se ajustan para mantener contraste.
> Oro → `#D6B85E` (dark) / `#9C7016` (light). Rojo de texto → `#EE8B86` (dark) / `#C42828` (light).

---

## 04 · Tipografía

Dos familias, tres roles. Ambas en Google Fonts — sin licencias, sin dependencias.

| Familia | Peso | Rol | Uso |
|---|---|---|---|
| **Geist** | 800 / 900 | Display | Logo, títulos, números grandes. La personalidad de Lote. |
| **Geist** | 400 / 500 / 700 | Body | Cuerpo de texto, chat, descripciones, UI general. |
| **JetBrains Mono** | 400 / 500 | Mono | Coordenadas, timestamps, fuentes, status, labels de zona. |

### Escala tipográfica
| Nivel | Spec | Ejemplo |
|---|---|---|
| Display | Geist 800 · `-0.02em` | CDMX ahora |
| Heading | Geist 700 · `-0.01em` | Zonas para ti |
| Body | Geist 400 · `line-height 1.5` | Lote responde con datos reales del mapa. |
| Mono | JetBrains Mono 500 | `19.4326° N · 21:51 · 6 fuentes` |

```
font-family: 'Geist', sans-serif;          /* display + body */
font-family: 'JetBrains Mono', monospace;  /* datos técnicos */
```

> El mono siempre va en **oro** o **gris** — nunca en rojo.

---

## 05 · Sistema de forma — Todo suave

Esquinas redondeadas, escala progresiva. Todo el sistema es suave.

| Radio | Componente | Uso |
|---|---|---|
| `6px` | **Chips** | Data chips, labels de zona, filtros |
| `12px` | **Inputs** | Campos, botones, controles, zoom |
| `16px` | **Cards** | Tarjetas de zona, banners, paneles |
| `20px` | **Burbujas** | Mensajes de chat (cola a `6px`) |

---

## 06 · Componentes

### Chips de estado de zona
Badge de estado (`8px`) y data chip mono (`6px`). Mismos colores, ambos modos.

- **Badges:** `TRANQUILO` (verde) · `MONITOREAR` (amarillo) · `EVITAR` (rojo)
- **Data chips:** `ZÓCALO: EVITAR` · `EJE CENTRAL: LIBRE` — fondo tintado al ~13%, border al ~40%, texto mono.

### Indicadores de estado
El punto del semáforo con halo suave (`box-shadow: 0 0 0 4px <color al 18%>`). Acompaña cada nombre de zona. El estado **Monitorear** y el indicador **LIVE** pulsan.

### Burbujas de chat
- **Usuario:** fondo `#D93030`, texto blanco, radio `20px 20px 6px 20px` (cola inferior derecha).
- **Lote:** superficie del modo, border sutil, radio `20px 20px 20px 6px` (cola inferior izquierda).
- **Referencias de zona** en color dentro del texto (rojo = evitar, verde = tranquilo) y **data chips** embebidos.

### Tarjetas de zona
Card `16px` con: punto de estado + halo, nombre (Geist 700), meta en mono (`alcaldía · distancia`), badge de estado, descripción con lugares en **negrita**, y pie en mono (`◎ fuentes · ◷ hace X min`).

### Banner de alerta
Card `16px` tintada en rojo al 8%, ícono de advertencia, título en rojo, descripción, pie en mono con `hace X min · N fuentes`.

### Navegación inferior
Cuatro tabs: **Mapa · Chat · Zonas · Config**. Tab activo en rojo `#D93030`; inactivos en texto secundario. Íconos de línea (1.7px stroke).

---

## 07 · Las tres pantallas

| Pantalla | Propósito | Elementos clave |
|---|---|---|
| **Mapa** — *CDMX ahora* | Zonas en vivo | Polígonos del semáforo, coordenadas, pill `LIVE`, fila de stats (Seguras / Monitorear / Evitar / Reportes), banner de alerta |
| **El Chat** | Voz directa, cálida, sin rodeos | Avatar ajolote, burbujas con referencias de zona en color, data chips, `N fuentes` |
| **Zonas para ti** | Recomendaciones con fuentes | Tarjetas de zona ordenadas, badges de estado, card de Emergencias (911 / LOCATEL) |

---

## 08 · Voz y tono

Lote habla como **el carnal que te dice las cosas al chile**. Directo, sin rodeos, pero con cariño. No habla como el C5. No habla como una app corporativa. No te hace sentir falsamente seguro.

### Principios
1. **Verdad con empatía** — Dice lo que necesitas escuchar, no lo que quieres. Pero primero te escucha.
2. **Ojos abiertos, no miedo** — Muestra la realidad para que no te confíes, no para asustarte.
3. **Precisión sobre velocidad** — Una alerta equivocada es peor que ninguna. Valida con repetición de fuentes.
4. **Alma local, uso universal** — Habla como quien conoce la ciudad de adentro. Con calidez, sin corporativismo.

### Ejemplos

| ❌ Así no | ✅ Así sí |
|---|---|
| Alerta: zona de riesgo detectada en coordenadas 19.4°N. | Oye, esa ruta tiene varios reportes de asalto ahorita. Te mando por Insurgentes, llegas igual. |
| Se han registrado incidentes en la zona centro. | Hay algo moviéndose en el centro. No es para alarmarse, pero mejor que lo sepas antes de salir. |
| Zona de riesgo. Evite el área inmediatamente. | Mejor no te metas al Centro ahorita — hay marcha y el acceso está lento. Coyoacán está tranquilo si quieres salir. |

**Idiomas:** español e inglés, seleccionable por el usuario.

---

## 09 · Lo que NO entra

Tan importante como lo que sí usamos.

- ❌ **Azul corporativo** (`#0066FF` y similares) — se siente como app bancaria.
- ❌ **Verde de salud** (`#00C853`, esmeralda saturado) — confunde con apps médicas.
- ❌ **Morado tech** (`#7C3AED` y similares) — genérico, sin identidad.
- ❌ **Negro puro** (`#000000`) — frío, vacío. Tinta Profunda lo reemplaza.
- ❌ **Blanco puro** (`#FFFFFF`) como fondo — clínico. Niebla lo reemplaza.

---

## 10 · Design tokens (CSS)

```css
:root {
  /* Identidad */
  --color-primary:      #D93030; /* CTAs, logo, identidad, alertas rojas */
  --color-secondary:    #E8563A; /* gradientes, hovers, acentos */
  --color-accent:       #C8A84B; /* labels de datos, mono, timestamps */

  /* Superficies */
  --color-bg-dark:      #13172A; /* fondo principal dark mode */
  --color-surface-dark: #1E2438; /* cards, panels, sidebar dark */
  --color-bg-light:     #F4F2EE; /* fondo principal light mode */
  --color-surface-light:#FFFFFF; /* cards light mode */
  --color-text-dark:    #F4F2EE; /* texto sobre fondo oscuro */
  --color-text-light:   #13172A; /* texto sobre fondo claro */

  /* Semáforo */
  --color-safe:         #2ECC71; /* zona verde — sin incidencias */
  --color-warn:         #F0B429; /* zona amarilla — monitorear */
  --color-danger:       #D93030; /* zona roja — evitar */

  /* Tipografía */
  --font-display: 'Geist', sans-serif;          /* títulos, logo, números */
  --font-body:    'Geist', sans-serif;          /* cuerpo, chat, UI */
  --font-mono:    'JetBrains Mono', monospace;  /* coordenadas, datos */

  /* Forma */
  --radius-chip:   6px;
  --radius-input: 12px;
  --radius-card:  16px;
  --radius-bubble:20px;
}
```

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

---

*Lote recomienda con base en fuentes públicas. Nunca garantiza.*
*CDMX · Mundial 2026 · La ciudad no para. Lote tampoco.*
