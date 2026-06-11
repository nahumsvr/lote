# AI Agent Rules & Architecture Manifesto — LOTE (Junio 2026)

Eres un agente de IA experto en desarrollo de software, especializado en Next.js 15+ (App Router), React 19, Tailwind CSS v4 y arquitecturas Server-First. Tu objetivo es codificar y asistir en el proyecto "LOTE" siguiendo estrictamente las reglas de este documento.

---

## 🎯 Contexto del Proyecto y Stack

- **Producto:** LOTE - Agente de movilidad urbana en tiempo real para CDMX (Hackathon Google Cloud 2026).
- **Framework:** Next.js 15+ (App Router) en un único monorrepo (Frontend y Backend unificados).
- **Estilos:** Tailwind CSS v4 (Sin librerías de componentes externas como HeroUI/Shadcn).
- **Tipografías:** `Geist` (prose/UI) y `JetBrains Mono` (datos/métricas/timestamps).
- **Mapa:** Leaflet.js (Cliente).
- **IA/Data:** Gemini API (vía SDK oficial) y Elastic (Búsqueda e indexación).

---

## 📂 Estructura del Monorrepo (Estricta)

Cualquier archivo nuevo debe seguir esta jerarquía. No inventes carpetas globales en la raíz.

lote/
├── app/ # Next.js App Router (Frontend + Rutas de API)
│ ├── page.tsx # Pantalla 1: Mapa (Server Component)
│ ├── chat/ # Pantalla 2: Chatbot
│ │ ├── page.tsx

│ │ └── \_components/ # UI exclusiva del chat (Co-locación)
│ ├── zonas/ # Pantalla 3: Recomendaciones
│ │ ├── page.tsx

│ │ └── \_components/ # UI exclusiva de zonas
│ ├── api/ # Backend interno (Endpoints HTTP necesarios)
│ │ └── eventos/
│ │ └── route.ts # Ingesta o consultas específicas expuestas
│ ├── \_components/ # Componentes compartidos entre pantallas
│ │ └── shared/ # StatusChip, NavBar, etc.
│ └── layout.tsx # Root layout con la barra de navegación inferior
├── actions/ # Server Actions (Backend de mutación/interacción)
│ └── chat/
│ └── send.ts # Orquestación: Contexto Elastic -> Gemini API -> Cliente
├── lib/ # Clientes de Infraestructura (Instancias globales)
│ ├── elastic.ts # Cliente Elastic local/cloud
│ ├── gemini.ts # Cliente Gemini API / Vertex AI
│ └── tipos.ts # Interfaces de TypeScript del dominio
└── public/ # Archivos estáticos estáticos (GeoJSON de CDMX)

---

## 🤖 Reglas de Codificación para el Agente

### 1. Server-First por Defecto (Next.js 15)

- **Regla:** Todas las páginas (`page.tsx`) son **Server Components** por defecto.
- **Fetching:** Realiza el fetching de datos directamente en las páginas usando `async/await` llamando al cliente de Elastic en `lib/elastic.ts`. Prohibido usar `useEffect` o `useState` para la carga inicial de datos.
- **Next 15 Params:** En `page.tsx`, los `params` y `searchParams` son promesas. Debes aplicarles `await` obligatoriamente antes de leer sus propiedades.

### 2. Restricción Estricta de `"use client"`

- Solo usa `"use client"` en componentes de hojas terminales que requieran interactividad del usuario (`onClick`, hooks de estado, formularios de chat) o librerías del navegador.
- **Integración de Leaflet:** El componente del mapa requiere acceso al objeto `window`. Debe aislarse en un archivo con `"use client"` e importarse dinámicamente en `app/page.tsx` usando `next/dynamic` con `{ ssr: false }`. Los datos del mapa (GeoJSON y eventos de Elastic) se le pasan como `props` desde el Server Component.

### 3. Co-locación de Componentes

- Prohibido crear una carpeta `components/` en la raíz.
- La UI específica de una pantalla debe vivir dentro de una subcarpeta privada `_components/` adyacente a su propia ruta (ej. `app/chat/_components/ChatBubble.tsx`).

### 4. Manejo del Chatbot y Server Actions

- No crees endpoints de API (`route.ts`) innecesarios para mutaciones o interacciones de formulario si se pueden resolver con **Server Actions**.
- El flujo del chat debe usar una Server Action (`actions/chat/send.ts`). Esta función asíncrona se ejecuta en el servidor, consulta los datos frescos en Elastic, construye el prompt del sistema con el estado actual del mapa y llama a la API de Gemini, devolviendo solo el texto final compilado al cliente.

### 5. Sistema de Diseño (Design Tokens en Tailwind v4)

Cuando generes clases de Tailwind CSS, usa estrictamente las variables de color del tema:

- `bg-primary` o `text-primary` para el color de marca (`#D93030`).
- `bg-safe` para estados "Tranquilo" (`#2ECC71`).
- `bg-warn` para estados "Monitorear" (`#F0B429`).
- `bg-danger` para estados "Evitar" (`#D93030`).
- Usa `font-display` para layouts estándar y `font-mono` para datos técnicos, contadores y marcas de tiempo.

---

## 🚫 Límites de Scope Absolutos (No Programar)

Si el usuario te pide implementar algo fuera de esta lista, recuérdale amablemente que está **fuera del scope del MVP del hackathon**:

1.  **NO** implementes sistemas de autenticación o registro de usuarios.
2.  **NO** calcules ni generes rutas vehiculares (eso lo hace Google Maps; Lote solo clasifica el riesgo de las zonas).
3.  **NO** agregues persistencia al historial del chat (solo debe vivir en la sesión actual del cliente).
4.  **NO** manejes notificaciones push ni service workers.
5.  **NO** agregues soporte geoespacial para zonas fuera de la Ciudad de México (CDMX).

---

## 📊 Contrato del Modelo de Datos (`lib/tipos.ts`)

Siempre que mapees, crees o manipules un evento proveniente de Elastic, debes tiparlo estrictamente con esta estructura:

```typescript
export interface Evento {
  id: string;
  zona: string; // Ej: "Centro Histórico", "Roma Norte"
  alcaldia: string; // Ej: "Cuauhtémoc", "Coyoacán"
  estado: "tranquilo" | "monitorear" | "evitar";
  titulo: string;
  descripcion: string;
  fuente: "telegram" | "rss" | "reddit";
  fuentes_count: number; // Cuántas fuentes confirman el incidente
  lat: number;
  lng: number;
  timestamp: string; // ISO 8601
  confianza: number; // Rango 0-1 (Calculado por Vertex AI)
}
```
