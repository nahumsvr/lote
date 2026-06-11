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
  theme?: string;
}

export default function Map({ zones, center, theme }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const isDark = theme === "dark";

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView(center, 13);

    L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);
  }, [center]);

  useEffect(() => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    const tileUrl = isDark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    map.eachLayer((layer) => {
      if (layer instanceof L.Circle || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    const zoneColors = {
      tranquilo: {
        color: '#2ECC71',
        fillColor: isDark ? 'rgba(46, 204, 113, 0.15)' : 'rgba(46, 204, 113, 0.22)',
        label: isDark ? '#7FE0AC' : '#1E7A46'
      },
      monitorear: {
        color: '#F0B429',
        fillColor: isDark ? 'rgba(240, 180, 41, 0.17)' : 'rgba(240, 180, 41, 0.25)',
        label: isDark ? '#F0C566' : '#9C7016'
      },
      evitar: {
        color: '#D93030',
        fillColor: isDark ? 'rgba(217, 48, 48, 0.22)' : 'rgba(217, 48, 48, 0.28)',
        label: isDark ? '#EE8B86' : '#B52424'
      },
    };

    zones.forEach(zone => {
      const { color, fillColor, label: labelColor } = zoneColors[zone.status];

      L.circle([zone.lat, zone.lng], {
        color: color,
        fillColor: fillColor,
        fillOpacity: 1,
        radius: zone.radius,
        weight: 1.5,
      }).addTo(map);

      const icon = L.divIcon({
        className: 'custom-zone-label bg-transparent border-none',
        html: `
          <div class="flex items-center gap-[5px] whitespace-nowrap" style="transform: translate(-50%, -50%);">
            <span class="w-[6px] h-[6px] rounded-full" style="background:${color}; box-shadow:0 0 6px ${color};"></span>
            <span class="font-mono text-[9.5px] font-semibold tracking-[0.04em] drop-shadow-sm" style="color:${labelColor};">${zone.name}</span>
          </div>
        `,
        iconSize: [0, 0],
      });

      L.marker([zone.lat, zone.lng], { icon, interactive: false }).addTo(map);
    });

    const radarBg = isDark
      ? 'conic-gradient(from 0deg, transparent 70%, rgba(217,48,48,0.15) 100%)'
      : 'conic-gradient(from 0deg, transparent 70%, rgba(217,48,48,0.2) 100%)';

    const radarIcon = L.divIcon({
      className: 'bg-transparent border-none overflow-visible',
      html: `<div class="w-[520px] h-[520px] rounded-full animate-mapSweep" style="background: ${radarBg}; mask-image: radial-gradient(circle, #000 0%, rgba(0,0,0,0.6) 42%, transparent 70%); -webkit-mask-image: radial-gradient(circle, #000 0%, rgba(0,0,0,0.6) 42%, transparent 70%);"></div>`,
      iconSize: [520, 520],
      iconAnchor: [260, 260],
    });
    L.marker(center, { icon: radarIcon, interactive: false, zIndexOffset: -1000 }).addTo(map);

    const dotIcon = L.divIcon({
      className: 'bg-transparent border-none overflow-visible',
      html: `
        <div class="animate-mapFloat" style="position:absolute; left:0; top:0;">
          <span class="animate-mapRing" style="position:absolute; left:-11px; top:-11px; display:block; width:22px; height:22px; border-radius:9999px; background:rgba(217, 48, 48, 0.2);"></span>
          <span style="position:absolute; left:-9px; top:-9px; display:block; width:18px; height:18px; border-radius:9999px; background:#D93030; border:3px solid ${isDark ? '#13172A' : '#FFFFFF'}; box-shadow:0 0 0 2px #D93030,0 4px 10px rgba(0,0,0,0.3);"></span>
          <span style="position:absolute; top:15px; left:0; transform:translateX(-50%); font-family:var(--font-geist-mono),monospace; font-size:9.5px; font-weight:700; letter-spacing:0.05em; color:${isDark ? '#F4B8A8' : '#B52424'}; white-space:nowrap; text-shadow: ${isDark ? '0 1px 4px rgba(0,0,0,0.9)' : '0 1px 2px rgba(255,255,255,0.8)'};">TÚ · ROMA NORTE</span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
    L.marker(center, { icon: dotIcon, interactive: false }).addTo(map);

  }, [zones, center, theme, isDark]);

  return (
    <div className="absolute inset-0 bg-[var(--color-bg)] overflow-hidden border-y border-black/5 dark:border-white/10 transition-colors duration-300">
      {/* Contenedor Ref donde Leaflet se ancla */}
      <div ref={mapRef} className="absolute inset-0 z-10" />
    </div>
  );
}