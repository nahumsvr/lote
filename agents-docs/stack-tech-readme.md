# LOTE
> Agente de movilidad urbana en tiempo real para la Ciudad de México.
> Google Cloud Rapid Agent Hackathon · Junio 2026

---

## El producto

Lote agrega señales públicas dispersas (Telegram, RSS, Reddit) para clasificar zonas de CDMX en tiempo real como **tranquilas**, **de monitoreo** o **de riesgo**, y las presenta en un mapa interactivo. Un chatbot con contexto del mapa responde preguntas concretas de movilidad: dónde ir, qué evitar, cómo llegar.

Construido para el turista del Mundial 2026 que no conoce la ciudad y para la familia que quiere moverse con confianza.

---

## El equipo

| Nombre | Rol |
|---|---|
| Mass | Product, Design & Marketing |
| Nahum | Tech Lead, Frontend |
| Luis | Frontend |
| Maldo | Data Science, Pipeline & Chatbot |

---

## Stack

### Frontend
| Tecnología | Uso |
|---|---|
| [Next.js 14](https://nextjs.org/) | Framework principal (App Router) |
| TypeScript | Lenguaje base |
| Tailwind CSS v4 | Estilos |
| Geist | Tipografía display y body |
| JetBrains Mono | Tipografía de datos técnicos |
| [Leaflet.js](https://leafletjs.com/) | Mapa interactivo con polígonos de CDMX |
| [Vercel](https://vercel.com/) | Deploy |

### Backend
| Tecnología | Uso |
|---|---|
| Google Cloud Functions | Funciones serverless para ingesta y clasificación |
| TypeScript | Lenguaje base |

### Pipeline de datos
| Tecnología | Uso |
|---|---|
| [Google Cloud Pub/Sub](https://cloud.google.com/pubsub) | Ingesta de eventos en tiempo real |
| [Vertex AI](https://cloud.google.com/vertex-ai) | Clasificación de eventos por zona y nivel de riesgo |
| [Elastic](https://www.elastic.co/) | Indexación y búsqueda de eventos clasificados |

### Fuentes de datos
| Fuente | Tipo | Contenido |
|---|---|---|
| Telegram | Canales públicos de noticias CDMX | Alertas, reportes ciudadanos |
| RSS | Reforma, El Universal, Milenio | Noticias verificadas |
| Reddit | r/mexico, r/CDMX | Reportes en tiempo real |

### IA
| Tecnología | Uso |
|---|---|
| Vertex AI / Gemini API | Clasificación de eventos (verde / amarillo / rojo) |
| Gemini API | Chatbot con contexto del mapa en tiempo real |

---

## Arquitectura

```
[Fuentes]          [Ingesta]            [Procesamiento]      [Salida]

Telegram  ─────┐
RSS        ─────┼──▶  Cloud Pub/Sub ──▶  Vertex AI      ──▶  Elastic
Reddit     ─────┘       (eventos)        (clasificación)      (índice)
                                                                  │
                                                         ┌────────┴────────┐
                                                         ▼                 ▼
                                                    Mapa CDMX          Chatbot
                                                  (Next.js +         (Gemini +
                                                   Leaflet)           contexto)
```

### Flujo de un evento

1. Cloud Function monitorea fuentes cada 5 minutos
2. Eventos nuevos se publican en Pub/Sub
3. Cloud Function suscriptora invoca Vertex AI para clasificar zona y nivel de riesgo
4. Evento clasificado se indexa en Elastic con metadata: zona, estado, fuente, timestamp
5. Frontend consulta Elastic para pintar el mapa
6. Chatbot consulta Elastic para responder con contexto real

---

## Estructura del proyecto

```
lote/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Pantalla principal (mapa)
│   ├── chat/
│   │   └── page.tsx            # Pantalla de chat
│   ├── zonas/
│   │   └── page.tsx            # Pantalla de recomendaciones
│   └── api/
│       ├── eventos/
│       │   └── route.ts        # GET eventos activos desde Elastic
│       └── chat/
│           └── route.ts        # POST mensaje al chatbot
├── components/
│   ├── MapaCDMX.tsx            # Mapa con polígonos de zonas
│   ├── AlertaStrip.tsx         # Barra de alerta activa
│   ├── ChatBubble.tsx          # Burbujas del chat
│   ├── ZonaCard.tsx            # Card de zona en recomendaciones
│   ├── NavBar.tsx              # Navegación inferior
│   └── StatusChip.tsx          # Chip verde / amarillo / rojo
├── lib/
│   ├── elastic.ts              # Cliente Elastic
│   ├── gemini.ts               # Cliente Gemini API
│   └── tipos.ts                # Tipos TypeScript compartidos
├── functions/                  # Google Cloud Functions
│   ├── ingesta/
│   │   ├── telegram.ts         # Scraper de canales Telegram
│   │   ├── rss.ts              # Parser de feeds RSS
│   │   └── reddit.ts           # Scraper Reddit API
│   └── clasificacion/
│       └── index.ts            # Clasificador Vertex AI → Elastic
├── public/
│   └── geodata/
│       └── cdmx-alcaldias.geojson   # Polígonos de alcaldías CDMX
├── design/                     # Assets de diseño (no entra a prod)
│   ├── lote_color_brief.docx
│   ├── lote_marketing_brief.docx
│   ├── design-tokens.md
│   └── screens/
├── .env.local                  # Variables de entorno (no commitear)
├── README.md
└── package.json
```

---

## Variables de entorno

```bash
# Google Cloud
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_REGION=us-central1
PUBSUB_TOPIC_ID=lote-eventos

# Vertex AI / Gemini
GEMINI_API_KEY=
VERTEX_AI_ENDPOINT=

# Elastic
ELASTIC_URL=
ELASTIC_API_KEY=
ELASTIC_INDEX=lote-eventos

# Reddit API
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=

# Telegram
TELEGRAM_BOT_TOKEN=
```

---

## Modelo de datos — Evento

```typescript
interface Evento {
  id:        string;
  zona:      string;          // "Centro Histórico", "Roma Norte", etc.
  alcaldia:  string;          // "Cuauhtémoc", "Coyoacán", etc.
  estado:    "tranquilo" | "monitorear" | "evitar";
  titulo:    string;
  descripcion: string;
  fuente:    "telegram" | "rss" | "reddit";
  fuentes_count: number;      // cuántas fuentes confirman
  lat:       number;
  lng:       number;
  timestamp: string;          // ISO 8601
  confianza: number;          // 0-1, calculado por Vertex AI
}
```

---

## Sistema de alertas

| Estado | Color | Hex | Criterio |
|---|---|---|---|
| Tranquilo | Verde | `#2ECC71` | Sin reportes en últimas 2 horas |
| Monitorear | Amarillo | `#F0B429` | 1-2 fuentes reportan actividad |
| Evitar | Rojo | `#D93030` | 3+ fuentes confirman riesgo activo |

> Un solo post en Reddit no clasifica una zona como roja.
> Se requiere repetición de fuentes para subir el estado de alerta.

---

## Design tokens (referencia rápida)

```css
--color-primary:   #D93030   /* Rojo Lote */
--color-bg:        #13172A   /* Tinta Profunda — dark mode */
--color-bg-light:  #F4F2EE   /* Niebla — light mode */
--color-accent:    #C8A84B   /* Oro Mundial */
--color-safe:      #2ECC71
--color-warn:      #F0B429
--color-danger:    #D93030
--font-display:    'Geist', sans-serif
--font-mono:       'JetBrains Mono', monospace
```

Ver `design/design-tokens.md` para el sistema completo.

---

## Scope MVP — Hackathon

### Entra
- Ingesta de Telegram + RSS + Reddit (3 fuentes)
- Clasificación con Vertex AI → verde / amarillo / rojo
- Indexación en Elastic
- Mapa interactivo de CDMX con polígonos por alcaldía
- Chatbot con contexto del mapa en tiempo real
- Dark mode + Light mode
- Deploy en Vercel

### No entra
- Autenticación de usuarios
- App móvil nativa
- Notificaciones push
- Históricos y tendencias
- Cobertura fuera de CDMX
- Más de 3 fuentes

---

## División del trabajo

```
Mass   →  Diseño, pantalla Recomendaciones, pitch, video
Nahum  →  Tech Lead, arquitectura, pantalla Mapa
Luis   →  Pantalla Chat, integración frontend
Maldo  →  Pipeline de datos, clasificación, chatbot
```

---

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build
npm run build

# Deploy a Vercel
vercel --prod
```

---

*LOTE · Google Cloud Rapid Agent Hackathon · Junio 2026*
