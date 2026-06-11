"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

interface ZoneProps {
  name: string;
  lat: number;
  lng: number;
  radius: number;
  status: "tranquilo" | "monitorear" | "evitar";
}

interface MapProps {
  zones: ZoneProps[];
  center: [number, number];
}

export default function Map({ zones, center }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView(center, 13);

      // CartoDB Dark Matter tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstance.current);

      L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);
    }
    
    const map = mapInstance.current;
    
    // Clear existing markers/circles if updating
    map.eachLayer((layer) => {
      if (layer instanceof L.Circle || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    
    const zoneColors = {
      tranquilo: { color: '#2ECC71', fillColor: 'rgba(46, 204, 113, 0.15)', stroke: 'rgba(46, 204, 113, 0.5)', label: '#7FE0AC' },
      monitorear: { color: '#F0B429', fillColor: 'rgba(240, 180, 41, 0.17)', stroke: 'rgba(240, 180, 41, 0.6)', label: '#F0C566' },
      evitar:     { color: '#D93030', fillColor: 'rgba(217, 48, 48, 0.22)',  stroke: 'rgba(217, 48, 48, 0.7)',  label: '#EE8B86' },
    };

    zones.forEach(zone => {
      const { color, fillColor, label: labelColor } = zoneColors[zone.status];

      // Draw the zone
      L.circle([zone.lat, zone.lng], {
        color: color,
        fillColor: fillColor,
        fillOpacity: 1,
        radius: zone.radius,
        weight: 1.5,
      }).addTo(map);

      // Draw the label
      const icon = L.divIcon({
        className: 'custom-zone-label bg-transparent border-none',
        html: `
          <div class="flex items-center gap-[5px] whitespace-nowrap" style="transform: translate(-50%, -50%);">
            <span class="w-[6px] h-[6px] rounded-full" style="background:${color}; box-shadow:0 0 6px ${color};"></span>
            <span class="font-mono text-[9.5px] font-medium tracking-[0.04em] drop-shadow-md" style="color:${labelColor};">${zone.name}</span>
          </div>
        `,
        iconSize: [0, 0],
      });

      L.marker([zone.lat, zone.lng], { icon, interactive: false }).addTo(map);
    });

    // Draw user location — radar in its own marker so Leaflet positions it correctly
    const radarIcon = L.divIcon({
      className: 'bg-transparent border-none overflow-visible',
      html: `<div class="w-[520px] h-[520px] rounded-full animate-mapSweep" style="background: var(--m-radar); mask-image: radial-gradient(circle, #000 0%, rgba(0,0,0,0.6) 42%, transparent 70%); -webkit-mask-image: radial-gradient(circle, #000 0%, rgba(0,0,0,0.6) 42%, transparent 70%);"></div>`,
      iconSize: [520, 520],
      iconAnchor: [260, 260],
    });
    L.marker(center, { icon: radarIcon, interactive: false, zIndexOffset: -1000 }).addTo(map);

    // Dot + ring + label marker
    const dotIcon = L.divIcon({
      className: 'bg-transparent border-none overflow-visible',
      html: `
        <div class="animate-mapFloat" style="position:absolute; left:0; top:0;">
          <span class="animate-mapRing" style="position:absolute; left:-11px; top:-11px; display:block; width:22px; height:22px; border-radius:9999px; background:var(--accent-soft);"></span>
          <span style="position:absolute; left:-9px; top:-9px; display:block; width:18px; height:18px; border-radius:9999px; background:var(--accent2); border:3px solid #13172A; box-shadow:0 0 0 2px var(--accent2),0 4px 10px rgba(0,0,0,0.5);"></span>
          <span style="position:absolute; top:15px; left:0; transform:translateX(-50%); font-family:var(--font-geist-mono),monospace; font-size:9.5px; font-weight:600; letter-spacing:0.05em; color:#F4B8A8; white-space:nowrap; text-shadow: 0 1px 4px rgba(0,0,0,0.9);">TÚ · ROMA NORTE</span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
    L.marker(center, { icon: dotIcon, interactive: false }).addTo(map);

  }, [zones, center]);

  return (
    <div className="absolute inset-0 bg-[var(--m-mapbg)] overflow-hidden border-y border-[var(--m-statbd)]">
      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0 z-10" />
    </div>
  );
}
