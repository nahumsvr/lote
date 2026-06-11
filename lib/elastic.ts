/**
 * lib/elastic.ts
 * Elastic client for LOTE — central data layer.
 *
 * IN PRODUCTION: This file initializes the official Elastic client
 * using @elastic/elasticsearch. For the hackathon, data is mocked
 * but the function signatures are identical to real production.
 *
 * GOOGLE AGENT BUILDER INTEGRATION (Elastic MCP Server):
 * Google Agent Builder can connect to Elastic via the Elastic MCP Server,
 * which exposes vector and semantic search tools directly
 * to the agent. The flow would be:
 *   Agent Builder → MCP Server (Elastic) → lote-eventos index
 * This allows the agent to understand natural language queries like
 * "which zones are at risk right now?" without SQL or manual queries.
 *
 * Reference: https://www.elastic.co/docs/solutions/search/mcp
 */

// ─── PRODUCTION: Real client initialization ───────────────────────────────────
//
// import { Client } from '@elastic/elasticsearch';
//
// const elasticClient = new Client({
//   node: process.env.ELASTIC_URL!,           // e.g.: https://mi-cluster.es.io:9243
//   auth: {
//     apiKey: process.env.ELASTIC_API_KEY!,   // API Key generated in Kibana
//   },
//   // For Elastic Cloud with verified SSL:
//   // tls: { rejectUnauthorized: true },
// });
//
// const INDICE = process.env.ELASTIC_INDEX ?? 'lote-eventos';
// ─────────────────────────────────────────────────────────────────────────────

import type { Evento } from './tipos';

// Simulated latency to mimic the real round-trip to Elastic Cloud
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const latencia = () => delay(150 + Math.random() * 150);

// ─── MOCK DATA — 7 representative zones of CDMX ───────────────────────────────
// Real coordinates. States calibrated for the 2026 World Cup demo.

const EVENTOS_MOCK: Evento[] = [
  {
    id: 'evt-001',
    zona: 'Centro Histórico',
    alcaldia: 'Cuauhtémoc',
    estado: 'evitar',
    titulo: 'Marcha sobre Eje Central corta accesos al Zócalo',
    descripcion:
      'Manifestación de trabajadores bloquea Eje Central de Hidalgo a Uruguay. Accesos al Zócalo cerrados por GN. Evita la zona si vas en vehículo.',
    fuente: 'telegram',
    fuentes_count: 5,
    lat: 19.4326,
    lng: -99.1332,
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 min ago
    confianza: 0.92,
  },
  {
    id: 'evt-002',
    zona: 'Roma Norte',
    alcaldia: 'Cuauhtémoc',
    estado: 'tranquilo',
    titulo: 'Roma Norte sin incidencias reportadas',
    descripcion:
      'Actividad normal en la zona. Orizaba y Álvaro Obregón con buen flujo. Terrazas y restaurantes operando sin novedad.',
    fuente: 'reddit',
    fuentes_count: 1,
    lat: 19.4194,
    lng: -99.1589,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    confianza: 0.78,
  },
  {
    id: 'evt-003',
    zona: 'Polanco',
    alcaldia: 'Miguel Hidalgo',
    estado: 'monitorear',
    titulo: 'Operativo vial por evento en Auditorio Nacional',
    descripcion:
      'Concierto esta noche en el Auditorio. Reforma y Ejército Nacional con tráfico lento desde las 18h. Estacionamientos llenos en un radio de 6 cuadras.',
    fuente: 'rss',
    fuentes_count: 3,
    lat: 19.4325,
    lng: -99.1944,
    timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    confianza: 0.85,
  },
  {
    id: 'evt-004',
    zona: 'Coyoacán',
    alcaldia: 'Coyoacán',
    estado: 'tranquilo',
    titulo: 'Coyoacán con buena afluencia turística',
    descripcion:
      'Jardín Hidalgo y mercado tranquilos. Afluencia moderada de turistas del Mundial. Sin incidentes reportados en las últimas 2 horas.',
    fuente: 'reddit',
    fuentes_count: 2,
    lat: 19.3497,
    lng: -99.1617,
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    confianza: 0.71,
  },
  {
    id: 'evt-005',
    zona: 'Tepito',
    alcaldia: 'Cuauhtémoc',
    estado: 'evitar',
    titulo: 'Reportes de asaltos en Peralvillo y Moctezuma',
    descripcion:
      'Tres reportes independientes de asalto en Peralvillo entre Guerrero y Moctezuma en la última hora. GN sin presencia visible en la zona.',
    fuente: 'telegram',
    fuentes_count: 4,
    lat: 19.4502,
    lng: -99.1215,
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    confianza: 0.88,
  },
  {
    id: 'evt-006',
    zona: 'Santa Fe',
    alcaldia: 'Álvaro Obregón',
    estado: 'monitorear',
    titulo: 'Lluvia intensa provoca encharcamientos en accesos',
    descripcion:
      'Tormenta vespertina genera encharcamiento en el acceso por Vasco de Quiroga. Paso complicado pero transitable con precaución.',
    fuente: 'rss',
    fuentes_count: 2,
    lat: 19.3607,
    lng: -99.2614,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    confianza: 0.82,
  },
  {
    id: 'evt-007',
    zona: 'Xochimilco',
    alcaldia: 'Xochimilco',
    estado: 'tranquilo',
    titulo: 'Trajineras operando con normalidad',
    descripcion:
      'Embarcadero Nuevo Nativitas con buena afluencia. Alta presencia de turistas del Mundial. Sin reportes negativos. Recomendado para visitar.',
    fuente: 'reddit',
    fuentes_count: 3,
    lat: 19.2572,
    lng: -99.1041,
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    confianza: 0.76,
  },
];

// ─── EXPORTED FUNCTIONS ───────────────────────────────────────────────────────

/**
 * Returns all active events for a specific zone.
 *
 * PRODUCTION:
 *   const { hits } = await elasticClient.search({
 *     index: INDICE,
 *     query: { term: { zona: { value: zona } } },
 *     sort: [{ timestamp: 'desc' }],
 *     size: 10,
 *   });
 *   return hits.hits.map((h) => h._source as Evento);
 */
export async function consultarEventosPorZona(zona: string): Promise<Evento[]> {
  await latencia();
  return EVENTOS_MOCK.filter(
    (e) => e.zona.toLowerCase() === zona.toLowerCase(),
  );
}

/**
 * Returns all active events in CDMX, sorted by timestamp desc.
 * This is the main query that powers the map and chatbot context.
 *
 * PRODUCTION:
 *   const { hits } = await elasticClient.search({
 *     index: INDICE,
 *     query: { match_all: {} },
 *     sort: [{ timestamp: 'desc' }],
 *     size: 50,
 *   });
 *   return hits.hits.map((h) => h._source as Evento);
 */
export async function consultarTodosLosEventos(): Promise<Evento[]> {
  await latencia();
  return [...EVENTOS_MOCK].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

/**
 * Returns the current risk state for a zone:
 * the worst state among all its recent events.
 *
 * PRODUCTION:
 *   const { hits } = await elasticClient.search({
 *     index: INDICE,
 *     query: {
 *       bool: {
 *         must: [{ term: { zona: { value: zona } } }],
 *         filter: [{ range: { timestamp: { gte: 'now-2h' } } }],
 *       },
 *     },
 *     aggs: {
 *       estado_dominante: { terms: { field: 'estado', size: 3 } },
 *     },
 *   });
 */
export async function consultarEstadoZona(
  zona: string,
): Promise<Evento['estado']> {
  await latencia();

  const eventos = EVENTOS_MOCK.filter(
    (e) => e.zona.toLowerCase() === zona.toLowerCase(),
  );

  if (eventos.length === 0) return 'tranquilo';

  // The most severe state wins — evitar > monitorear > tranquilo
  const prioridad: Record<Evento['estado'], number> = {
    evitar: 2,
    monitorear: 1,
    tranquilo: 0,
  };

  return eventos.reduce((peor, evento) =>
    prioridad[evento.estado] > prioridad[peor.estado] ? evento : peor,
  ).estado;
}
