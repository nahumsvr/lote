"use client";

import { useState } from "react";
import ChatBubble from "./_components/ChatBubble";
import ChatInput from "./_components/ChatInput";

interface Chip {
  zona: string;
  estado: "tranquilo" | "monitorear" | "evitar";
}

interface Mapa {
  zona: string;
  lat: number;
  lng: number;
}

interface Mensaje {
  id: number;
  texto: string;
  esUsuario: boolean;
  fuentes?: number;
  tiempo?: string;
  chips?: Chip[];
  mapa?: Mapa;
}

const RESPUESTAS: Record<
  string,
  {
    texto: string;
    fuentes: number;
    chips: Chip[];
    mapa?: Mapa;
  }
> = {
  zocalo: {
    texto:
      "Hay una marcha estudiantil activa en el Centro Histórico desde hace 40 min. El acceso al Zócalo está bloqueado por el norte. Te recomiendo evitarlo por ahora.",
    fuentes: 6,
    chips: [
      { zona: "Zócalo · Evitar", estado: "evitar" },
      { zona: "Eje Central · Libre", estado: "tranquilo" },
    ],
    mapa: { zona: "Zócalo · Centro Histórico", lat: 19.4326, lng: -99.1332 },
  },
  coyoacan: {
    texto:
      "Coyoacán está tranquilo. Sin reportes en las últimas 2 horas — buena opción para cenar con la familia.\n\nAguas al pasar por Doctores si vas en coche, hay algo moviéndose ahí.",
    fuentes: 3,
    chips: [
      { zona: "Coyoacán · Tranquilo", estado: "tranquilo" },
      { zona: "Doctores · Monitorear", estado: "monitorear" },
    ],
    mapa: { zona: "Coyoacán", lat: 19.349, lng: -99.162 },
  },
  roma: {
    texto:
      "Roma Norte está tranquila ahorita. Circulación normal. Eso sí, evita Álvaro Obregón después de las 10pm — hay reportes de cierres por evento.",
    fuentes: 4,
    chips: [{ zona: "Roma Norte · Tranquilo", estado: "tranquilo" }],
    mapa: { zona: "Roma Norte", lat: 19.419, lng: -99.159 },
  },
  polanco: {
    texto:
      "Polanco sin novedad. Circulación normal en Presidente Masaryk. Buena zona para esta noche.",
    fuentes: 2,
    chips: [{ zona: "Polanco · Tranquilo", estado: "tranquilo" }],
    mapa: { zona: "Polanco", lat: 19.4336, lng: -99.1994 },
  },
  condesa: {
    texto:
      "Condesa tranquila. Ámsterdam y Tamaulipas despejadas. Es buena noche para salir por ahí.",
    fuentes: 3,
    chips: [{ zona: "Condesa · Tranquilo", estado: "tranquilo" }],
    mapa: { zona: "Condesa", lat: 19.414, lng: -99.172 },
  },
  tepito: {
    texto:
      "Tepito está en amarillo ahorita. Hay movimiento inusual reportado por 3 fuentes. No es crítico pero mejor no te aventures si no conoces la zona.",
    fuentes: 3,
    chips: [{ zona: "Tepito · Monitorear", estado: "monitorear" }],
    mapa: { zona: "Tepito", lat: 19.4428, lng: -99.1242 },
  },
  reforma: {
    texto:
      "Reforma está en monitoreo. Se está juntando gente cerca del Ángel por la previa del partido. Tranquilo por ahora pero ojo si llevas niños.",
    fuentes: 3,
    chips: [{ zona: "Reforma · Monitorear", estado: "monitorear" }],
    mapa: { zona: "Paseo de la Reforma", lat: 19.4269, lng: -99.1617 },
  },
  doctores: {
    texto:
      "Doctores en monitoreo. Cierre de carril en Eje Central por un evento. No es riesgo pero tu transporte puede tardar más.",
    fuentes: 4,
    chips: [{ zona: "Doctores · Monitorear", estado: "monitorear" }],
    mapa: { zona: "Doctores", lat: 19.4172, lng: -99.1466 },
  },
  seguro: {
    texto:
      "Las zonas más tranquilas ahorita son Polanco, Condesa, Roma Norte y Coyoacán. Sin reportes activos en las últimas 2 horas.",
    fuentes: 5,
    chips: [
      { zona: "Polanco · Tranquilo", estado: "tranquilo" },
      { zona: "Condesa · Tranquilo", estado: "tranquilo" },
      { zona: "Coyoacán · Tranquilo", estado: "tranquilo" },
    ],
  },
  default: {
    texto:
      "Déjame checar los reportes de tu rumbo ahorita mismo. Dame un segundo y te digo al chile cómo está la cosa.",
    fuentes: 0,
    chips: [],
  },
};

function obtenerRespuesta(texto: string) {
  const t = texto.toLowerCase();
  if (
    t.includes("zócalo") ||
    t.includes("zocalo") ||
    t.includes("centro histórico") ||
    t.includes("centro historico")
  )
    return RESPUESTAS.zocalo;
  if (t.includes("coyoacán") || t.includes("coyoacan"))
    return RESPUESTAS.coyoacan;
  if (t.includes("roma")) return RESPUESTAS.roma;
  if (t.includes("polanco")) return RESPUESTAS.polanco;
  if (t.includes("condesa")) return RESPUESTAS.condesa;
  if (t.includes("tepito")) return RESPUESTAS.tepito;
  if (t.includes("reforma")) return RESPUESTAS.reforma;
  if (t.includes("doctores")) return RESPUESTAS.doctores;
  if (
    t.includes("segur") ||
    t.includes("tranquil") ||
    t.includes("recomienda") ||
    t.includes("dónde") ||
    t.includes("donde")
  )
    return RESPUESTAS.seguro;
  return RESPUESTAS.default;
}

const MENSAJES_INICIALES: Mensaje[] = [
  {
    id: 1,
    texto: "¿Puedo llevar a mi familia al Zócalo ahorita?",
    esUsuario: true,
  },
  {
    id: 2,
    texto:
      "Hay una marcha estudiantil activa en el Centro Histórico desde hace 40 min. El acceso al Zócalo está bloqueado por el norte. Te recomiendo evitarlo por ahora.",
    esUsuario: false,
    fuentes: 6,
    tiempo: "hace 4 min",
    chips: [
      { zona: "Zócalo · Evitar", estado: "evitar" },
      { zona: "Eje Central · Libre", estado: "tranquilo" },
    ],
    mapa: { zona: "Zócalo · Centro Histórico", lat: 19.4326, lng: -99.1332 },
  },
];

export default function ChatPage() {
  const [mensajes, setMensajes] = useState<Mensaje[]>(MENSAJES_INICIALES);
  const [cargando, setCargando] = useState(false);

  const handleEnviar = (texto: string) => {
    const nuevoMensaje: Mensaje = {
      id: Date.now(),
      texto,
      esUsuario: true,
    };
    setMensajes((prev) => [...prev, nuevoMensaje]);
    setCargando(true);

    setTimeout(() => {
      const respuesta = obtenerRespuesta(texto);
      const mensajeLote: Mensaje = {
        id: Date.now() + 1,
        texto: respuesta.texto,
        esUsuario: false,
        fuentes: respuesta.fuentes || undefined,
        tiempo: "ahora",
        chips: respuesta.chips.length > 0 ? respuesta.chips : undefined,
        mapa: respuesta.mapa,
      };
      setMensajes((prev) => [...prev, mensajeLote]);
      setCargando(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col bg-[var(--color-bg)] h-dvh overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-black/5 dark:border-white/[0.07] border-b transition-colors duration-300">
        <div
          className="relative flex flex-shrink-0 justify-center items-center rounded-[13px] w-10 h-10"
          style={{ background: "linear-gradient(150deg, #E8563A, #D93030)" }}
        >
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
            <g stroke="white" strokeWidth="2.4" strokeLinecap="round">
              <path d="M15 18 8 13" />
              <path d="M14 23 6 22" />
              <path d="M15 28 8 32" />
              <path d="M33 18 40 13" />
              <path d="M34 23 42 22" />
              <path d="M33 28 40 32" />
            </g>
            <ellipse cx="24" cy="24" rx="10.5" ry="11.5" fill="white" />
            <circle cx="20" cy="23" r="1.6" fill="#D93030" />
            <circle cx="28" cy="23" r="1.6" fill="#D93030" />
            <path
              d="M21 28 Q24 30 27 28"
              stroke="#D93030"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[var(--color-text)] text-[17px] leading-tight transition-colors duration-300">
            Lote
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="flex-shrink-0 bg-[#2ECC71] rounded-full w-1.5 h-1.5 animate-pulse" />
            <span className="text-[11.5px] text-black/55 dark:text-white/55 truncate transition-colors duration-300">
              monitoreando CDMX
            </span>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1.5 bg-amber-500/10 dark:bg-[rgba(214,184,94,0.1)] px-2.5 py-1.5 border border-amber-500/20 dark:border-[rgba(214,184,94,0.28)] rounded-full transition-colors duration-300">
          <span className="font-mono font-bold text-amber-600 dark:text-[#D6B85E] text-[10.5px] transition-colors duration-300">
            7
          </span>
          <span className="font-mono text-[8.5px] text-amber-700/70 dark:text-[rgba(214,184,94,0.7)] leading-tight transition-colors duration-300">
            ZONAS
            <br />
            ACTIVAS
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col flex-1 gap-3 px-4 py-4 overflow-y-auto">
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 bg-black/5 dark:bg-white/[0.07] h-px transition-colors duration-300" />
          <span className="font-mono text-[9.5px] text-black/35 dark:text-white/35 tracking-widest transition-colors duration-300">
            HOY · MAR 9 JUN
          </span>
          <div className="flex-1 bg-black/5 dark:bg-white/[0.07] h-px transition-colors duration-300" />
        </div>

        {mensajes.map((m) => (
          <ChatBubble
            key={m.id}
            mensaje={m.texto}
            esUsuario={m.esUsuario}
            fuentes={m.fuentes}
            tiempo={m.tiempo}
            chips={m.chips}
            mapa={m.mapa}
          />
        ))}

        {cargando && (
          <div className="self-start">
            <div className="flex items-center gap-1.5 bg-[var(--color-surface)] dark:bg-[#1E2438] px-4 py-3 border border-black/5 dark:border-white/[0.06] rounded-[20px_20px_20px_6px] transition-colors duration-300">
              <span className="bg-black/30 dark:bg-white/40 rounded-full w-2 h-2 animate-bounce [animation-delay:0ms]" />
              <span className="bg-black/30 dark:bg-white/40 rounded-full w-2 h-2 animate-bounce [animation-delay:150ms]" />
              <span className="bg-black/30 dark:bg-white/40 rounded-full w-2 h-2 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onEnviar={handleEnviar} />
    </div>
  );
}