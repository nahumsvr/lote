export const en = {
  meta: {
    title: "Lote — CDMX in real time",
    description: "Real-time urban mobility agent for Mexico City.",
    lang: "en",
  },

  nav: {
    map: "Map",
    chat: "Chat",
    zones: "Zones",
    settings: "Settings",
  },

  status: {
    clear: "CLEAR",
    watch: "WATCH",
    avoid: "AVOID",
  },

  map: {
    titleAccent: "now",
    live: "LIVE",
    stats: { clear: "CLEAR", watch: "WATCH", avoid: "AVOID", reports: "REPORTS" },
    confirmed: "confirmed",
    alerts: [
      {
        id: 1,
        kind: "evitar" as const,
        label: "AVOID · CENTRO HISTÓRICO",
        time: "4 min ago",
        sources: "6 sources",
        cta: "View safe route",
        body: 'Watch out for downtown — there\'s a march on <b class="font-semibold">5 de Febrero</b> and access to the Zócalo is blocked from the north. Better leave it for tomorrow.',
      },
      {
        id: 2,
        kind: "monitorear" as const,
        label: "WATCH · DOCTORES",
        time: "12 min ago",
        sources: "4 sources",
        cta: "View details",
        body: 'Lane closure on <b class="font-semibold">Eje Central</b> for an event. No danger, but your Uber might take longer. Keep that in mind if you\'re in a rush.',
      },
      {
        id: 3,
        kind: "monitorear" as const,
        label: "WATCH · REFORMA",
        time: "9 min ago",
        sources: "3 sources",
        cta: "View details",
        body: 'Crowds are gathering at the <b class="font-semibold">Ángel</b> ahead of the match. Calm for now, but keep an eye out if you\'ve got kids.',
      },
    ],
  },

  chat: {
    monitoring: "monitoring CDMX",
    zonesLabel: "ZONES",
    activeLabel: "ACTIVE",
    placeholder: "Ask Lote anything…",
    sources: "sources",
    viewOnGoogleMaps: "View on Google Maps",
    today: "TODAY · TUE JUN 9",
    now: "now",
    initialQuestion: "Can I take my family to the Zócalo right now?",
    responses: {
      zocalo: {
        texto: "There's an active student march in the Historic Center — been going on for about 40 minutes. Access to the Zócalo is blocked from the north. I'd skip it for now.",
        fuentes: 6,
        chips: [
          { zona: "Zócalo · Avoid", estado: "evitar" as const },
          { zona: "Eje Central · Clear", estado: "tranquilo" as const },
        ],
        mapa: { zona: "Zócalo · Centro Histórico", lat: 19.4326, lng: -99.1332 },
      },
      coyoacan: {
        texto: "Coyoacán is looking good. No reports in the last 2 hours — solid pick for dinner with the family.\n\nHeads up passing through Doctores if you're driving, something's brewing over there.",
        fuentes: 3,
        chips: [
          { zona: "Coyoacán · Clear", estado: "tranquilo" as const },
          { zona: "Doctores · Watch", estado: "monitorear" as const },
        ],
        mapa: { zona: "Coyoacán", lat: 19.349, lng: -99.162 },
      },
      roma: {
        texto: "Roma Norte is chill right now. Normal traffic flow. Just a heads up — avoid Álvaro Obregón after 10pm, there are reports of closures for an event.",
        fuentes: 4,
        chips: [{ zona: "Roma Norte · Clear", estado: "tranquilo" as const }],
        mapa: { zona: "Roma Norte", lat: 19.419, lng: -99.159 },
      },
      polanco: {
        texto: "Polanco is all clear. Normal traffic on Presidente Masaryk. Good area for tonight.",
        fuentes: 2,
        chips: [{ zona: "Polanco · Clear", estado: "tranquilo" as const }],
        mapa: { zona: "Polanco", lat: 19.4336, lng: -99.1994 },
      },
      condesa: {
        texto: "Condesa is quiet. Ámsterdam and Tamaulipas are clear. Good night to head out around there.",
        fuentes: 3,
        chips: [{ zona: "Condesa · Clear", estado: "tranquilo" as const }],
        mapa: { zona: "Condesa", lat: 19.414, lng: -99.172 },
      },
      tepito: {
        texto: "Tepito is on yellow right now. Unusual activity reported by 3 sources. Nothing critical, but I wouldn't wander in if you don't know the area.",
        fuentes: 3,
        chips: [{ zona: "Tepito · Watch", estado: "monitorear" as const }],
        mapa: { zona: "Tepito", lat: 19.4428, lng: -99.1242 },
      },
      reforma: {
        texto: "Reforma is being monitored. Crowds gathering near the Ángel ahead of the match. Calm for now, but keep an eye out if you've got kids with you.",
        fuentes: 3,
        chips: [{ zona: "Reforma · Watch", estado: "monitorear" as const }],
        mapa: { zona: "Paseo de la Reforma", lat: 19.4269, lng: -99.1617 },
      },
      doctores: {
        texto: "Doctores is on watch. Lane closure on Eje Central for an event. No real risk, but your ride might take longer.",
        fuentes: 4,
        chips: [{ zona: "Doctores · Watch", estado: "monitorear" as const }],
        mapa: { zona: "Doctores", lat: 19.4172, lng: -99.1466 },
      },
      seguro: {
        texto: "The calmest zones right now are Polanco, Condesa, Roma Norte, and Coyoacán. No active reports in the last 2 hours.",
        fuentes: 5,
        chips: [
          { zona: "Polanco · Clear", estado: "tranquilo" as const },
          { zona: "Condesa · Clear", estado: "tranquilo" as const },
          { zona: "Coyoacán · Clear", estado: "tranquilo" as const },
        ],
      },
      default: {
        texto: "Let me check the reports around your area real quick. Give me a sec and I'll give you the straight story.",
        fuentes: 0,
        chips: [],
      },
    },
  },

  zones: {
    title: "Zones",
    titleAccent: "for you",
    youAreHere: "YOU ARE HERE",
    disclaimer: "Lote recommends based on public sources.",
    disclaimerSub: "Never guarantees · updates every 2 min.",
    summary: [
      { t: "Your area looks good. There's ", w: 400 },
      { t: "1 zone", w: 600 },
      { t: " you should skip today and ", w: 400 },
      { t: "2", w: 600 },
      { t: " to keep on your radar. Sorted from most urgent to calmest.", w: 400 },
    ],
    here: {
      desc: [
        { t: "Your zone is ", w: 400 },
        { t: "calm", w: 600 },
        { t: ". No reports in the last 2 hours. Move around with confidence.", w: 400 },
      ],
    },
    groups: [
      {
        key: "avoid",
        label: "BETTER SKIP IT",
        labelColor: "text-[var(--redT)]",
        color: "bg-[#D93030]",
        shadowColor: "shadow-[0_0_8px_#D93030]",
        count: "1",
        zones: [
          {
            status: "avoid",
            name: "Centro Histórico",
            meta: "Cuauhtémoc · 3.1 km NE",
            desc: [
              { t: "Active student march on ", w: 400 },
              { t: "5 de Febrero", w: 600 },
              { t: ". Access to the Zócalo is closed from the north. Better leave it for tomorrow.", w: 400 },
            ],
            sources: "6 confirmed",
            ago: "4 min ago",
            hasCta: true,
            cta: "View safe route",
          },
        ],
      },
      {
        key: "watch",
        label: "KEEP AN EYE ON THESE",
        labelColor: "text-[var(--gold)]",
        color: "bg-[#F0B429]",
        shadowColor: "shadow-[0_0_8px_#F0B429]",
        count: "2",
        zones: [
          {
            status: "watch",
            name: "Doctores",
            meta: "Cuauhtémoc · 1.8 km south",
            desc: [
              { t: "Lane closure on ", w: 400 },
              { t: "Eje Central", w: 600 },
              { t: " for an event. No danger, but your Uber might take longer.", w: 400 },
            ],
            sources: "4 sources",
            ago: "12 min ago",
          },
          {
            status: "watch",
            name: "Reforma",
            meta: "Cuauhtémoc · 2.4 km north",
            desc: [
              { t: "Crowds gathering at the ", w: 400 },
              { t: "Ángel", w: 600 },
              { t: " ahead of the match. Calm for now, but keep an eye out if you've got kids.", w: 400 },
            ],
            sources: "3 sources",
            ago: "9 min ago",
          },
        ],
      },
      {
        key: "calm",
        label: "ALL CLEAR AROUND HERE",
        labelColor: "text-[var(--greenT)]",
        color: "bg-[#2ECC71]",
        shadowColor: "shadow-[0_0_8px_#2ECC71]",
        count: "2",
        zones: [
          {
            status: "calm",
            name: "Condesa",
            meta: "Cuauhtémoc · 1.1 km west",
            desc: [
              { t: "All quiet. ", w: 400 },
              { t: "Parque México", w: 600 },
              { t: " is clear. Good option if you're heading out for dinner.", w: 400 },
            ],
            sources: "3 sources",
            ago: "7 min ago",
          },
          {
            status: "calm",
            name: "Coyoacán",
            meta: "Coyoacán · 4.2 km south",
            desc: [
              { t: "No incidents in the last ", w: 400 },
              { t: "3 hours", w: 600 },
              { t: ". Jardín Centenario is peaceful.", w: 400 },
            ],
            sources: "3 sources",
            ago: "8 min ago",
          },
        ],
      },
    ],
    emergency: {
      title: "If things go sideways",
      subtitle: "AT HAND",
      emergencies: "EMERGENCY",
      locatel: "LOCATEL",
      touristPolice: "TOURIST POLICE",
    },
  },
};
