/**
 * lib/gemini.ts
 * Cliente de Gemini / Vertex AI para LOTE — clasificación y chatbot.
 *
 * Este módulo hace dos cosas completamente distintas con el mismo modelo:
 *   1. CLASIFICAR eventos de texto plano en zonas + estado + confianza.
 *   2. RESPONDER al usuario con la voz de Lote: directa, local, sin rodeos.
 *
 * EN PRODUCCIÓN CON VERTEX AI (recomendado para el hackathon GCP):
 *   - Se usa VertexAI SDK en lugar del SDK genérico de Gemini.
 *   - El modelo vive en tu proyecto de Google Cloud, no en api.google.com.
 *   - Permite logging, cuotas y facturación unificada con el resto del stack.
 *
 * EN PRODUCCIÓN CON GEMINI API (alternativa más rápida de setup):
 *   - Se usa @google/generative-ai con GEMINI_API_KEY.
 *   - Más simple de configurar, sin necesidad de credenciales de GCP.
 *
 * CONFIGURACIÓN EN GOOGLE CLOUD (Vertex AI):
 *   1. Habilita la API: `gcloud services enable aiplatform.googleapis.com`
 *   2. Crea una Service Account con rol "Vertex AI User"
 *   3. Descarga el JSON de credenciales y apunta a él con GOOGLE_APPLICATION_CREDENTIALS
 *   4. El endpoint tiene la forma:
 *      us-central1-aiplatform.googleapis.com/v1/projects/{PROJECT}/locations/us-central1/...
 */

// ─── PRODUCCIÓN OPCIÓN A: Vertex AI SDK ──────────────────────────────────────
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
//     temperature: 0.3,     // Bajo para clasificación precisa
//     topP: 0.95,
//   },
// });
// ─────────────────────────────────────────────────────────────────────────────

// ─── PRODUCCIÓN OPCIÓN B: Gemini API SDK (más simple) ─────────────────────────
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
// // Para clasificación (determinista) se puede bajar más la temperatura:
// const modeloClasificador = genAI.getGenerativeModel({
//   model: 'gemini-2.0-flash',
//   generationConfig: { temperature: 0.1, maxOutputTokens: 256 },
// });
// ─────────────────────────────────────────────────────────────────────────────

import type { Evento } from './tipos';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const latencia = () => delay(200 + Math.random() * 100);

// ─── TIPOS INTERNOS ───────────────────────────────────────────────────────────

export interface ResultadoClasificacion {
  zona: string;
  alcaldia: string;
  estado: Evento['estado'];
  confianza: number; // 0-1
  titulo: string;
  descripcion: string;
}

// ─── DATOS DE ENTRENAMIENTO IMPLÍCITO (MOCK) ─────────────────────────────────
// En producción, el modelo recibe el texto crudo y devuelve JSON estructurado.
// El prompt de sistema le dice qué zonas de CDMX existen y cómo mapear el texto.

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

// ─── FUNCIÓN 1: CLASIFICAR EVENTO ─────────────────────────────────────────────

/**
 * Recibe texto crudo de una fuente (Telegram, RSS, Reddit) y devuelve
 * el evento clasificado con zona, estado y score de confianza.
 *
 * PRODUCCIÓN — prompt real que se mandaría al modelo:
 *
 *   const prompt = `
 *     Eres un clasificador de incidentes urbanos para la Ciudad de México.
 *     Analiza el siguiente texto y responde ÚNICAMENTE con un JSON válido.
 *
 *     Zonas válidas de CDMX: ${ZONAS_CDMX.join(', ')}
 *
 *     Estados posibles:
 *     - "tranquilo": sin incidencias confirmadas
 *     - "monitorear": actividad detectada, no urgente (1-2 fuentes)
 *     - "evitar": riesgo activo confirmado por múltiples fuentes
 *
 *     Texto a clasificar:
 *     "${texto}"
 *
 *     Responde con este JSON exacto:
 *     {
 *       "zona": string,
 *       "alcaldia": string,
 *       "estado": "tranquilo" | "monitorear" | "evitar",
 *       "confianza": number (0-1),
 *       "titulo": string (máx 80 chars),
 *       "descripcion": string (máx 200 chars)
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

  // Lógica simulada: detecta keywords para asignar estado
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

  // Detecta zona en el texto o usa la proporcionada
  const zonaDetectada =
    zona ??
    ZONAS_CDMX.find((z) => textoLower.includes(z.toLowerCase())) ??
    'Centro Histórico';

  const alcaldia = ALCALDIAS_POR_ZONA[zonaDetectada] ?? 'Cuauhtémoc';

  // Confianza simulada — en producción viene del modelo
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

// ─── FUNCIÓN 2: RESPUESTA DEL CHATBOT ─────────────────────────────────────────

/**
 * Genera una respuesta de Lote al usuario usando el contexto actual del mapa.
 * La voz es directa, local, sin corporativismo — "el carnal que te dice las cosas al chile".
 *
 * PRODUCCIÓN — system prompt real:
 *
 *   const systemPrompt = `
 *     Eres LOTE, un agente de movilidad urbana para la Ciudad de México durante el Mundial 2026.
 *     Hablas como un chilango de confianza: directo, cálido, sin rodeos, con alma local.
 *     No eres el C5. No eres una app corporativa. No asustas sin razón.
 *
 *     Principios:
 *     - Verdad con empatía. Di lo que el usuario necesita, no lo que quiere oír.
 *     - Ojos abiertos, no miedo. Informa para que no se confíe, no para aterrarlo.
 *     - Precisión sobre velocidad. Si no hay datos, dilo.
 *     - Alma local, uso universal. Hablas como alguien que conoce la ciudad de adentro.
 *
 *     Contexto actual del mapa (eventos en tiempo real de Elastic):
 *     ${JSON.stringify(eventosContexto, null, 2)}
 *
 *     Responde en máximo 3 oraciones. Si la pregunta es sobre una zona específica,
 *     menciona el estado actual y el motivo. Si hay alternativas, dálas.
 *     NO uses bullet points. Habla natural.
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

  // Detecta zona mencionada en la pregunta
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

  // Pregunta sobre el estado general de la ciudad
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

  // Respuesta genérica cuando no hay contexto suficiente
  return `Dame más contexto, carnal — ¿a qué zona vas o de dónde sales? Así te puedo orientar con datos reales de ahorita.`;
}
