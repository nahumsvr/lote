/**
 * lib/pubsub.ts
 * Simulation of the ingestion pipeline via Google Cloud Pub/Sub for LOTE.
 *
 * FULL PRODUCTION FLOW:
 *
 *   [Sources]          [Ingestion]             [Processing]           [Output]
 *   Telegram  ───┐
 *   RSS        ───┼──▶ Cloud Pub/Sub ──▶ Cloud Function ──▶ Vertex AI ──▶ Elastic
 *   Reddit     ───┘    (topic: lote-eventos)  (classifier)               (index)
 *
 *   1. A Cloud Function runs every 5 minutes and monitors the 3 sources.
 *   2. Each new message is published to the `lote-eventos` Pub/Sub topic.
 *   3. A second Cloud Function subscribes to the topic and:
 *      a. Receives the raw message.
 *      b. Calls Vertex AI (lib/gemini.ts → clasificarEvento) to classify it.
 *      c. Indexes the classified event in Elastic with all its fields.
 *   4. The frontend queries Elastic (lib/elastic.ts) to render the map.
 *
 * SETUP IN GOOGLE CLOUD:
 *   1. Create the topic:
 *      `gcloud pubsub topics create lote-eventos`
 *   2. Create the subscription for the classifier Cloud Function:
 *      `gcloud pubsub subscriptions create lote-clasificador-sub \
 *         --topic=lote-eventos \
 *         --ack-deadline=60`
 *   3. Deploy the subscriber Cloud Function:
 *      `gcloud functions deploy clasificarEventoPubSub \
 *         --runtime nodejs20 \
 *         --trigger-topic lote-eventos \
 *         --region us-central1 \
 *         --set-env-vars ELASTIC_URL=...,GEMINI_API_KEY=...`
 *
 * REQUIRED ENVIRONMENT VARIABLES:
 *   GOOGLE_CLOUD_PROJECT_ID=lote-hackathon-2026
 *   PUBSUB_TOPIC_ID=lote-eventos
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
 */

// ─── PRODUCTION: Pub/Sub client initialization ────────────────────────────────
//
// import { PubSub, Message } from '@google-cloud/pubsub';
//
// const pubSubClient = new PubSub({
//   projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
//   // In Cloud Functions/Cloud Run, credentials are resolved automatically
//   // via Application Default Credentials (ADC) — no need for the explicit JSON.
// });
//
// const TOPIC_ID = process.env.PUBSUB_TOPIC_ID ?? 'lote-eventos';
//
// // To publish a message to the topic:
// async function publicarEnTopic(datos: MensajeCrudo): Promise<string> {
//   const topic = pubSubClient.topic(TOPIC_ID);
//   const dataBuffer = Buffer.from(JSON.stringify(datos));
//   const messageId = await topic.publishMessage({ data: dataBuffer });
//   return messageId;
// }
//
// // The subscriber Cloud Function would have this signature:
// // export const clasificarEventoPubSub = functions.pubsub
// //   .topic(TOPIC_ID)
// //   .onPublish(async (message: Message) => {
// //     const datos = message.json as MensajeCrudo;
// //     const eventoClasificado = await clasificarEvento(datos.texto, datos.zona);
// //     await indexarEnElastic(eventoClasificado);
// //   });
// ─────────────────────────────────────────────────────────────────────────────

import type { Evento } from './tipos';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const latencia = () => delay(200 + Math.random() * 100);

// ─── INTERNAL TYPES ───────────────────────────────────────────────────────────

// Raw message as it arrives from sources, before classification
interface MensajeCrudo {
  id: string;
  fuente: Evento['fuente'];
  texto: string;       // Raw unprocessed text from the post/channel/feed
  url?: string;        // Original post URL (for auditing)
  zona?: string;       // Zone explicitly mentioned (optional)
  recibido_at: string; // ISO 8601 — when it arrived at the pipeline
}

// ─── SIMULATED RAW MESSAGES BANK ─────────────────────────────────────────────
// These represent what would arrive from Telegram, RSS, and Reddit before
// Vertex AI processes them. Real, raw text, as it comes from the source.

const MENSAJES_CRUDOS: MensajeCrudo[] = [
  {
    id: 'msg-t-001',
    fuente: 'telegram',
    texto:
      'ALERTA: Marcha magisterial bloqueando Eje Central desde las 10am. Zócalo cerrado al tráfico. GN presente. Eviten la zona del Centro.',
    zona: 'Centro Histórico',
    recibido_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: 'msg-r-001',
    fuente: 'reddit',
    texto:
      '[r/CDMX] Alguien sabe qué pasó en Tepito? Escuché balazos hace como 40 min por Moctezuma y Guerrero. Ya vi que cerraron la calle.',
    zona: 'Tepito',
    recibido_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'msg-rss-001',
    fuente: 'rss',
    texto:
      'Reforma | Operativo vial por concierto en Auditorio Nacional esta noche. Ejército Nacional y Reforma con restricciones de 18 a 23h.',
    zona: 'Polanco',
    recibido_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'msg-t-002',
    fuente: 'telegram',
    texto:
      'Reporte ciudadano: Asalto en combi sobre Eje 1 Norte a la altura de Peralvillo. El chofer paró y avisó a los pasajeros que bajaran.',
    zona: 'Tepito',
    recibido_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: 'msg-rss-002',
    fuente: 'rss',
    texto:
      'El Universal | Lluvia intensa genera encharcamientos en Santa Fe. Vasco de Quiroga con paso lento. Tiempo estimado de normalización: 2 horas.',
    zona: 'Santa Fe',
    recibido_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'msg-r-002',
    fuente: 'reddit',
    texto:
      '[r/mexico] Fui hoy a Xochimilco con unos amigos que vinieron al Mundial. Todo tranquilo, buen ambiente, muchos turistas pero sin jalones. Recomendado.',
    zona: 'Xochimilco',
    recibido_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 'msg-t-003',
    fuente: 'telegram',
    texto:
      'Tepito: Tercer reporte de asalto en la misma cuadra de Moctezuma. Patrullas no han llegado. No se acerquen a la zona.',
    zona: 'Tepito',
    recibido_at: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
  },
  {
    id: 'msg-r-003',
    fuente: 'reddit',
    texto:
      '[r/CDMX] Roma Norte está de pelos esta tarde. Fui a tomar café a Orizaba y está todo tranquilo. Nada raro.',
    zona: 'Roma Norte',
    recibido_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  },
];

// ─── EXPORTED FUNCTIONS ───────────────────────────────────────────────────────

/**
 * Simulates the arrival of a new event to the pipeline from any source.
 * In production, this function wouldn't exist here — it would be called by the Cloud Function
 * that monitors Telegram/RSS/Reddit for ingestion.
 *
 * PRODUCTION — what the ingestion Cloud Function would actually do:
 *   const messageId = await publicarEnTopic({
 *     id: crypto.randomUUID(),
 *     fuente: 'telegram',
 *     texto: mensajeNuevo,
 *     recibido_at: new Date().toISOString(),
 *   });
 *   console.log(`Message ${messageId} published to ${TOPIC_ID}`);
 */
export async function simularEventoEntrante(): Promise<MensajeCrudo> {
  await latencia();

  // Picks a random message from the bank and updates its timestamp
  const base =
    MENSAJES_CRUDOS[Math.floor(Math.random() * MENSAJES_CRUDOS.length)];

  return {
    ...base,
    id: `msg-sim-${Date.now()}`,
    recibido_at: new Date().toISOString(),
  };
}

/**
 * Returns the N most recent messages from the pipeline, ready to be
 * classified by Vertex AI and indexed in Elastic.
 *
 * In production this would be the Pub/Sub subscription, not an in-memory array.
 * The classifier Cloud Function would receive these messages via push/pull:
 *
 *   const subscription = pubSubClient.subscription('lote-clasificador-sub');
 *   subscription.on('message', async (message: Message) => {
 *     const datos = JSON.parse(message.data.toString()) as MensajeCrudo;
 *     const clasificado = await clasificarEvento(datos.texto, datos.zona);
 *     await indexarEnElastic(clasificado);
 *     message.ack(); // Confirm processing to prevent redelivery
 *   });
 *   subscription.on('error', (err) => console.error('Pub/Sub error:', err));
 */
export async function obtenerEventosRecientes(
  limite: number = 10,
): Promise<MensajeCrudo[]> {
  await latencia();

  return [...MENSAJES_CRUDOS]
    .sort(
      (a, b) =>
        new Date(b.recibido_at).getTime() - new Date(a.recibido_at).getTime(),
    )
    .slice(0, limite);
}
