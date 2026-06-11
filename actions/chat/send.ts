"use server";

import {
  consultarEventosPorZona,
  consultarTodosLosEventos,
} from "@/lib/elastic";
import { generarRespuestaChat } from "@/lib/gemini";
import type { Evento } from "@/lib/tipos";

// Known CDMX zones — used to detect which zone the user is asking about
const ZONAS_CDMX = [
  "Centro Histórico",
  "Roma Norte",
  "Polanco",
  "Coyoacán",
  "Tepito",
  "Santa Fe",
  "Xochimilco",
  "Condesa",
  "Del Valle",
  "Doctores",
];

// Severity order used for chip deduplication and map pin selection
const PRIORIDAD: Record<Evento["estado"], number> = {
  evitar: 2,
  monitorear: 1,
  tranquilo: 0,
};

export interface Chip {
  zona: string;
  estado: Evento["estado"];
}

export interface Mapa {
  zona: string;
  lat: number;
  lng: number;
}

export interface RespuestaChat {
  texto: string;
  chips: Chip[];
  mapa: Mapa | null;
  fuentes: number;
}

function detectarZona(pregunta: string): string | null {
  const lower = pregunta.toLowerCase();
  return ZONAS_CDMX.find((z) => lower.includes(z.toLowerCase())) ?? null;
}

function estadoLabel(estado: Evento["estado"]): string {
  const labels: Record<Evento["estado"], string> = {
    evitar: "Evitar",
    monitorear: "Monitorear",
    tranquilo: "Tranquilo",
  };
  return labels[estado];
}

// One chip per zone, keeping the worst state when multiple events share a zone
function derivarChips(eventos: Evento[]): Chip[] {
  const mapaZonas = new Map<string, Chip>();
  for (const evento of eventos) {
    const existente = mapaZonas.get(evento.zona);
    if (!existente || PRIORIDAD[evento.estado] > PRIORIDAD[existente.estado]) {
      mapaZonas.set(evento.zona, {
        zona: `${evento.zona} · ${estadoLabel(evento.estado)}`,
        estado: evento.estado,
      });
    }
  }
  return Array.from(mapaZonas.values());
}

// Pin for the highest-severity event in the set
function derivarMapa(eventos: Evento[]): Mapa | null {
  const principal = [...eventos].sort(
    (a, b) => PRIORIDAD[b.estado] - PRIORIDAD[a.estado],
  )[0];
  if (!principal) return null;
  return { zona: principal.zona, lat: principal.lat, lng: principal.lng };
}

/**
 * Server Action: orchestrates Elastic → Gemini → client.
 * Fetches zone-specific events when a known CDMX zone is mentioned;
 * falls back to all active events for city-wide questions.
 */
export async function enviarMensaje(pregunta: string): Promise<RespuestaChat> {
  const zonaDetectada = detectarZona(pregunta);

  const eventos: Evento[] = zonaDetectada
    ? await consultarEventosPorZona(zonaDetectada)
    : await consultarTodosLosEventos();

  const texto = await generarRespuestaChat(pregunta, eventos);
  const chips = derivarChips(eventos);
  const mapa = derivarMapa(eventos);
  const fuentes = eventos.reduce((sum, e) => sum + e.fuentes_count, 0);

  return { texto, chips, mapa, fuentes };
}
