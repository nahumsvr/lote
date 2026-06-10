"use client"

import { useState } from "react"
import ChatBubble from "./_components/ChatBubble"
import ChatInput from "./_components/ChatInput"

interface Chip {
    zona: string
    estado: "tranquilo" | "monitorear" | "evitar"
}

interface Mapa {
    zona: string
    lat: number
    lng: number
}

interface Mensaje {
    id: number
    texto: string
    esUsuario: boolean
    fuentes?: number
    tiempo?: string
    chips?: Chip[]
    mapa?: Mapa
}

const RESPUESTAS: Record<string, {
    texto: string
    fuentes: number
    chips: Chip[]
    mapa?: Mapa
}> = {
    zocalo: {
        texto: "Hay una marcha estudiantil activa en el Centro Histórico desde hace 40 min. El acceso al Zócalo está bloqueado por el norte. Te recomiendo evitarlo por ahora.",
        fuentes: 6,
        chips: [
            { zona: "Zócalo · Evitar", estado: "evitar" },
            { zona: "Eje Central · Libre", estado: "tranquilo" },
        ],
        mapa: { zona: "Zócalo · Centro Histórico", lat: 19.4326, lng: -99.1332 },
    },
    coyoacan: {
        texto: "Coyoacán está tranquilo. Sin reportes en las últimas 2 horas — buena opción para cenar con la familia.\n\nAguas al pasar por Doctores si vas en coche, hay algo moviéndose ahí.",
        fuentes: 3,
        chips: [
            { zona: "Coyoacán · Tranquilo", estado: "tranquilo" },
            { zona: "Doctores · Monitorear", estado: "monitorear" },
        ],
        mapa: { zona: "Coyoacán", lat: 19.349, lng: -99.162 },
    },
    roma: {
        texto: "Roma Norte está tranquila ahorita. Circulación normal. Eso sí, evita Álvaro Obregón después de las 10pm — hay reportes de cierres por evento.",
        fuentes: 4,
        chips: [{ zona: "Roma Norte · Tranquilo", estado: "tranquilo" }],
        mapa: { zona: "Roma Norte", lat: 19.419, lng: -99.159 },
    },
    polanco: {
        texto: "Polanco sin novedad. Circulación normal en Presidente Masaryk. Buena zona para esta noche.",
        fuentes: 2,
        chips: [{ zona: "Polanco · Tranquilo", estado: "tranquilo" }],
        mapa: { zona: "Polanco", lat: 19.4336, lng: -99.1994 },
    },
    condesa: {
        texto: "Condesa tranquila. Ámsterdam y Tamaulipas despejadas. Es buena noche para salir por ahí.",
        fuentes: 3,
        chips: [{ zona: "Condesa · Tranquilo", estado: "tranquilo" }],
        mapa: { zona: "Condesa", lat: 19.414, lng: -99.172 },
    },
    tepito: {
        texto: "Tepito está en amarillo ahorita. Hay movimiento inusual reportado por 3 fuentes. No es crítico pero mejor no te aventures si no conoces la zona.",
        fuentes: 3,
        chips: [{ zona: "Tepito · Monitorear", estado: "monitorear" }],
        mapa: { zona: "Tepito", lat: 19.4428, lng: -99.1242 },
    },
    reforma: {
        texto: "Reforma está en monitoreo. Se está juntando gente cerca del Ángel por la previa del partido. Tranquilo por ahora pero ojo si llevas niños.",
        fuentes: 3,
        chips: [{ zona: "Reforma · Monitorear", estado: "monitorear" }],
        mapa: { zona: "Paseo de la Reforma", lat: 19.4269, lng: -99.1617 },
    },
    doctores: {
        texto: "Doctores en monitoreo. Cierre de carril en Eje Central por un evento. No es riesgo pero tu transporte puede tardar más.",
        fuentes: 4,
        chips: [{ zona: "Doctores · Monitorear", estado: "monitorear" }],
        mapa: { zona: "Doctores", lat: 19.4172, lng: -99.1466 },
    },
    seguro: {
        texto: "Las zonas más tranquilas ahorita son Polanco, Condesa, Roma Norte y Coyoacán. Sin reportes activos en las últimas 2 horas.",
        fuentes: 5,
        chips: [
            { zona: "Polanco · Tranquilo", estado: "tranquilo" },
            { zona: "Condesa · Tranquilo", estado: "tranquilo" },
            { zona: "Coyoacán · Tranquilo", estado: "tranquilo" },
        ],
    },
    default: {
        texto: "Déjame checar los reportes de tu rumbo ahorita mismo. Dame un segundo y te digo al chile cómo está la cosa.",
        fuentes: 0,
        chips: [],
    },
}

function obtenerRespuesta(texto: string) {
    const t = texto.toLowerCase()
    if (t.includes("zócalo") || t.includes("zocalo") || t.includes("centro histórico") || t.includes("centro historico")) return RESPUESTAS.zocalo
    if (t.includes("coyoacán") || t.includes("coyoacan")) return RESPUESTAS.coyoacan
    if (t.includes("roma")) return RESPUESTAS.roma
    if (t.includes("polanco")) return RESPUESTAS.polanco
    if (t.includes("condesa")) return RESPUESTAS.condesa
    if (t.includes("tepito")) return RESPUESTAS.tepito
    if (t.includes("reforma")) return RESPUESTAS.reforma
    if (t.includes("doctores")) return RESPUESTAS.doctores
    if (t.includes("segur") || t.includes("tranquil") || t.includes("recomienda") || t.includes("dónde") || t.includes("donde")) return RESPUESTAS.seguro
    return RESPUESTAS.default
}

const MENSAJES_INICIALES: Mensaje[] = [
    {
        id: 1,
        texto: "¿Puedo llevar a mi familia al Zócalo ahorita?",
        esUsuario: true,
    },
    {
        id: 2,
        texto: "Hay una marcha estudiantil activa en el Centro Histórico desde hace 40 min. El acceso al Zócalo está bloqueado por el norte. Te recomiendo evitarlo por ahora.",
        esUsuario: false,
        fuentes: 6,
        tiempo: "hace 4 min",
        chips: [
            { zona: "Zócalo · Evitar", estado: "evitar" },
            { zona: "Eje Central · Libre", estado: "tranquilo" },
        ],
        mapa: { zona: "Zócalo · Centro Histórico", lat: 19.4326, lng: -99.1332 },
    },
]

export default function ChatPage() {
    const [mensajes, setMensajes] = useState<Mensaje[]>(MENSAJES_INICIALES)
    const [cargando, setCargando] = useState(false)

    const handleEnviar = (texto: string) => {
        const nuevoMensaje: Mensaje = {
            id: Date.now(),
            texto,
            esUsuario: true,
        }
        setMensajes((prev) => [...prev, nuevoMensaje])
        setCargando(true)

        setTimeout(() => {
            const respuesta = obtenerRespuesta(texto)
            const mensajeLote: Mensaje = {
                id: Date.now() + 1,
                texto: respuesta.texto,
                esUsuario: false,
                fuentes: respuesta.fuentes || undefined,
                tiempo: "ahora",
                chips: respuesta.chips.length > 0 ? respuesta.chips : undefined,
                mapa: respuesta.mapa,
            }
            setMensajes((prev) => [...prev, mensajeLote])
            setCargando(false)
        }, 1200)
    }

    return (
        <div className="flex flex-col h-dvh bg-[#13172A] overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.07]">
                <div className="relative w-10 h-10 rounded-[13px] flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(150deg, #E8563A, #D93030)" }}>
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                        <g stroke="white" strokeWidth="2.4" strokeLinecap="round">
                            <path d="M15 18 8 13" /><path d="M14 23 6 22" /><path d="M15 28 8 32" />
                            <path d="M33 18 40 13" /><path d="M34 23 42 22" /><path d="M33 28 40 32" />
                        </g>
                        <ellipse cx="24" cy="24" rx="10.5" ry="11.5" fill="white" />
                        <circle cx="20" cy="23" r="1.6" fill="#D93030" />
                        <circle cx="28" cy="23" r="1.6" fill="#D93030" />
                        <path d="M21 28 Q24 30 27 28" stroke="#D93030" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[17px] text-[#F4F2EE] leading-tight">Lote</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse flex-shrink-0" />
                        <span className="text-[11.5px] text-white/55 truncate">monitoreando CDMX</span>
                    </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[rgba(214,184,94,0.1)] border border-[rgba(214,184,94,0.28)]">
                    <span className="font-mono font-bold text-[10.5px] text-[#D6B85E]">7</span>
                    <span className="font-mono text-[8.5px] text-[rgba(214,184,94,0.7)] leading-tight">ZONAS<br />ACTIVAS</span>
                </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                <div className="flex items-center gap-3 my-1">
                    <div className="flex-1 h-px bg-white/[0.07]" />
                    <span className="font-mono text-[9.5px] tracking-widest text-white/35">HOY · MAR 9 JUN</span>
                    <div className="flex-1 h-px bg-white/[0.07]" />
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
                        <div className="bg-[#1E2438] border border-white/[0.06] rounded-[20px_20px_20px_6px] px-4 py-3 flex gap-1.5 items-center">
                            <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:0ms]" />
                            <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:150ms]" />
                            <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:300ms]" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <ChatInput onEnviar={handleEnviar} />

            {/* Nav inferior */}
            <nav className="flex-shrink-0 grid grid-cols-4 px-2 pt-2 pb-6 bg-[rgba(19,23,42,0.9)] border-t border-white/[0.07]">
                <a href="/" className="flex flex-col items-center gap-1 text-white/35 text-[10.5px] font-medium">
                    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" />
                    </svg>
                    Mapa
                </a>
                <a href="/chat" className="relative flex flex-col items-center gap-1 text-[#D93030] text-[10.5px] font-semibold">
                    <span className="absolute -top-2.5 w-5 h-0.5 rounded-full bg-[#D93030]" />
                    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 5h16v11H10l-5 4v-4H4Z" />
                    </svg>
                    Chat
                </a>
                <a href="/zonas" className="flex flex-col items-center gap-1 text-white/35 text-[10.5px] font-medium">
                    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.9 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z" />
                    </svg>
                    Zonas
                </a>
                <a href="/config" className="flex flex-col items-center gap-1 text-white/35 text-[10.5px] font-medium">
                    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
                    </svg>
                    Config
                </a>
            </nav>

        </div>
    )
}