"use client";

import { useState } from "react";
import ChatBubble from "./_components/ChatBubble";
import ChatInput from "./_components/ChatInput";
import { useTranslation } from "@/lib/i18n/context";

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

function obtenerRespuesta(texto: string, responses: Record<string, { texto: string; fuentes: number; chips: Chip[]; mapa?: Mapa }>) {
  const t = texto.toLowerCase();
  // Match both Spanish and English keywords
  if (
    t.includes("zócalo") ||
    t.includes("zocalo") ||
    t.includes("centro histórico") ||
    t.includes("centro historico") ||
    t.includes("historic center") ||
    t.includes("downtown")
  )
    return responses.zocalo;
  if (t.includes("coyoacán") || t.includes("coyoacan"))
    return responses.coyoacan;
  if (t.includes("roma")) return responses.roma;
  if (t.includes("polanco")) return responses.polanco;
  if (t.includes("condesa")) return responses.condesa;
  if (t.includes("tepito")) return responses.tepito;
  if (t.includes("reforma")) return responses.reforma;
  if (t.includes("doctores")) return responses.doctores;
  if (
    t.includes("segur") ||
    t.includes("tranquil") ||
    t.includes("recomienda") ||
    t.includes("dónde") ||
    t.includes("donde") ||
    t.includes("safe") ||
    t.includes("quiet") ||
    t.includes("calm") ||
    t.includes("recommend") ||
    t.includes("where")
  )
    return responses.seguro;
  return responses.default;
}

export default function ChatPage() {
  const t = useTranslation();
  const responses = t.chat.responses;

  const MENSAJES_INICIALES: Mensaje[] = [
    {
      id: 1,
      texto: t.chat.initialQuestion,
      esUsuario: true,
    },
    {
      id: 2,
      texto: responses.zocalo.texto,
      esUsuario: false,
      fuentes: responses.zocalo.fuentes,
      tiempo: t.chat.now,
      chips: responses.zocalo.chips,
      mapa: responses.zocalo.mapa,
    },
  ];

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
      const respuesta = obtenerRespuesta(texto, responses);
      const mensajeLote: Mensaje = {
        id: Date.now() + 1,
        texto: respuesta.texto,
        esUsuario: false,
        fuentes: respuesta.fuentes || undefined,
        tiempo: t.chat.now,
        chips: respuesta.chips.length > 0 ? respuesta.chips : undefined,
        mapa: respuesta.mapa,
      };
      setMensajes((prev) => [...prev, mensajeLote]);
      setCargando(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col bg-[#13172A] h-dvh overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-white/[0.07] border-b">
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
          <div className="font-semibold text-[#F4F2EE] text-[17px] leading-tight">
            Lote
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="flex-shrink-0 bg-[#2ECC71] rounded-full w-1.5 h-1.5 animate-pulse" />
            <span className="text-[11.5px] text-white/55 truncate">
              {t.chat.monitoring}
            </span>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1.5 bg-[rgba(214,184,94,0.1)] px-2.5 py-1.5 border border-[rgba(214,184,94,0.28)] rounded-full">
          <span className="font-mono font-bold text-[#D6B85E] text-[10.5px]">
            7
          </span>
          <span className="font-mono text-[8.5px] text-[rgba(214,184,94,0.7)] leading-tight">
            {t.chat.zonesLabel}
            <br />
            {t.chat.activeLabel}
          </span>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex flex-col flex-1 gap-3 px-4 py-4 overflow-y-auto">
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 bg-white/[0.07] h-px" />
          <span className="font-mono text-[9.5px] text-white/35 tracking-widest">
            {t.chat.today}
          </span>
          <div className="flex-1 bg-white/[0.07] h-px" />
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
            <div className="flex items-center gap-1.5 bg-[#1E2438] px-4 py-3 border border-white/[0.06] rounded-[20px_20px_20px_6px]">
              <span className="bg-white/40 rounded-full w-2 h-2 animate-bounce [animation-delay:0ms]" />
              <span className="bg-white/40 rounded-full w-2 h-2 animate-bounce [animation-delay:150ms]" />
              <span className="bg-white/40 rounded-full w-2 h-2 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onEnviar={handleEnviar} />
    </div>
  );
}
