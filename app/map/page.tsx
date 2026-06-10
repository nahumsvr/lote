"use client";
import { useRef, useState, useEffect } from "react";
import MapWrapper from "./_components/MapWrapper";
import { Signal, Compass } from "lucide-react";

const MOCK_ZONES = [
  { name: "POLANCO", lat: 19.4336, lng: -99.1994, radius: 1200, status: "tranquilo" as const },
  { name: "CENTRO", lat: 19.4326, lng: -99.1332, radius: 1500, status: "evitar" as const },
  { name: "CONDESA", lat: 19.4140, lng: -99.1720, radius: 1100, status: "tranquilo" as const },
  { name: "ROMA NORTE", lat: 19.4190, lng: -99.1590, radius: 1300, status: "monitorear" as const },
  { name: "DOCTORES", lat: 19.4172, lng: -99.1466, radius: 1000, status: "monitorear" as const },
  { name: "DEL VALLE", lat: 19.3800, lng: -99.1670, radius: 1400, status: "tranquilo" as const },
  { name: "COYOACÁN", lat: 19.3490, lng: -99.1620, radius: 1600, status: "tranquilo" as const },
];

const ALERTS = [
  { 
    id: 1, kind: 'evitar', label: 'EVITAR · CENTRO HISTÓRICO', time: 'hace 4 min', sources: '6 fuentes',
    cta: 'Ver ruta segura', 
    body: 'Aguas con el Centro — hay marcha en <b class="font-semibold">5 de Febrero</b> y el acceso al Zócalo está cerrado por el norte. Mejor déjalo para mañana.' 
  },
  { 
    id: 2, kind: 'monitorear', label: 'MONITOREAR · DOCTORES', time: 'hace 12 min', sources: '4 fuentes',
    cta: 'Ver detalles', 
    body: 'Cierre de carril en <b class="font-semibold">Eje Central</b> por un evento. No es riesgo, pero tu Uber puede tardar. Tenlo en cuenta si vas con prisa.' 
  },
  { 
    id: 3, kind: 'monitorear', label: 'MONITOREAR · REFORMA', time: 'hace 9 min', sources: '3 fuentes',
    cta: 'Ver detalles', 
    body: 'Se está juntando gente en el <b class="font-semibold">Ángel</b> por la previa del partido. Tranquilo por ahora, pero ojo si llevas niños.' 
  }
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
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(i); },
        { root: scrollRef.current, threshold: 0.6 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main className="flex-1 flex flex-col relative z-10 w-full max-w-md mx-auto">
      
      {/* Header */}
      <div className="relative px-6 pt-6 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-extrabold text-3xl tracking-tight leading-none text-[var(--text)]">
              CDMX <span className="text-[var(--accent)]">ahora</span>
            </div>
            <div className="font-mono text-[11.5px] text-[var(--gold)] mt-[7px] tracking-[0.01em]">
              19.4326° N · 99.1332° W
            </div>
          </div>
          <div className="flex items-center gap-[7px] px-3 py-1.5 rounded-full bg-[rgba(46,204,113,0.1)] border border-[rgba(46,204,113,0.4)]">
            <span className="w-[7px] h-[7px] rounded-full bg-[var(--green)] animate-pulseDot"></span>
            <span className="font-mono text-[10.5px] font-medium tracking-[0.08em] text-[var(--greenT)]">EN VIVO</span>
          </div>
        </div>
        <div className="text-[13.5px] leading-relaxed text-[var(--mute)] mt-3">
          Todo tranquilo por tu rumbo. Hay <span className="text-[var(--redT)] font-semibold">1 zona</span> que mejor evitas esta noche.
        </div>
      </div>

      {/* Map Container */}
      <div className="relative flex-1 min-h-[280px]">
        <div className="absolute inset-0">
          <MapWrapper zones={MOCK_ZONES} center={[19.4190, -99.1590]} />
        </div>
        
        {/* Compass floating above map */}
        <div className="absolute top-[14px] left-[16px] w-[34px] h-[34px] rounded-full bg-[var(--m-glass)] border border-[var(--m-glassbd)] backdrop-blur-md flex items-center justify-center z-[500]">
          <Compass size={17} className="text-[var(--accent)] -rotate-45" strokeWidth={2} />
        </div>
      </div>

      {/* Stats */}
      <div className="relative grid grid-cols-4 py-4 px-[6px] border-b border-[var(--m-statbd)]">
        <Stat count="4" label="SEGURAS" color="var(--stat-green)" />
        <Stat count="2" label="MONITOREAR" color="var(--stat-yellow)" />
        <Stat count="1" label="EVITAR" color="var(--red)" />
        <Stat count="14" label="REPORTES" color="var(--gold)" />
      </div>

      {/* Alert Carousel */}
      <div className="relative flex-shrink-0 m-[9px_12px] rounded-[22px] bg-[var(--m-alertbg)] border border-[var(--m-alertbd)] overflow-hidden shadow-[var(--m-alertsh)]">
        <div className="flex justify-center pt-[9px] pb-[6px]">
          <span className="w-[34px] h-[4px] rounded-full bg-[var(--m-handle)]"></span>
        </div>
        
        {/* CSS Scroll Snap Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {ALERTS.map((alert, i) => (
            <div
              key={alert.id}
              ref={(el) => { slideRefs.current[i] = el; }}
              className="flex-[0_0_100%] min-w-full px-[18px] pb-[6px]"
              style={{
                scrollSnapAlign: 'center',
                transform: activeIdx === i ? 'scale(1)' : 'scale(0.97)',
                opacity: activeIdx === i ? 1 : 0.55,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
              }}
            >
              <div className="flex items-center justify-between mb-[9px]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-pulseDot ${alert.kind === 'evitar' ? 'bg-[#D93030] shadow-[0_0_8px_#D93030]' : 'bg-[#F0B429] shadow-[0_0_8px_#F0B429]'}`}></span>
                  <span className={`font-mono text-[10px] font-semibold tracking-[0.09em] ${alert.kind === 'evitar' ? 'text-[var(--redT)]' : 'text-[var(--gold)]'}`}>
                    {alert.label}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--faint)]">{alert.time}</span>
              </div>
              <div className="text-[14.5px] leading-relaxed text-[var(--text)]" dangerouslySetInnerHTML={{ __html: alert.body }} />
              <div className="flex items-center justify-between mt-[13px]">
                <div className="flex items-center gap-[7px] font-mono text-[10.5px] text-[var(--mute)]">
                  <Signal size={13} className="text-[var(--gold)]" />
                  <span><b className="text-[var(--gold)] font-normal">{alert.sources}</b> confirman</span>
                </div>
                <button className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-semibold ${
                  alert.kind === 'evitar' ? 'bg-[#D93030] text-white' : 'bg-[#F0B429] text-[#13172A]'
                }`}>
                  {alert.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-[6px] pb-[10px] pt-[4px]">
          {ALERTS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                scrollRef.current?.scrollTo({ left: scrollRef.current.offsetWidth * i, behavior: 'smooth' });
              }}
              style={{
                width: activeIdx === i ? '18px' : '6px',
                height: '6px',
                borderRadius: '9999px',
                background: activeIdx === i
                  ? (ALERTS[i].kind === 'evitar' ? '#D93030' : '#F0B429')
                  : 'var(--m-handle)',
                transition: 'width 0.3s ease, background 0.3s ease',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>

    </main>
  );
}

function Stat({ count, label, color }: { count: string, label: string, color: string }) {
  return (
    <div className="flex flex-col items-center gap-[3px] border-r border-[var(--m-statbd)] last:border-0">
      <div className="flex items-baseline gap-1.5">
        <span className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: color }}></span>
        <span className="font-extrabold text-[25px] leading-none" style={{ color: color }}>{count}</span>
      </div>
      <span className="font-mono text-[8.5px] tracking-[0.06em] text-[var(--mute)]">{label}</span>
    </div>
  );
}
