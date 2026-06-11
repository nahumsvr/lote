import ZonaChip from "./ZonaChip"
import MapaInteractivo from "./MapaInteractivo"

type Estado = "tranquilo" | "monitorear" | "evitar"

interface Chip {
    zona: string
    estado: Estado
}

interface Mapa {
    zona: string
    lat: number
    lng: number
}

interface ChatBubbleProps {
    mensaje: string
    esUsuario: boolean
    fuentes?: number
    tiempo?: string
    chips?: Chip[]
    mapa?: Mapa
}

export default function ChatBubble({
    mensaje,
    esUsuario,
    fuentes,
    tiempo,
    chips,
    mapa,
}: ChatBubbleProps) {
    return (
        <div className={`flex flex-col gap-1 ${esUsuario ? "self-end items-end max-w-[82%]" : "self-start items-start max-w-[88%] min-w-0"}`}>
            <div
                className={`px-4 py-3 text-[13.5px] leading-relaxed w-full ${esUsuario
                    ? "bg-[#D93030] text-white rounded-[20px_20px_6px_20px]"
                    : "bg-[#1E2438] text-[#F4F2EE] border border-white/[0.06] rounded-[20px_20px_20px_6px]"
                    }`}
            >
                {mensaje}
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
                <div className="font-mono text-[9.5px] text-white/35 px-1">
                    {fuentes && <span className="text-[#C8A84B]">{fuentes} fuentes</span>}
                    {fuentes && tiempo && <span className="mx-1 opacity-50">·</span>}
                    {tiempo && <span>{tiempo}</span>}
                </div>
            )}
        </div>
    )
}