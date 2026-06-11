"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

interface Zona {
    name: string
    lat: number
    lng: number
    status: "tranquilo" | "monitorear" | "evitar"
}

interface MapaInteractivoProps {
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
    tranquilo: { color: "#2ECC71", fillOpacity: 0.2 },
    monitorear: { color: "#F0B429", fillOpacity: 0.25 },
    evitar: { color: "#D93030", fillOpacity: 0.3 },
}

export default function MapaInteractivo({ zona, lat, lng }: MapaInteractivoProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<unknown>(null)
    const tileLayerRef = useRef<unknown>(null)
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return

        import("leaflet").then((L) => {
            if (!mapRef.current || mapInstanceRef.current) return

            const map = L.map(mapRef.current, {
                center: [lat, lng],
                zoom: 13,
                zoomControl: true,
                scrollWheelZoom: false,
                attributionControl: false,
            })

            mapInstanceRef.current = map

            const isDark = document.documentElement.classList.contains("dark");
            const getTileUrl = (dark: boolean) => dark
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

            const tiles = L.tileLayer(getTileUrl(isDark), {
                attribution: "©OpenStreetMap ©CartoDB",
                maxZoom: 19,
            }).addTo(map)

            tileLayerRef.current = tiles

            const observer = new MutationObserver(() => {
                const currentlyDark = document.documentElement.classList.contains("dark");
                if (tileLayerRef.current) {
                    (tileLayerRef.current as any).setUrl(getTileUrl(currentlyDark));
                }
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

            ZONAS.forEach((z) => {
                const col = COLORES[z.status]
                L.circle([z.lat, z.lng], {
                    radius: 800,
                    color: col.color,
                    fillColor: col.color,
                    fillOpacity: col.fillOpacity,
                    weight: 1.5,
                })
                    .bindTooltip(z.name, {
                        permanent: true,
                        direction: "center",
                        className: "lote-tooltip",
                    })
                    .addTo(map)
            })

            const pinIcon = L.divIcon({
                html: `<div style="width:14px;height:14px;border-radius:50%;background:#D93030;border:3px solid white;box-shadow:0 0 8px rgba(217,48,48,0.8);"></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7],
                className: "",
            })

            L.marker([lat, lng], { icon: pinIcon })
                .bindPopup(`<b style="color:#D93030">${zona}</b>`)
                .addTo(map)
        })

        return () => {
            if (mapInstanceRef.current) {
                ; (mapInstanceRef.current as { remove: () => void }).remove()
                mapInstanceRef.current = null
            }
        }
    }, [lat, lng, zona])

    return (
        <div className="mt-3 rounded-xl overflow-hidden border border-black/10 dark:border-white/[0.08] transition-colors duration-300">
            {/* 🎯 Ajustes de CSS en línea para que los tooltips se adapten al tema oscuro/claro */}
            <style>{`
                .lote-tooltip {
                    background: rgba(255,255,255,0.9);
                    border: 1px solid rgba(0,0,0,0.1);
                    color: #333;
                    font-family: monospace;
                    font-size: 9px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    padding: 2px 6px;
                    border-radius: 4px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .dark .lote-tooltip {
                    background: rgba(19,23,42,0.85);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(244,242,238,0.8);
                    box-shadow: none;
                }
                .lote-tooltip::before { display: none; }
                .leaflet-container { background: #E5E7EB; }
                .dark .leaflet-container { background: #0E1322; }
            `}</style>

            <div ref={mapRef} style={{ height: "180px", width: "100%" }} />

            <div className="flex items-center justify-between px-3 py-2 bg-[var(--color-surface)] dark:bg-[#1E2438] border-t border-black/5 dark:border-white/[0.06] transition-colors duration-300">
                <span className="font-mono text-[10.5px] text-amber-600 dark:text-[#D6B85E] transition-colors duration-300">{zona}</span>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D93030] hover:bg-[#b82525] text-white text-[11px] font-semibold transition-colors duration-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7Z" />
                        <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    Ver en Google Maps
                </a>
            </div>
        </div>
    )
}