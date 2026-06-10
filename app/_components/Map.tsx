"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
    
    zones.forEach(zone => {
      let color = 'var(--z-green-dot)';
      let fillColor = 'var(--z-green-fill)';
      let labelColor = 'var(--z-green-label)';
      
      if (zone.status === 'monitorear') {
        color = 'var(--z-yellow-dot)';
        fillColor = 'var(--z-yellow-fill)';
        labelColor = 'var(--z-yellow-label)';
      } else if (zone.status === 'evitar') {
        color = 'var(--z-red-dot)';
        fillColor = 'var(--z-red-fill)';
        labelColor = 'var(--z-red-label)';
      }

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

    // Draw user location
    const youIcon = L.divIcon({
      className: 'bg-transparent border-none',
      html: `
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-mapFloat">
          <span class="absolute left-1/2 top-1/2 w-[22px] h-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-soft)] animate-mapRing"></span>
          <span class="relative block w-[18px] h-[18px] rounded-full bg-[var(--accent2)] border-[3px] border-[#13172A] shadow-[0_0_0_2px_var(--accent2),0_4px_10px_rgba(0,0,0,0.5)]"></span>
          <span class="absolute top-[24px] left-1/2 -translate-x-1/2 font-mono text-[9.5px] font-semibold tracking-[0.05em] text-[#F4B8A8] drop-shadow-md whitespace-nowrap">TÚ · ROMA NORTE</span>
        </div>
      `,
      iconSize: [0, 0]
    });
    L.marker(center, { icon: youIcon, interactive: false }).addTo(map);

  }, [zones, center]);

  return (
    <div className="relative w-full h-full bg-[var(--m-mapbg)] overflow-hidden border-y border-[var(--m-statbd)]">
      {/* Radar Overlay over the map but below leaflet controls */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none z-[400] animate-mapSweep" 
           style={{
             background: 'var(--m-radar)',
             maskImage: 'radial-gradient(circle, #000 0%, rgba(0,0,0,0.6) 42%, transparent 70%)',
             WebkitMaskImage: 'radial-gradient(circle, #000 0%, rgba(0,0,0,0.6) 42%, transparent 70%)'
           }}>
      </div>
      
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full z-10" />
    </div>
  );
}
