import type { en } from "./en";

type Dictionary = typeof en;

export const es: Dictionary = {
  meta: {
    title: "Lote — CDMX en tiempo real",
    description: "Agente de movilidad urbana en tiempo real para la Ciudad de México.",
    lang: "es",
  },

  nav: {
    map: "Mapa",
    chat: "Chat",
    zones: "Zonas",
    settings: "Config",
    info: "Info",
  },

  status: {
    clear: "TRANQUILO",
    watch: "MONITOREAR",
    avoid: "EVITAR",
  },

  map: {
    titleAccent: "ahora",
    live: "EN VIVO",
    stats: { clear: "SEGURAS", watch: "MONITOREAR", avoid: "EVITAR", reports: "REPORTES" },
    confirmed: "confirman",
    alerts: [
      {
        id: 1,
        kind: "evitar" as const,
        label: "EVITAR · CENTRO HISTÓRICO",
        time: "hace 4 min",
        sources: "6 fuentes",
        cta: "Ver ruta segura",
        body: 'Aguas con el Centro — hay marcha en <b class="font-semibold">5 de Febrero</b> y el acceso al Zócalo está cerrado por el norte. Mejor déjalo para mañana.',
      },
      {
        id: 2,
        kind: "monitorear" as const,
        label: "MONITOREAR · DOCTORES",
        time: "hace 12 min",
        sources: "4 fuentes",
        cta: "Ver detalles",
        body: 'Cierre de carril en <b class="font-semibold">Eje Central</b> por un evento. No es riesgo, pero tu Uber puede tardar. Tenlo en cuenta si vas con prisa.',
      },
      {
        id: 3,
        kind: "monitorear" as const,
        label: "MONITOREAR · REFORMA",
        time: "hace 9 min",
        sources: "3 fuentes",
        cta: "Ver detalles",
        body: 'Se está juntando gente en el <b class="font-semibold">Ángel</b> por la previa del partido. Tranquilo por ahora, pero ojo si llevas niños.',
      },
    ],
  },

  chat: {
    monitoring: "monitoreando CDMX",
    zonesLabel: "ZONAS",
    activeLabel: "ACTIVAS",
    placeholder: "Pregúntale a Lote…",
    sources: "fuentes",
    viewOnGoogleMaps: "Ver en Google Maps",
    today: "HOY · MAR 9 JUN",
    now: "ahora",
    initialQuestion: "¿Puedo llevar a mi familia al Zócalo ahorita?",
    responses: {
      zocalo: {
        texto: "Hay una marcha estudiantil activa en el Centro Histórico desde hace 40 min. El acceso al Zócalo está bloqueado por el norte. Te recomiendo evitarlo por ahora.",
        fuentes: 6,
        chips: [
          { zona: "Zócalo · Evitar", estado: "evitar" as const },
          { zona: "Eje Central · Libre", estado: "tranquilo" as const },
        ],
        mapa: { zona: "Zócalo · Centro Histórico", lat: 19.4326, lng: -99.1332 },
      },
      coyoacan: {
        texto: "Coyoacán está tranquilo. Sin reportes en las últimas 2 horas — buena opción para cenar con la familia.\n\nAguas al pasar por Doctores si vas en coche, hay algo moviéndose ahí.",
        fuentes: 3,
        chips: [
          { zona: "Coyoacán · Tranquilo", estado: "tranquilo" as const },
          { zona: "Doctores · Monitorear", estado: "monitorear" as const },
        ],
        mapa: { zona: "Coyoacán", lat: 19.349, lng: -99.162 },
      },
      roma: {
        texto: "Roma Norte está tranquila ahorita. Circulación normal. Eso sí, evita Álvaro Obregón después de las 10pm — hay reportes de cierres por evento.",
        fuentes: 4,
        chips: [{ zona: "Roma Norte · Tranquilo", estado: "tranquilo" as const }],
        mapa: { zona: "Roma Norte", lat: 19.419, lng: -99.159 },
      },
      polanco: {
        texto: "Polanco sin novedad. Circulación normal en Presidente Masaryk. Buena zona para esta noche.",
        fuentes: 2,
        chips: [{ zona: "Polanco · Tranquilo", estado: "tranquilo" as const }],
        mapa: { zona: "Polanco", lat: 19.4336, lng: -99.1994 },
      },
      condesa: {
        texto: "Condesa tranquila. Ámsterdam y Tamaulipas despejadas. Es buena noche para salir por ahí.",
        fuentes: 3,
        chips: [{ zona: "Condesa · Tranquilo", estado: "tranquilo" as const }],
        mapa: { zona: "Condesa", lat: 19.414, lng: -99.172 },
      },
      tepito: {
        texto: "Tepito está en amarillo ahorita. Hay movimiento inusual reportado por 3 fuentes. No es crítico pero mejor no te aventures si no conoces la zona.",
        fuentes: 3,
        chips: [{ zona: "Tepito · Monitorear", estado: "monitorear" as const }],
        mapa: { zona: "Tepito", lat: 19.4428, lng: -99.1242 },
      },
      reforma: {
        texto: "Reforma está en monitoreo. Se está juntando gente cerca del Ángel por la previa del partido. Tranquilo por ahora pero ojo si llevas niños.",
        fuentes: 3,
        chips: [{ zona: "Reforma · Monitorear", estado: "monitorear" as const }],
        mapa: { zona: "Paseo de la Reforma", lat: 19.4269, lng: -99.1617 },
      },
      doctores: {
        texto: "Doctores en monitoreo. Cierre de carril en Eje Central por un evento. No es riesgo pero tu transporte puede tardar más.",
        fuentes: 4,
        chips: [{ zona: "Doctores · Monitorear", estado: "monitorear" as const }],
        mapa: { zona: "Doctores", lat: 19.4172, lng: -99.1466 },
      },
      seguro: {
        texto: "Las zonas más tranquilas ahorita son Polanco, Condesa, Roma Norte y Coyoacán. Sin reportes activos en las últimas 2 horas.",
        fuentes: 5,
        chips: [
          { zona: "Polanco · Tranquilo", estado: "tranquilo" as const },
          { zona: "Condesa · Tranquilo", estado: "tranquilo" as const },
          { zona: "Coyoacán · Tranquilo", estado: "tranquilo" as const },
        ],
      },
      default: {
        texto: "Déjame checar los reportes de tu rumbo ahorita mismo. Dame un segundo y te digo al chile cómo está la cosa.",
        fuentes: 0,
        chips: [],
      },
    },
  },

  zones: {
    title: "Zonas",
    titleAccent: "para ti",
    youAreHere: "ESTÁS AQUÍ",
    disclaimer: "Lote recomienda con base en fuentes públicas.",
    disclaimerSub: "Nunca garantiza · actualiza cada 2 min.",
    summary: [
      { t: "Por tu rumbo, todo bien. Hay ", w: 400 },
      { t: "1 zona", w: 600 },
      { t: " que mejor evitas hoy y ", w: 400 },
      { t: "2", w: 600 },
      { t: " para traer en el radar. Te las ordené de lo más urgente a lo más tranquilo.", w: 400 },
    ],
    here: {
      desc: [
        { t: "Tu zona está ", w: 400 },
        { t: "tranquila", w: 600 },
        { t: ". Sin reportes en las últimas 2 horas. Muévete con confianza.", w: 400 },
      ],
    },
    groups: [
      {
        key: "avoid",
        label: "MEJOR EVÍTALA",
        labelColor: "text-[var(--redT)]",
        color: "bg-[#D93030]",
        shadowColor: "shadow-[0_0_8px_#D93030]",
        count: "1",
        zones: [
          {
            status: "avoid",
            name: "Centro Histórico",
            meta: "Cuauhtémoc · 3.1 km al NE",
            desc: [
              { t: "Marcha estudiantil activa en ", w: 400 },
              { t: "5 de Febrero", w: 600 },
              { t: ". El acceso al Zócalo está cerrado por el norte. Mejor déjalo para mañana.", w: 400 },
            ],
            sources: "6 confirman",
            ago: "hace 4 min",
            hasCta: true,
            cta: "Ver ruta segura",
          },
        ],
      },
      {
        key: "watch",
        label: "TENLAS EN EL RADAR",
        labelColor: "text-[var(--gold)]",
        color: "bg-[#F0B429]",
        shadowColor: "shadow-[0_0_8px_#F0B429]",
        count: "2",
        zones: [
          {
            status: "watch",
            name: "Doctores",
            meta: "Cuauhtémoc · 1.8 km al sur",
            desc: [
              { t: "Cierre de carril en ", w: 400 },
              { t: "Eje Central", w: 600 },
              { t: " por un evento. No es riesgo, pero tu Uber puede tardar.", w: 400 },
            ],
            sources: "4 fuentes",
            ago: "hace 12 min",
          },
          {
            status: "watch",
            name: "Reforma",
            meta: "Cuauhtémoc · 2.4 km al norte",
            desc: [
              { t: "Se está juntando gente en el ", w: 400 },
              { t: "Ángel", w: 600 },
              { t: " por la previa del partido. Tranquilo por ahora, pero ojo si llevas niños.", w: 400 },
            ],
            sources: "3 fuentes",
            ago: "hace 9 min",
          },
        ],
      },
      {
        key: "calm",
        label: "TRANQUILO POR ACÁ",
        labelColor: "text-[var(--greenT)]",
        color: "bg-[#2ECC71]",
        shadowColor: "shadow-[0_0_8px_#2ECC71]",
        count: "2",
        zones: [
          {
            status: "calm",
            name: "Condesa",
            meta: "Cuauhtémoc · 1.1 km al oeste",
            desc: [
              { t: "Todo en calma. ", w: 400 },
              { t: "Parque México", w: 600 },
              { t: " despejado. Buena opción si sales a cenar.", w: 400 },
            ],
            sources: "3 fuentes",
            ago: "hace 7 min",
          },
          {
            status: "calm",
            name: "Coyoacán",
            meta: "Coyoacán · 4.2 km al sur",
            desc: [
              { t: "Sin incidencias en las últimas ", w: 400 },
              { t: "3 horas", w: 600 },
              { t: ". Jardín Centenario tranquilo.", w: 400 },
            ],
            sources: "3 fuentes",
            ago: "hace 8 min",
          },
        ],
      },
    ],
    emergency: {
      title: "Si algo se pone feo",
      subtitle: "A LA MANO",
      emergencies: "EMERGENCIAS",
      locatel: "LOCATEL",
      touristPolice: "POLICÍA TURÍSTICA",
    },
  },
};
