type Estado = "tranquilo" | "monitorear" | "evitar"

interface ZonaChipProps {
    zona: string
    estado: Estado
}

const colores: Record<Estado, string> = {
    tranquilo: "bg-[rgba(46,204,113,0.13)] border border-[rgba(46,204,113,0.4)] text-[#2ECC71]",
    monitorear: "bg-[rgba(240,180,41,0.14)] border border-[rgba(240,180,41,0.42)] text-[#F0B429]",
    evitar: "bg-[rgba(217,48,48,0.15)] border border-[rgba(217,48,48,0.45)] text-[#D93030]",
}

const dots: Record<Estado, string> = {
    tranquilo: "bg-[#2ECC71]",
    monitorear: "bg-[#F0B429]",
    evitar: "bg-[#D93030]",
}

export default function ZonaChip({ zona, estado }: ZonaChipProps) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] font-mono text-[10.5px] font-semibold tracking-wide ${colores[estado]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dots[estado]}`} />
            {zona.toUpperCase()}
        </span>
    )
}