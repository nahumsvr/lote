/**
 * lib/pubsub.ts
 * Simulación del pipeline de ingesta vía Google Cloud Pub/Sub para LOTE.
 *
 * FLUJO COMPLETO EN PRODUCCIÓN:
 *
 *   [Fuentes]          [Ingesta]               [Procesamiento]        [Salida]
 *   Telegram  ───┐
 *   RSS        ───┼──▶ Cloud Pub/Sub ──▶ Cloud Function ──▶ Vertex AI ──▶ Elastic
 *   Reddit     ───┘    (topic: lote-eventos)  (clasificador)              (índice)
 *
 *   1. Una Cloud Function corre cada 5 minutos y monitorea las 3 fuentes.
 *   2. Cada mensaje nuevo se publica en el topic `lote-eventos` de Pub/Sub.
 *   3. Una segunda Cloud Function se suscribe al topic y:
 *      a. Recibe el mensaje crudo.
 *      b. Llama a Vertex AI (lib/gemini.ts → clasificarEvento) para clasificarlo.
 *      c. Indexa el evento clasificado en Elastic con todos sus campos.
 *   4. El frontend consulta Elastic (lib/elastic.ts) para pintar el mapa.
 *
 * CONFIGURACIÓN EN GOOGLE CLOUD:
 *   1. Crea el topic:
 *      `gcloud pubsub topics create lote-eventos`
 *   2. Crea la suscripción para la Cloud Function clasificadora:
 *      `gcloud pubsub subscriptions create lote-clasificador-sub \
 *         --topic=lote-eventos \
 *         --ack-deadline=60`
 *   3. Deploy de la Cloud Function suscriptora:
 *      `gcloud functions deploy clasificarEventoPubSub \
 *         --runtime nodejs20 \
 *         --trigger-topic lote-eventos \
 *         --region us-central1 \
 *         --set-env-vars ELASTIC_URL=...,GEMINI_API_KEY=...`
 *
 * VARIABLES DE ENTORNO REQUERIDAS:
 *   GOOGLE_CLOUD_PROJECT_ID=lote-hackathon-2026
 *   PUBSUB_TOPIC_ID=lote-eventos
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
 */

// ─── PRODUCCIÓN: Inicialización del cliente de Pub/Sub ───────────────────────
//
// import { PubSub, Message } from '@google-cloud/pubsub';
//
// const pubSubClient = new PubSub({
//   projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
//   // En Cloud Functions/Cloud Run, las credenciales se resuelven automáticamente
//   // vía Application Default Credentials (ADC) — no necesitas el JSON explícito.
// });
//
// const TOPIC_ID = process.env.PUBSUB_TOPIC_ID ?? 'lote-eventos';
//
// // Para publicar un mensaje en el topic:
// async function publicarEnTopic(datos: MensajeCrudo): Promise<string> {
//   const topic = pubSubClient.topic(TOPIC_ID);
//   const dataBuffer = Buffer.from(JSON.stringify(datos));
//   const messageId = await topic.publishMessage({ data: dataBuffer });
//   return messageId;
// }
//
// // La Cloud Function suscriptora tendría esta firma:
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

// ─── TIPOS INTERNOS ───────────────────────────────────────────────────────────

// Mensaje crudo tal como llega de las fuentes, antes de clasificación
interface MensajeCrudo {
  id: string;
  fuente: Evento['fuente'];
  texto: string;       // Texto sin procesar del post/canal/feed
  url?: string;        // URL original del post (para auditoría)
  zona?: string;       // Zona mencionada explícitamente (opcional)
  recibido_at: string; // ISO 8601 — cuándo llegó al pipeline
}

// ─── BANCO DE MENSAJES CRUDOS SIMULADOS ──────────────────────────────────────
// Representan lo que llegaría de Telegram, RSS y Reddit antes de que
// Vertex AI los procese. Texto real, sucio, como viene de la fuente.

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

// ─── FUNCIONES EXPORTADAS ─────────────────────────────────────────────────────

/**
 * Simula la llegada de un nuevo evento al pipeline desde cualquier fuente.
 * En producción, esta función no existiría aquí — la llamaría la Cloud Function
 * de ingesta que monitorea Telegram/RSS/Reddit.
 *
 * PRODUCCIÓN — lo que realmente haría la Cloud Function de ingesta:
 *   const messageId = await publicarEnTopic({
 *     id: crypto.randomUUID(),
 *     fuente: 'telegram',
 *     texto: mensajeNuevo,
 *     recibido_at: new Date().toISOString(),
 *   });
 *   console.log(`Mensaje ${messageId} publicado en ${TOPIC_ID}`);
 */
export async function simularEventoEntrante(): Promise<MensajeCrudo> {
  await latencia();

  // Toma un mensaje aleatorio del banco y le actualiza el timestamp
  const base =
    MENSAJES_CRUDOS[Math.floor(Math.random() * MENSAJES_CRUDOS.length)];

  return {
    ...base,
    id: `msg-sim-${Date.now()}`,
    recibido_at: new Date().toISOString(),
  };
}

/**
 * Devuelve los N mensajes más recientes del pipeline, listos para ser
 * clasificados por Vertex AI e indexados en Elastic.
 *
 * En producción esto sería la suscripción a Pub/Sub, no un array en memoria.
 * La Cloud Function clasificadora recibiría estos mensajes via push/pull:
 *
 *   const subscription = pubSubClient.subscription('lote-clasificador-sub');
 *   subscription.on('message', async (message: Message) => {
 *     const datos = JSON.parse(message.data.toString()) as MensajeCrudo;
 *     const clasificado = await clasificarEvento(datos.texto, datos.zona);
 *     await indexarEnElastic(clasificado);
 *     message.ack(); // Confirmar procesamiento para evitar redelivery
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
