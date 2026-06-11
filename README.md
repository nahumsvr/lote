<div align="center">

# 🔴 Lote

### The city does not stops, neither do WE.

**Real-time urban safety agent for Mexico City — FIFA World Cup 2026**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-Hackathon_2026-4285F4?logo=googlecloud)](https://cloud.google.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)

[Live Demo](#) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [Design System](#-design-system)

---

<br/>

> *Lote watches Mexico City block by block and tells you straight up: where to go, what to dodge, and how to get there safe. No corporate fluff. No fear-mongering. Just the buddy who looks out for you.*

<br/>

</div>

## 📋 Table of Contents

- [About](#-about)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Design System](#-design-system)
- [Data Pipeline](#-data-pipeline)
- [Internationalization](#-internationalization)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌎 About

**Lote** is a real-time urban mobility agent built for Mexico City during the **FIFA World Cup 2026**. It aggregates incident data from multiple public sources (Telegram, RSS, Reddit), classifies them using **Gemini AI**, indexes them in **Elasticsearch**, and presents them through a mobile-first interface with an interactive map, an AI chatbot, and zone-by-zone safety recommendations.

Lote doesn't speak like a corporate app or a government feed. It speaks like **el carnal que te dice las cosas al chile** — direct, warm, and backed by data.

> Built for the **Google Cloud Hackathon 2026**.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🗺️ **Live Map** | Interactive Leaflet.js map with real-time zone polygons colored by a traffic-light system (Safe · Monitor · Avoid) |
| 💬 **AI Chatbot** | Conversational agent powered by Gemini that responds with local personality, zone references, and source-backed data |
| 📊 **Zone Recommendations** | Curated zone cards sorted by risk level, with source count, timestamps, and emergency contacts |
| 🌐 **Landing Page** | Immersive marketing page with phone mockups, scroll animations, and radar effects |
| 🔄 **Real-time Pipeline** | Event ingestion via Google Cloud Pub/Sub → classification via Vertex AI → indexing in Elasticsearch |
| 🌍 **i18n** | Full English/Spanish support with client-side language switching |
| 🎨 **Custom Design System** | Purpose-built tokens, typography, and components — no external UI libraries |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          DATA SOURCES                          │
│                  Telegram · RSS · Reddit                       │
└──────────────┬──────────────┬──────────────┬────────────────────┘
               │              │              │
               ▼              ▼              ▼
        ┌──────────────────────────────┐
        │    Google Cloud Pub/Sub      │
        │    topic: lote-eventos       │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │    Cloud Function            │
        │    (Subscriber + Classifier) │
        │    ┌────────────────────┐    │
        │    │   Vertex AI /      │    │
        │    │   Gemini 2.0 Flash │    │
        │    └────────────────────┘    │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │     Elasticsearch            │
        │     index: lote-eventos      │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │     Next.js 16 (App Router)  │
        │  ┌────────┬────────┬───────┐ │
        │  │  Map   │  Chat  │ Zones │ │
        │  └────────┴────────┴───────┘ │
        └──────────────────────────────┘
```

> **Note:** For the hackathon MVP, the data layer uses realistic mock data with production-ready function signatures. The commented-out production code in `lib/` is fully documented and ready to activate with real credentials.

---

## 🧰 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Server-first React with SSR and API routes |
| **UI** | React 19 + Tailwind CSS v4 | Component architecture + utility-first styling |
| **Language** | TypeScript 5 | End-to-end type safety |
| **Map** | Leaflet.js | Interactive, mobile-optimized map rendering |
| **AI** | Gemini 2.0 Flash / Vertex AI | Event classification + chatbot responses |
| **Search** | Elasticsearch | Real-time event indexing and geospatial queries |
| **Messaging** | Google Cloud Pub/Sub | Asynchronous event ingestion pipeline |
| **Icons** | Lucide React | Consistent, lightweight icon system |
| **Fonts** | Geist + JetBrains Mono | UI typography + monospaced data displays |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10 (or pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/nahumsvr/lote.git
cd lote

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app — the home route (`/`) redirects to the interactive **Map** view.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint across the project |

---

## 📁 Project Structure

```
lote/
├── app/
│   ├── (shell)/                 # Route group — app shell with navbar + ambient effects
│   │   ├── layout.tsx           # Shell layout: grain, glows, bottom navigation
│   │   ├── page.tsx             # Redirects to /map
│   │   ├── chat/                # 💬 AI Chatbot screen
│   │   │   ├── page.tsx
│   │   │   └── _components/     # ChatBubble, ChatInput, ZonaChip, MapaInteractivo
│   │   ├── map/                 # 🗺️ Live Map screen
│   │   │   ├── page.tsx
│   │   │   └── _components/     # Map (Leaflet), MapWrapper (dynamic import)
│   │   ├── zonas/               # 📊 Zone Recommendations screen
│   │   │   ├── page.tsx
│   │   │   └── _components/     # BriefingNote, HereCard, ZoneGroup, EmergencyFooter
│   │   └── config/              # ⚙️ Settings screen
│   │       └── page.tsx
│   ├── info/                    # 🌐 Landing / Marketing page (independent layout)
│   │   ├── page.tsx
│   │   └── _components/         # Hero, Showcase, Sources, PhoneMockups, Footer...
│   ├── _components/             # Shared components across routes
│   │   ├── shared/              # NavBar, etc.
│   │   └── home/
│   ├── layout.tsx               # Root layout: fonts, metadata, viewport
│   ├── globals.css              # Design tokens + Tailwind theme + animations
│   └── favicon.ico
├── lib/                         # Infrastructure clients (server-side)
│   ├── elastic.ts               # Elasticsearch client (mock + production-ready)
│   ├── gemini.ts                # Gemini / Vertex AI client (classification + chat)
│   ├── pubsub.ts                # Google Cloud Pub/Sub pipeline simulation
│   ├── tipos.ts                 # Domain TypeScript interfaces (Evento)
│   └── i18n/                    # Internationalization
│       ├── context.tsx           # LocaleProvider + useTranslation hook
│       └── dictionaries/        # en.ts, es.ts — full UI dictionaries
├── public/                      # Static assets (SVGs)
├── system-design.md             # 📐 Complete design system specification
├── CLAUDE.md                    # 🤖 AI agent rules & architecture manifesto
├── next.config.ts
├── tailwind / postcss config
├── tsconfig.json
└── package.json
```

> **Co-location principle:** Screen-specific components live in `_components/` folders adjacent to their route. No global `components/` directory — by design.

---

## 🎨 Design System

Lote's visual identity is **warm but technological, Mexican but universal, honest but not scary**.

### Color Palette

| Color | Name | Hex | Role |
|---|---|---|---|
| 🔴 | **Rojo Lote** | `#D93030` | Primary identity — CTAs, logo, alerts |
| 🟠 | **Coral Azteca** | `#E8563A` | Gradients, hovers, warmth accents |
| 🟡 | **Oro Mundial** | `#C8A84B` | Data labels, timestamps, mono text |
| ⬛ | **Tinta Profunda** | `#13172A` | Dark mode background |
| ⬜ | **Niebla** | `#F4F2EE` | Light mode background |

### Safety Semaphore

| State | Color | Meaning |
|---|---|---|
| 🟢 **Tranquilo** | `#2ECC71` | No incidents reported — move with confidence |
| 🟡 **Monitorear** | `#F0B429` | Activity detected — check before heading out |
| 🔴 **Evitar** | `#D93030` | Active risk confirmed — Lote redirects you |

### Typography

| Family | Role | Usage |
|---|---|---|
| **Geist** (800/900) | Display | Logo, titles, large numbers |
| **Geist** (400–700) | Body | UI text, chat, descriptions |
| **JetBrains Mono** (400/500) | Mono | Coordinates, timestamps, source counts |

> Full specification: [`system-design.md`](./system-design.md)

---

## 🔄 Data Pipeline

The real-time ingestion pipeline leverages Google Cloud services:

```
1. INGEST    Cloud Functions poll Telegram, RSS, and Reddit every 5 min
2. PUBLISH   Raw messages are published to Pub/Sub topic `lote-eventos`
3. CLASSIFY  Subscriber Cloud Function calls Vertex AI (Gemini 2.0 Flash)
4. INDEX     Classified events are indexed in Elasticsearch with geospatial data
5. SERVE     Next.js Server Components query Elasticsearch directly
```

### Event Data Model

```typescript
interface Evento {
  id: string;
  zona: string;           // e.g. "Centro Histórico", "Roma Norte"
  alcaldia: string;       // e.g. "Cuauhtémoc", "Coyoacán"
  estado: "tranquilo" | "monitorear" | "evitar";
  titulo: string;
  descripcion: string;
  fuente: "telegram" | "rss" | "reddit";
  fuentes_count: number;  // Number of confirming sources
  lat: number;
  lng: number;
  timestamp: string;      // ISO 8601
  confianza: number;      // 0–1 confidence score
}
```

---

## 🌍 Internationalization

Lote supports **English** (default) and **Spanish** via a client-side i18n system:

- **`lib/i18n/dictionaries/en.ts`** — Full English dictionary
- **`lib/i18n/dictionaries/es.ts`** — Full Spanish dictionary
- **`lib/i18n/context.tsx`** — `LocaleProvider` + `useTranslation()` hook

```tsx
import { useTranslation } from "@/lib/i18n/context";

const t = useTranslation();
// t.chat.monitoring → "Monitoring 7 zones in real time"
```

> Zone names (Roma Norte, Coyoacán, etc.) stay in Spanish in both languages — they're proper geographic names.

---

## 🔐 Environment Variables

Create a `.env.local` file (gitignored) with the following variables for production mode:

```bash
# Elasticsearch
ELASTIC_URL=https://your-cluster.es.io:9243
ELASTIC_API_KEY=your-api-key
ELASTIC_INDEX=lote-eventos

# Gemini API (Option A — simpler)
GEMINI_API_KEY=your-gemini-api-key

# Vertex AI (Option B — recommended for GCP)
GOOGLE_CLOUD_PROJECT_ID=lote-hackathon-2026
GOOGLE_CLOUD_REGION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Pub/Sub
PUBSUB_TOPIC_ID=lote-eventos
```

> **For the hackathon MVP:** No environment variables are needed. The app runs entirely on mock data with identical function signatures to the production code.

---

## 🤝 Contributing

Contributions are welcome! Follow these guidelines:

1. **Fork** the repository
2. **Branch** from `develop` (`git checkout -b feat/your-feature develop`)
3. **Follow** the co-location pattern — screen-specific components go in `_components/`
4. **Use** design tokens from `globals.css` — no hardcoded hex values
5. **Prefer** Server Components — only use `"use client"` for interactive leaf components
6. **Commit** with conventional messages (`feat:`, `fix:`, `refactor:`, `style:`)
7. **PR** against `develop`

### Code Conventions

- **Server-first**: All `page.tsx` files are Server Components by default
- **No global components folder**: Use co-located `_components/` directories
- **Strict typing**: All events must use the `Evento` interface from `lib/tipos.ts`
- **Design tokens**: Use Tailwind semantic classes (`bg-primary`, `text-safe`, `bg-warn`, `bg-danger`)

---

## 📄 License

This project is open source under the [MIT License](./LICENSE).

---

## 🙏 Acknowledgments

- **Google Cloud** — Hackathon 2026 platform, Vertex AI, Pub/Sub
- **Elastic** — Real-time search and indexing infrastructure
- **Vercel** — Next.js framework and Geist font family
- **Leaflet.js** — Open-source interactive maps
- **The people of CDMX** — For inspiring a tool built with local soul

---

<div align="center">

**La ciudad no para. Lote tampoco.**

*CDMX · FIFA World Cup 2026*

<br/>

Built with ❤️ and 🌶️ by [nahumsvr](https://github.com/nahumsvr) [chungo05](https://github.com/chungo05) [DiegoMaldoo](https://github.com/DiegoMaldoo)

</div>
