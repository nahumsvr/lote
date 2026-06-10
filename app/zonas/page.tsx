import React from "react";
import BriefingNote from "./_components/BriefingNote";
import HereCard from "./_components/HereCard";
import ZoneGroup from "./_components/ZoneGroup";
import EmergencyFooter from "./_components/EmergencyFooter";

const summary = [
  { t: 'Por tu rumbo, todo bien. Hay ', w: 400 },
  { t: '1 zona', w: 600 },
  { t: ' que mejor evitas hoy y ', w: 400 },
  { t: '2', w: 600 },
  { t: ' para traer en el radar. Te las ordené de lo más urgente a lo más tranquilo.', w: 400 }
];

const here = {
  desc: [
    { t: 'Tu zona está ', w: 400 },
    { t: 'tranquila', w: 600 },
    { t: '. Sin reportes en las últimas 2 horas. Muévete con confianza.', w: 400 }
  ]
};

const groups = [
  {
    key: 'avoid', label: 'MEJOR EVÍTALA', labelColor: 'text-[var(--redT)]', color: 'bg-[#D93030]', shadowColor: 'shadow-[0_0_8px_#D93030]', count: '1',
    zones: [
      {
        status: 'avoid', name: 'Centro Histórico', meta: 'Cuauhtémoc · 3.1 km al NE',
        desc: [
          { t: 'Marcha estudiantil activa en ', w: 400 },
          { t: '5 de Febrero', w: 600 },
          { t: '. El acceso al Zócalo está cerrado por el norte. Mejor déjalo para mañana.', w: 400 }
        ],
        sources: '6 confirman', ago: 'hace 4 min', hasCta: true, cta: 'Ver ruta segura'
      }
    ]
  },
  {
    key: 'watch', label: 'TENLAS EN EL RADAR', labelColor: 'text-[var(--gold)]', color: 'bg-[#F0B429]', shadowColor: 'shadow-[0_0_8px_#F0B429]', count: '2',
    zones: [
      {
        status: 'watch', name: 'Doctores', meta: 'Cuauhtémoc · 1.8 km al sur',
        desc: [
          { t: 'Cierre de carril en ', w: 400 },
          { t: 'Eje Central', w: 600 },
          { t: ' por un evento. No es riesgo, pero tu Uber puede tardar.', w: 400 }
        ],
        sources: '4 fuentes', ago: 'hace 12 min'
      },
      {
        status: 'watch', name: 'Reforma', meta: 'Cuauhtémoc · 2.4 km al norte',
        desc: [
          { t: 'Se está juntando gente en el ', w: 400 },
          { t: 'Ángel', w: 600 },
          { t: ' por la previa del partido. Tranquilo por ahora, pero ojo si llevas niños.', w: 400 }
        ],
        sources: '3 fuentes', ago: 'hace 9 min'
      }
    ]
  },
  {
    key: 'calm', label: 'TRANQUILO POR ACÁ', labelColor: 'text-[var(--greenT)]', color: 'bg-[#2ECC71]', shadowColor: 'shadow-[0_0_8px_#2ECC71]', count: '2',
    zones: [
      {
        status: 'calm', name: 'Condesa', meta: 'Cuauhtémoc · 1.1 km al oeste',
        desc: [
          { t: 'Todo en calma. ', w: 400 },
          { t: 'Parque México', w: 600 },
          { t: ' despejado. Buena opción si sales a cenar.', w: 400 }
        ],
        sources: '3 fuentes', ago: 'hace 7 min'
      },
      {
        status: 'calm', name: 'Coyoacán', meta: 'Coyoacán · 4.2 km al sur',
        desc: [
          { t: 'Sin incidencias en las últimas ', w: 400 },
          { t: '3 horas', w: 600 },
          { t: '. Jardín Centenario tranquilo.', w: 400 }
        ],
        sources: '3 fuentes', ago: 'hace 8 min'
      }
    ]
  }
];

export default function ZonasPage() {
  return (
    <>
      {/* header */}
      <div className="relative px-6 pt-[6px] pb-3">
        <div className="font-sans font-extrabold text-[30px] tracking-[-0.02em] leading-none mt-2">
          Zonas <span className="text-primary">para ti</span>
        </div>
      </div>

      {/* briefing note from Lote */}
      <BriefingNote summary={summary} />

      {/* scrollable zone list */}
      <div className="lote-scroll relative flex-auto min-h-0 overflow-y-auto px-4 pt-[2px] pb-[18px] touch-pan-y">
        <HereCard here={here} />
        
        {groups.map((g) => (
          <ZoneGroup key={g.key} group={g} />
        ))}

        <div className="font-mono text-[9.5px] text-[var(--faint)] text-center py-[2px] pb-1 leading-[1.5]">
          Lote recomienda con base en fuentes públicas.<br/>Nunca garantiza · actualiza cada 2 min.
        </div>
      </div>

      <EmergencyFooter />
    </>
  );
}
