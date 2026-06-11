/**
 * lib/gemini.ts
 * Gemini / Vertex AI client for LOTE — classification and chatbot.
 *
 * This module does two completely different things with the same model:
 *   1. CLASSIFY plain text events into zones + state + confidence.
 *   2. RESPOND to the user in Lote's voice: direct, local, no-nonsense.
 *
 * IN PRODUCTION WITH VERTEX AI (recommended for the GCP hackathon):
 *   - Uses VertexAI SDK instead of the generic Gemini SDK.
 *   - The model lives in your Google Cloud project, not on api.google.com.
 *   - Enables unified logging, quotas, and billing with the rest of the stack.
 *
 * IN PRODUCTION WITH GEMINI API (faster setup alternative):
 *   - Uses @google/generative-ai with GEMINI_API_KEY.
 *   - Simpler to configure, no GCP credentials required.
 *
 * SETUP IN GOOGLE CLOUD (Vertex AI):
 *   1. Enable the API: `gcloud services enable aiplatform.googleapis.com`
 *   2. Create a Service Account with the "Vertex AI User" role
 *   3. Download the credentials JSON and point to it with GOOGLE_APPLICATION_CREDENTIALS
 *   4. The endpoint has the form:
 *      us-central1-aiplatform.googleapis.com/v1/projects/{PROJECT}/locations/us-central1/...
 */

// ─── PRODUCTION OPTION A: Vertex AI SDK ──────────────────────────────────────
//
// import { VertexAI } from '@google-cloud/vertexai';
//
// const vertexAI = new VertexAI({
//   project: process.env.GOOGLE_CLOUD_PROJECT_ID!,
//   location: process.env.GOOGLE_CLOUD_REGION ?? 'us-central1',
// });
//
// const modelo = vertexAI.getGenerativeModel({
//   model: 'gemini-2.0-flash-001',
//   generationConfig: {
//     maxOutputTokens: 1024,
//     temperature: 0.3,     // Low for precise classification
//     topP: 0.95,
//   },
// });
// ─────────────────────────────────────────────────────────────────────────────

// ─── PRODUCTION OPTION B: Gemini API SDK (simpler) ────────────────────────────
//
// import { GoogleGenerativeAI } from '@google/generative-ai';
//
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
//
// const modelo = genAI.getGenerativeModel({
//   model: 'gemini-2.0-flash',
//   generationConfig: {
//     maxOutputTokens: 1024,
//     temperature: 0.3,
//   },
// });
//
// // For classification (deterministic) you can lower the temperature further:
// const modeloClasificador = genAI.getGenerativeModel({
//   model: 'gemini-2.0-flash',
//   generationConfig: { temperature: 0.1, maxOutputTokens: 256 },
// });
// ─────────────────────────────────────────────────────────────────────────────

import type { Evento } from './tipos';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const latencia = () => delay(200 + Math.random() * 100);

// ─── INTERNAL TYPES ───────────────────────────────────────────────────────────

export interface ResultadoClasificacion {
  zona: string;
  alcaldia: string;
  estado: Evento['estado'];
  confianza: number; // 0-1
  titulo: string;
  descripcion: string;
}

// ─── IMPLICIT TRAINING DATA (MOCK) ───────────────────────────────────────────
// In production, the model receives raw text and returns structured JSON.
// The system prompt tells it which CDMX zones exist and how to map the text.

const ZONAS_CDMX = [
  'Centro Histórico',
  'Roma Norte',
  'Polanco',
  'Coyoacán',
  'Tepito',
  'Santa Fe',
  'Xochimilco',
  'Condesa',
  'Del Valle',
  'Doctores',
];

const ALCALDIAS_POR_ZONA: Record<string, string> = {
  'Centro Histórico': 'Cuauhtémoc',
  'Roma Norte': 'Cuauhtémoc',
  Polanco: 'Miguel Hidalgo',
  Coyoacán: 'Coyoacán',
  Tepito: 'Cuauhtémoc',
  'Santa Fe': 'Álvaro Obregón',
  Xochimilco: 'Xochimilco',
  Condesa: 'Cuauhtémoc',
  'Del Valle': 'Benito Juárez',
  Doctores: 'Cuauhtémoc',
};

// ─── FUNCTION 1: CLASSIFY EVENT ──────────────────────────────────────────────

/**
 * Receives raw text from a source (Telegram, RSS, Reddit) and returns
 * the classified event with zone, state, and confidence score.
 *
 * PRODUCTION — actual prompt that would be sent to the model:
 *
 *   const prompt = `
 *     You are an urban incident classifier for Mexico City.
 *     Analyze the following text and respond ONLY with valid JSON.
 *
 *     Valid CDMX zones: ${ZONAS_CDMX.join(', ')}
 *
 *     Possible states:
 *     - "tranquilo": no confirmed incidents
 *     - "monitorear": activity detected, not urgent (1-2 sources)
 *     - "evitar": active risk confirmed by multiple sources
 *
 *     Text to classify:
 *     "${texto}"
 *
 *     Respond with this exact JSON:
 *     {
 *       "zona": string,
 *       "alcaldia": string,
 *       "estado": "tranquilo" | "monitorear" | "evitar",
 *       "confianza": number (0-1),
 *       "titulo": string (max 80 chars),
 *       "descripcion": string (max 200 chars)
 *     }
 *   `;
 *
 *   const result = await modeloClasificador.generateContent(prompt);
 *   const json = JSON.parse(result.response.text());
 *   return json as ResultadoClasificacion;
 */
export async function clasificarEvento(
  texto: string,
  zona?: string,
): Promise<ResultadoClasificacion> {
  await latencia();

  // Simulated logic: detects keywords to assign state
  const textoLower = texto.toLowerCase();

  let estado: Evento['estado'] = 'tranquilo';
  if (
    textoLower.includes('asalto') ||
    textoLower.includes('balacera') ||
    textoLower.includes('bloqueo') ||
    textoLower.includes('cierre') ||
    textoLower.includes('marcha')
  ) {
    estado = 'evitar';
  } else if (
    textoLower.includes('tráfico') ||
    textoLower.includes('lluvia') ||
    textoLower.includes('operativo') ||
    textoLower.includes('evento')
  ) {
    estado = 'monitorear';
  }

  // Detects zone in text or uses the provided one
  const zonaDetectada =
    zona ??
    ZONAS_CDMX.find((z) => textoLower.includes(z.toLowerCase())) ??
    'Centro Histórico';

  const alcaldia = ALCALDIAS_POR_ZONA[zonaDetectada] ?? 'Cuauhtémoc';

  // Simulated confidence — in production this comes from the model
  const confianza =
    estado === 'evitar'
      ? 0.75 + Math.random() * 0.2
      : estado === 'monitorear'
        ? 0.6 + Math.random() * 0.25
        : 0.5 + Math.random() * 0.3;

  return {
    zona: zonaDetectada,
    alcaldia,
    estado,
    confianza: Math.min(parseFloat(confianza.toFixed(2)), 0.99),
    titulo: texto.slice(0, 80),
    descripcion: texto.slice(0, 200),
  };
}

// ─── FUNCTION 2: CHATBOT RESPONSE ─────────────────────────────────────────────

/**
 * Generates a Lote response to the user using the current map context.
 * The voice is direct, local, no corporate tone — "the buddy who tells it to you straight".
 *
 * PRODUCTION — actual system prompt:
 *
 *   const systemPrompt = `
 *     You are LOTE, an urban mobility agent for Mexico City during the 2026 World Cup.
 *     You speak like a trusted local: direct, warm, no-nonsense, with local soul.
 *     You're not C5. You're not a corporate app. You don't scare people without reason.
 *
 *     Principles:
 *     - Truth with empathy. Say what the user needs, not what they want to hear.
 *     - Eyes open, not scared. Inform so they stay alert, not terrified.
 *     - Precision over speed. If there's no data, say so.
 *     - Local soul, universal use. You speak like someone who knows the city from the inside.
 *
 *     Current map context (real-time events from Elastic):
 *     ${JSON.stringify(eventosContexto, null, 2)}
 *
 *     Respond in 3 sentences max. If the question is about a specific zone,
 *     mention the current state and the reason. If there are alternatives, give them.
 *     NO bullet points. Talk natural.
 *   `;
 *
 *   const result = await modelo.generateContent([
 *     { role: 'user', parts: [{ text: systemPrompt }] },
 *     { role: 'user', parts: [{ text: pregunta }] },
 *   ]);
 *   return result.response.text();
 */
export async function generarRespuestaChat(
  pregunta: string,
  eventosContexto: Evento[],
): Promise<string> {
  await latencia();

  const preguntaLower = pregunta.toLowerCase();

  // Detects zone mentioned in the question
  const zonaMencionada = [
    'Centro Histórico',
    'Roma Norte',
    'Polanco',
    'Coyoacán',
    'Tepito',
    'Santa Fe',
    'Xochimilco',
    'Condesa',
  ].find((z) => preguntaLower.includes(z.toLowerCase()));

  if (zonaMencionada) {
    const eventosZona = eventosContexto.filter(
      (e) => e.zona.toLowerCase() === zonaMencionada.toLowerCase(),
    );

    if (eventosZona.length === 0) {
      return `No tengo reportes recientes de ${zonaMencionada} — lo que generalmente es buena señal. Pero no te confíes, revisa antes de salir.`;
    }

    const eventoReciente = eventosZona[0];

    if (eventoReciente.estado === 'evitar') {
      return `Oye, mejor no te metas a ${zonaMencionada} ahorita — ${eventoReciente.descripcion.slice(0, 120)}. ${eventosZona[0].fuentes_count} fuentes lo confirman. ¿Te busco una alternativa?`;
    }

    if (eventoReciente.estado === 'monitorear') {
      return `${zonaMencionada} está movida pero transitable. ${eventoReciente.descripcion.slice(0, 120)}. Ve con calma y toma tu tiempo.`;
    }

    return `${zonaMencionada} está tranquila ahorita. ${eventoReciente.descripcion.slice(0, 100)}. Buen momento para ir.`;
  }

  // Question about the overall city state
  if (
    preguntaLower.includes('ciudad') ||
    preguntaLower.includes('cdmx') ||
    preguntaLower.includes('qué está pasando') ||
    preguntaLower.includes('cómo está')
  ) {
    const evitar = eventosContexto.filter((e) => e.estado === 'evitar');
    const monitorear = eventosContexto.filter(
      (e) => e.estado === 'monitorear',
    );

    if (evitar.length > 0) {
      return `La ciudad está movida. Hay ${evitar.length} zonas que mejor evita ahorita: ${evitar.map((e) => e.zona).join(', ')}. El resto está tranquilo. ¿Te digo cuál te conviene más?`;
    }

    if (monitorear.length > 0) {
      return `La ciudad está relativamente tranquila, pero hay ${monitorear.length} zona(s) que vale la pena monitorear: ${monitorear.map((e) => e.zona).join(', ')}. Nada urgente, pero mejor saberlo.`;
    }

    return `Todo tranquilo por el momento en CDMX. Sin alertas activas. Buen día para moverse — nomás ten los ojos abiertos.`;
  }

  // Generic response when there's not enough context
  return `Dame más contexto, carnal — ¿a qué zona vas o de dónde sales? Así te puedo orientar con datos reales de ahorita.`;
}
