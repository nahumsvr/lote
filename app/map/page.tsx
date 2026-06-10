"use client";
import { useRef, useState, useEffect } from "react";
import MapWrapper from "./_components/MapWrapper";
import { Signal, Compass } from "lucide-react";

const MOCK_ZONES = [
  {
    name: "POLANCO",
    lat: 19.4336,
    lng: -99.1994,
    radius: 1200,
    status: "tranquilo" as const,
  },
  {
    name: "CENTRO",
    lat: 19.4326,
    lng: -99.1332,
    radius: 1500,
    status: "evitar" as const,
  },
  {
    name: "CONDESA",
    lat: 19.414,
    lng: -99.172,
    radius: 1100,
    status: "tranquilo" as const,
  },
  {
    name: "ROMA NORTE",
    lat: 19.419,
    lng: -99.159,
    radius: 1300,
    status: "monitorear" as const,
  },
  {
    name: "DOCTORES",
    lat: 19.4172,
    lng: -99.1466,
    radius: 1000,
    status: "monitorear" as const,
  },
  {
    name: "DEL VALLE",
    lat: 19.38,
    lng: -99.167,
    radius: 1400,
    status: "tranquilo" as const,
  },
  {
    name: "COYOACÁN",
    lat: 19.349,
    lng: -99.162,
    radius: 1600,
    status: "tranquilo" as const,
  },
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

export default function MapaPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(i);
        },
        { root: scrollRef.current, threshold: 0.6 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main className="z-10 relative flex flex-col flex-1 mx-auto w-full max-w-md">
      {/* Header */}
      <div className="relative px-6 pt-6 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-extrabold text-[var(--text)] text-3xl leading-none tracking-tight">
              CDMX <span className="text-[var(--accent)]">ahora</span>
            </div>
          </div>
          <div className="flex items-center gap-[7px] bg-[rgba(46,204,113,0.1)] px-3 py-1.5 border border-[rgba(46,204,113,0.4)] rounded-full">
            <span className="bg-[var(--green)] rounded-full w-[7px] h-[7px] animate-pulseDot"></span>
            <span className="font-mono font-medium text-[10.5px] text-[var(--greenT)] tracking-[0.08em]">
              EN VIVO
            </span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 min-h-[280px]">
        <div className="absolute inset-0">
          <MapWrapper zones={MOCK_ZONES} center={[19.419, -99.159]} />
        </div>

        {/* Stats — floating liquid glass panel, top of map */}
        <div
          className="top-[14px] right-[14px] left-[12px] z-[500] absolute grid grid-cols-4 px-[6px] py-[10px] border border-[var(--m-glassbd)] rounded-[16px]"
          style={{
            background: "rgba(19, 23, 42, 0.62)",
            backdropFilter: "blur(18px) saturate(1.4)",
            WebkitBackdropFilter: "blur(18px) saturate(1.4)",
            boxShadow:
              "0 4px 24px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          <Stat count="4" label="SEGURAS" color="var(--z-green-label)" />
          <Stat count="2" label="MONITOREAR" color="var(--z-yellow-label)" />
          <Stat count="1" label="EVITAR" color="var(--redT)" />
          <Stat count="14" label="REPORTES" color="var(--gold)" />
        </div>

        {/* Alert Carousel — floating liquid glass panel, bottom of map */}
        <div
          className="bottom-[12px] left-[12px] right-[12px] z-[500] absolute rounded-[22px] overflow-hidden border border-[var(--m-glassbd)]"
          style={{
            background: "rgba(19, 23, 42, 0.72)",
            backdropFilter: "blur(22px) saturate(1.5)",
            WebkitBackdropFilter: "blur(22px) saturate(1.5)",
            boxShadow: "0 8px 32px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex justify-center pt-[9px] pb-[6px]">
            <span className="bg-[var(--m-handle)] rounded-full w-[34px] h-[4px]"></span>
          </div>

          {/* CSS Scroll Snap Carousel */}
          <div
            ref={scrollRef}
            className="flex pb-2 overflow-x-auto snap-mandatory snap-x scrollbar-none"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {ALERTS.map((alert, i) => (
              <div
                key={alert.id}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
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
                      className={`w-2 h-2 rounded-full animate-pulseDot ${alert.kind === "evitar" ? "bg-[#D93030] shadow-[0_0_8px_#D93030]" : "bg-[#F0B429] shadow-[0_0_8px_#F0B429]"}`}
                    ></span>
                    <span
                      className={`font-mono text-[10px] font-semibold tracking-[0.09em] ${alert.kind === "evitar" ? "text-[var(--redT)]" : "text-[var(--gold)]"}`}
                    >
                      {alert.label}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--faint)]">
                    {alert.time}
                  </span>
                </div>
                <div
                  className="text-[14.5px] text-[var(--text)] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: alert.body }}
                />
                <div className="flex justify-between items-center mt-[13px]">
                  <div className="flex items-center gap-[7px] font-mono text-[10.5px] text-[var(--mute)]">
                    <Signal size={13} className="text-[var(--gold)]" />
                    <span>
                      <b className="font-normal text-[var(--gold)]">
                        {alert.sources}
                      </b>{" "}
                      confirman
                    </span>
                  </div>
                  <button
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-semibold ${
                      alert.kind === "evitar"
                        ? "bg-[#D93030] text-white"
                        : "bg-[#F0B429] text-[#13172A]"
                    }`}
                  >
                    {alert.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
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
                style={{
                  width: activeIdx === i ? "18px" : "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  background:
                    activeIdx === i
                      ? ALERTS[i].kind === "evitar"
                        ? "#D93030"
                        : "#F0B429"
                      : "var(--m-handle)",
                  transition: "width 0.3s ease, background 0.3s ease",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
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
    <div className="flex flex-col items-center gap-[3px] border-[var(--m-statbd)] last:border-0 border-r">
      <div className="flex items-baseline gap-1.5">
        <span
          className="font-extrabold text-[25px] leading-none"
          style={{ color: color }}
        >
          {count}
        </span>
      </div>
      <span className="font-mono text-[8.5px] text-[var(--mute)] tracking-[0.06em]">
        {label}
      </span>
    </div>
  );
}
