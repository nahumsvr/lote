"use client"

interface Zona {
    name: string
    lat: number
    lng: number
    status: "tranquilo" | "monitorear" | "evitar"
}

interface MapaZonaProps {
    zona: string
    lat: number
    lng: number
}

const ZONAS: Zona[] = [
    { name: "POLANCO", lat: 19.4336, lng: -99.1994, status: "tranquilo" },
    { name: "CENTRO", lat: 19.4326, lng: -99.1332, status: "evitar" },
    { name: "CONDESA", lat: 19.414, lng: -99.172, status: "tranquilo" },
    { name: "ROMA NORTE", lat: 19.419, lng: -99.159, status: "monitorear" },
    { name: "DOCTORES", lat: 19.4172, lng: -99.1466, status: "monitorear" },
    { name: "DEL VALLE", lat: 19.38, lng: -99.167, status: "tranquilo" },
    { name: "COYOACÁN", lat: 19.349, lng: -99.162, status: "tranquilo" },
]

const COLORES = {
    tranquilo: { fill: "rgba(46,204,113,0.25)", stroke: "#2ECC71" },
    monitorear: { fill: "rgba(240,180,41,0.25)", stroke: "#F0B429" },
    evitar: { fill: "rgba(217,48,48,0.35)", stroke: "#D93030" },
}

const CENTER_LAT = 19.41
const CENTER_LNG = -99.165
const SCALE = 1800

function proyectar(lat: number, lng: number, w: number, h: number) {
    const x = (lng - CENTER_LNG) * SCALE + w / 2
    const y = -(lat - CENTER_LAT) * SCALE + h / 2
    return { x, y }
}

export default function MapaZona({ zona, lat, lng }: MapaZonaProps) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    const W = 320
    const H = 160

    const target = proyectar(lat, lng, W, H)

    return (
        <div className="mt-3 rounded-xl overflow-hidden border border-white/[0.08]">
            <div className="relative w-full" style={{ height: "160px", background: "#0E1322" }}>
                <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
                    {/* Grid */}
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width={W} height={H} fill="url(#grid)" />

                    {/* Zonas */}
                    {ZONAS.map((z) => {
                        const pos = proyectar(z.lat, z.lng, W, H)
                        const col = COLORES[z.status]
                        const r = z.status === "evitar" ? 28 : 22
                        return (
                            <g key={z.name}>
                                <circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r={r}
                                    fill={col.fill}
                                    stroke={col.stroke}
                                    strokeWidth="1.5"
                                    opacity="0.9"
                                />
                                <text
                                    x={pos.x}
                                    y={pos.y + r + 10}
                                    textAnchor="middle"
                                    fill={col.stroke}
                                    fontSize="6"
                                    fontFamily="monospace"
                                    opacity="0.8"
                                >
                                    {z.name}
                                </text>
                            </g>
                        )
                    })}

                    {/* Pin de la zona consultada */}
                    <circle cx={target.x} cy={target.y} r="18" fill="rgba(217,48,48,0.15)" stroke="#D93030" strokeWidth="2" />
                    <circle cx={target.x} cy={target.y} r="5" fill="#D93030" />
                    <circle cx={target.x} cy={target.y} r="14" fill="none" stroke="rgba(217,48,48,0.5)" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-[#1E2438] border-t border-white/[0.06]">
                <span className="font-mono text-[10.5px] text-[#D6B85E]">{zona}</span>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D93030] text-white text-[11px] font-semibold">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7Z" />
                        <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    Ver en Google Maps
                </a>
            </div>
        </div>
    )
}