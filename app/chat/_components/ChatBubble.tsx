"use client"

import { useTranslation } from "@/lib/i18n/context"
import ZonaChip from "./ZonaChip"
import MapaInteractivo from "./MapaInteractivo"

type Estado = "tranquilo" | "monitorear" | "evitar"

interface ChatBubbleProps {
    mensaje: string
    esUsuario: boolean
    fuentes?: number
    tiempo?: string
    chips?: { zona: string; estado: Estado }[]
    mapa?: { zona: string; lat: number; lng: number }
}

export default function ChatBubble({
    mensaje,
    esUsuario,
    fuentes,
    tiempo,
    chips,
    mapa,
}: ChatBubbleProps) {
    const t = useTranslation()

    return (
        <div className={`flex flex-col gap-1 ${esUsuario ? "self-end items-end max-w-[82%]" : "self-start items-start max-w-[88%] min-w-0"}`}>
            <div
                className={`px-4 py-3 text-[13.5px] leading-relaxed w-full transition-all duration-300 ${esUsuario
                    ? "bg-[#D93030] text-white rounded-[20px_20px_6px_20px]"
                    : "bg-[var(--color-surface)] dark:bg-[#1E2438] text-[var(--color-text)] border border-black/5 dark:border-white/[0.06] rounded-[20px_20px_20px_6px]"
                    }`}
            >
                <span className="whitespace-pre-line">{mensaje}</span>

                {mapa && <MapaInteractivo zona={mapa.zona} lat={mapa.lat} lng={mapa.lng} />}
                {chips && chips.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {chips.map((chip, i) => (
                            <ZonaChip key={i} zona={chip.zona} estado={chip.estado} />
                        ))}
                    </div>
                )}
            </div>
            {!esUsuario && (fuentes || tiempo) && (
                <div className="font-mono text-[9.5px] text-black/40 dark:text-white/35 px-1 transition-colors duration-300">
                    {fuentes ? <span className="text-amber-600 dark:text-[#C8A84B] font-medium">{fuentes} {t.chat.sources}</span> : null}
                    {fuentes && tiempo && <span className="mx-1 opacity-50">·</span>}
                    {tiempo && <span>{tiempo}</span>}
                </div>
            )}
        </div>
    )
}