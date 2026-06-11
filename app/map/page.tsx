"use client";
import { useRef, useState, useEffect } from "react";
import MapWrapper from "./_components/MapWrapper";
import { Signal, ChevronDown } from "lucide-react";

const MOCK_ZONES = [
  { name: "POLANCO", lat: 19.4336, lng: -99.1994, radius: 1200, status: "tranquilo" as const },
  { name: "CENTRO", lat: 19.4326, lng: -99.1332, radius: 1500, status: "evitar" as const },
  { name: "CONDESA", lat: 19.414, lng: -99.172, radius: 1100, status: "tranquilo" as const },
  { name: "ROMA NORTE", lat: 19.419, lng: -99.159, radius: 1300, status: "monitorear" as const },
  { name: "DOCTORES", lat: 19.4172, lng: -99.1466, radius: 1000, status: "monitorear" as const },
  { name: "DEL VALLE", lat: 19.38, lng: -99.167, radius: 1400, status: "tranquilo" as const },
  { name: "COYOACÁN", lat: 19.349, lng: -99.162, radius: 1600, status: "tranquilo" as const },
];

const ALERTS = [
  {
    id: 1,
    kind: "evitar",
    label: "EVITAR · CENTRO HISTÓRICO",
    time: "hace 4 min",
    sources: "6 fuentes",
    cta: "Ver ruta segura",
    body: 'Aguas con el Centro — hay marcha en <b class="font-semibold">5 de Febrero</b> y el acceso al Zócalo está cerrado por el norte. Mejor déjalo para mañana.',
  },
  {
    id: 2,
    kind: "monitorear",
    label: "MONITOREAR · DOCTORES",
    time: "hace 12 min",
    sources: "4 fuentes",
    cta: "Ver detalles",
    body: 'Cierre de carril en <b class="font-semibold">Eje Central</b> por un evento. No es riesgo, pero tu Uber puede tardar. Tenlo en cuenta si vas con prisa.',
  },
  {
    id: 3,
    kind: "monitorear",
    label: "MONITOREAR · REFORMA",
    time: "hace 9 min",
    sources: "3 fuentes",
    cta: "Ver detalles",
    body: 'Se está juntando gente en el <b class="font-semibold">Ángel</b> por la previa del partido. Tranquilo por ahora, pero ojo si llevas niños.',
  },
];

const MAP_CENTER: [number, number] = [19.419, -99.159];

export default function MapaPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showCarousel, setShowCarousel] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const idx = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIdx(idx);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="z-10 relative flex flex-col flex-1 mx-auto w-full max-w-md">
      {/* Header */}
      <div className="relative px-6 pt-6 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-extrabold text-[var(--color-text)] text-3xl leading-none tracking-tight">
              CDMX <span className="text-[var(--color-accent)]">ahora</span>
            </div>
          </div>
          {/* Tag EN VIVO Dinámica */}
          <div className="flex items-center gap-[7px] bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1.5 border border-emerald-500/30 rounded-full">
            <span className="bg-emerald-500 rounded-full w-[7px] h-[7px] animate-pulse"></span>
            <span className="font-mono font-medium text-[10.5px] text-emerald-600 dark:text-emerald-400 tracking-[0.08em]">
              EN VIVO
            </span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 min-h-[280px]">
        <div className="absolute inset-0">
          <MapWrapper zones={MOCK_ZONES} center={MAP_CENTER} />
        </div>

        {/* Stats — Flotante de Cristal Líquido Dinámico */}
        <div
          className="top-[14px] right-[14px] left-[12px] z-[500] absolute grid grid-cols-4 px-[6px] py-[10px] border border-black/5 dark:border-white/10 rounded-[16px] bg-[var(--color-surface)]/80 dark:bg-[#13172A]/70 backdrop-blur-xl shadow-lg"
        >
          <Stat count="4" label="SEGURAS" color="text-emerald-500" />
          <Stat count="2" label="MONITOREAR" color="text-amber-500" />
          <Stat count="1" label="EVITAR" color="text-[var(--color-primary)]" />
          <Stat count="14" label="REPORTES" color="text-amber-600 dark:text-[var(--color-accent)]" />
        </div>

        {/* Alert Carousel — Se adapta al tema claro/oscuro automáticamente */}
        <div
          className="bottom-[12px] left-[12px] right-[12px] z-[500] absolute rounded-[22px] border border-black/5 dark:border-white/10 bg-[var(--color-surface)]/95 dark:bg-[#13172A]/85 backdrop-blur-2xl shadow-xl transition-all duration-300"
          style={{
            transform: showCarousel ? "translateY(0)" : "translateY(110%)",
            opacity: showCarousel ? 1 : 0,
            pointerEvents: showCarousel ? "auto" : "none",
          }}
        >
          {/* Handle para colapsar */}
          <button
            onClick={() => setShowCarousel(false)}
            className="flex justify-center items-center pt-[9px] pb-[6px] w-full cursor-pointer border-none bg-transparent"
          >
            <span className="bg-black/10 dark:bg-white/20 rounded-full w-[34px] h-[4px]" />
          </button>

          {/* CSS Scroll Snap Carousel */}
          <div
            ref={scrollRef}
            className="flex pb-2 overflow-x-auto snap-mandatory snap-x scrollbar-none"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {ALERTS.map((alert, i) => (
              <div
                key={alert.id}
                className="flex-[0_0_100%] px-[18px] pb-[6px] min-w-full"
                style={{
                  scrollSnapAlign: "center",
                  transform: activeIdx === i ? "scale(1)" : "scale(0.97)",
                  opacity: activeIdx === i ? 1 : 0.55,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              >
                <div className="flex justify-between items-center mb-[9px]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full animate-pulse ${alert.kind === "evitar" ? "bg-[#D93030] shadow-[0_0_8px_#D93030]" : "bg-[#F0B429] shadow-[0_0_8px_#F0B429]"}`}
                    ></span>
                    <span
                      className={`font-mono text-[10px] font-semibold tracking-[0.09em] ${alert.kind === "evitar" ? "text-[#D93030]" : "text-amber-600 dark:text-[#F0B429]"}`}
                    >
                      {alert.label}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--color-text-secondary)]">
                    {alert.time}
                  </span>
                </div>
                <div
                  className="text-[14.5px] text-[var(--color-text)] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: alert.body }}
                />
                <div className="flex justify-between items-center mt-[13px]">
                  <div className="flex items-center gap-[7px] font-mono text-[10.5px] text-[var(--color-text-secondary)]">
                    <Signal size={13} className="text-amber-500" />
                    <span>
                      <b className="font-semibold text-amber-600 dark:text-amber-400">
                        {alert.sources}
                      </b>{" "}
                      confirman
                    </span>
                  </div>
                  <button
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-semibold cursor-pointer border-none transition-transform active:scale-95 ${alert.kind === "evitar"
                      ? "bg-[#D93030] text-white hover:bg-[#b52424]"
                      : "bg-[#F0B429] text-[#13172A] hover:bg-[#d49d1c]"
                      }`}
                  >
                    {alert.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores de Puntos */}
          <div className="flex justify-center items-center gap-[6px] pt-[4px] pb-[10px]">
            {ALERTS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollRef.current?.scrollTo({
                    left: scrollRef.current.offsetWidth * i,
                    behavior: "smooth",
                  });
                }}
                className="p-0 border-0 cursor-pointer h-[6px] rounded-full transition-all duration-300"
                style={{
                  width: activeIdx === i ? "18px" : "6px",
                  background:
                    activeIdx === i
                      ? ALERTS[i].kind === "evitar"
                        ? "#D93030"
                        : "#F0B429"
                      : "rgba(128,128,128,0.3)",
                }}
              />
            ))}
          </div>
        </div>

        {/* FAB — Restaurar carrusel */}
        <button
          onClick={() => setShowCarousel(true)}
          className="bottom-[20px] left-1/2 z-[500] absolute flex justify-center items-center rounded-full w-11 h-11 border border-black/10 dark:border-white/14 bg-[var(--color-surface)]/90 dark:bg-[#13172A]/90 backdrop-blur-md shadow-md cursor-pointer transition-all duration-300"
          style={{
            transform: showCarousel
              ? "translateX(-50%) scale(0.6)"
              : "translateX(-50%) scale(1)",
            opacity: showCarousel ? 0 : 1,
            pointerEvents: showCarousel ? "none" : "auto",
          }}
        >
          <ChevronDown
            size={18}
            className="rotate-180 text-[var(--color-text)]"
          />
        </button>

      </div>
    </main>
  );
}

function Stat({
  count,
  label,
  color,
}: {
  count: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-[3px] border-black/5 dark:border-white/10 last:border-0 border-r">
      <div className="flex items-baseline gap-1.5">
        <span className={`font-extrabold text-[25px] leading-none ${color}`}>
          {count}
        </span>
      </div>
      <span className="font-mono text-[8.5px] text-[var(--color-text-secondary)] tracking-[0.06em]">
        {label}
      </span>
    </div>
  );
}