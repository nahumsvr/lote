import React from "react";
import { LoteMark } from "./LoteMark";

const StatusBar = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "13px 20px 4px",
      fontSize: 11.5,
      fontWeight: "600",
      color: "rgba(244, 242, 238, 0.6)",
      zIndex: 10,
    }}
  >
    <span>21:47</span>
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <svg width="15" height="10" viewBox="0 0 17 11" fill="currentColor">
        <rect x="0" y="8" width="2" height="3" rx="0.5" />
        <rect x="4" y="6" width="2" height="5" rx="0.5" />
        <rect x="8" y="4" width="2" height="7" rx="0.5" />
        <rect x="12" y="1" width="2" height="10" rx="0.5" />
      </svg>
      <svg width="13" height="10" viewBox="0 0 14 11" fill="currentColor">
        <path d="M7 11c-.5 0-.9-.2-1.2-.5L.7 5.4c-.9-.9-.9-2.5 0-3.4C2.5.2 4.7-.2 7-.2s4.5.4 6.3 2.2c.9.9.9 2.5 0 3.4l-5.1 5.1c-.3.3-.7.5-1.2.5zm0-9.8C5.2 1.2 3.4 1.5 2 2.9l5 5 5-5C10.6 1.5 8.8 1.2 7 1.2z" />
      </svg>
      <svg width="20" height="10" viewBox="0 0 22 11" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="1" y="1" width="16" height="9" rx="2" fill="none" />
        <rect x="3" y="3" width="10" height="5" rx="1" fill="currentColor" />
        <path d="M19 4v3" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);

export const PhoneMockup = ({ children }: { children: React.ReactNode }) => (
  <div className="phone-frame">
    <div className="notch" />
    {children}
    <div className="gleam" />
  </div>
);

export const MapMockupScreen = () => (
  <div
    className="screen"
    style={{
      display: "flex",
      flexDirection: "column",
      background: "#0C0F19",
      overflow: "hidden",
    }}
  >
    <StatusBar />

    {/* App header */}
    <div style={{ padding: "8px 20px 8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: "#F4F2EE",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          CDMX <span style={{ color: "#E8563A" }}>ahora</span>
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "rgba(46,204,113,0.1)",
            border: "1px solid rgba(46,204,113,0.3)",
            borderRadius: 999,
            padding: "3px 8px",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#2ECC71",
              boxShadow: "0 0 6px #2ECC71",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 8,
              fontWeight: 600,
              color: "#5BD996",
              letterSpacing: "0.05em",
            }}
          >
            EN VIVO
          </span>
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 9,
          color: "#D6B85E",
          marginTop: 4,
          letterSpacing: "0.04em",
        }}
      >
        19.4326° N · 99.1332° W
      </div>
      <p
        style={{
          fontSize: 11.5,
          color: "rgba(244, 242, 238, 0.65)",
          lineHeight: 1.45,
          marginTop: 8,
          marginRight: 10,
        }}
      >
        Todo tranquilo por tu rumbo. Hay <strong style={{ color: "#E8563A" }}>1 zona</strong> que mejor evitas esta noche.
      </p>
    </div>

    {/* Map area */}
    <div style={{ flex: 1, position: "relative", minHeight: 0, overflow: "hidden" }}>
      <svg
        width="312"
        height="314"
        viewBox="0 0 312 314"
        fill="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <rect width="312" height="314" fill="#0C0F19" />
        
        {/* Grid Lines */}
        <path d="M 0 40 L 312 40 M 0 100 L 312 100 M 0 160 L 312 160 M 0 220 L 312 220 M 0 280 L 312 280" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <path d="M 50 0 L 50 314 M 110 0 L 110 314 M 170 0 L 170 314 M 230 0 L 230 314 M 290 0 L 290 314" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        
        {/* Diagonal Street Lines (Mock Map) */}
        <path d="M -20 180 L 330 110 M 80 -10 L 240 330 M 20 50 L 340 160 M -10 260 L 330 230 M 180 -10 L 60 330" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
        
        {/* Concentric radar rings centered around Roma Norte (154, 128) */}
        <circle cx="154" cy="128" r="30" stroke="rgba(232, 86, 58, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="154" cy="128" r="65" stroke="rgba(232, 86, 58, 0.05)" strokeWidth="1" />
        <circle cx="154" cy="128" r="110" stroke="rgba(232, 86, 58, 0.03)" strokeWidth="1" />
        <circle cx="154" cy="128" r="160" stroke="rgba(232, 86, 58, 0.02)" strokeWidth="1" />

        {/* Organic Polygon Zones */}
        
        {/* Polanco (Top Left) - Green */}
        <path
          d="M 50 30 Q 80 20 100 40 Q 115 70 85 85 Q 45 80 40 55 Q 35 35 50 30 Z"
          fill="rgba(46,204,113,0.06)"
          stroke="rgba(46,204,113,0.32)"
          strokeWidth="1.5"
        />
        <circle cx="60" cy="50" r="3" fill="#2ECC71" />
        <text x="68" y="53" fontFamily="var(--mono)" fontSize="7" fontWeight="bold" fill="rgba(91,217,150,0.8)">POLANCO</text>

        {/* Condesa (Mid Left) - Green */}
        <path
          d="M 45 110 Q 75 105 85 125 Q 95 155 75 165 Q 45 165 35 145 Q 30 120 45 110 Z"
          fill="rgba(46,204,113,0.06)"
          stroke="rgba(46,204,113,0.32)"
          strokeWidth="1.5"
        />
        <circle cx="50" cy="130" r="3" fill="#2ECC71" />
        <text x="58" y="133" fontFamily="var(--mono)" fontSize="7" fontWeight="bold" fill="rgba(91,217,150,0.8)">CONDESA</text>

        {/* Del Valle (Bottom Left) - Green */}
        <path
          d="M 55 190 Q 85 185 105 200 Q 115 235 90 250 Q 55 250 45 230 Q 38 205 55 190 Z"
          fill="rgba(46,204,113,0.06)"
          stroke="rgba(46,204,113,0.32)"
          strokeWidth="1.5"
        />
        <circle cx="60" cy="215" r="3" fill="#2ECC71" />
        <text x="68" y="218" fontFamily="var(--mono)" fontSize="7" fontWeight="bold" fill="rgba(91,217,150,0.8)">DEL VALLE</text>

        {/* Coyoacán (Bottom Right) - Green */}
        <path
          d="M 185 190 Q 225 185 240 200 Q 250 235 225 250 Q 185 255 175 235 Q 170 205 185 190 Z"
          fill="rgba(46,204,113,0.06)"
          stroke="rgba(46,204,113,0.32)"
          strokeWidth="1.5"
        />
        <circle cx="195" cy="215" r="3" fill="#2ECC71" />
        <text x="203" y="218" fontFamily="var(--mono)" fontSize="7" fontWeight="bold" fill="rgba(91,217,150,0.8)">COYOACÁN</text>

        {/* Roma Norte (Center) - Orange (Tú) */}
        <path
          d="M 125 110 Q 155 95 180 115 Q 195 140 175 160 Q 140 170 125 150 Q 115 130 125 110 Z"
          fill="rgba(232,86,58,0.07)"
          stroke="rgba(232,86,58,0.38)"
          strokeWidth="1.5"
        />
        <circle cx="154" cy="128" r="8" fill="rgba(232, 86, 58, 0.2)" stroke="#E8563A" strokeWidth="1.8" />
        <circle cx="154" cy="128" r="3" fill="#E8563A" />
        <text x="130" y="146" fontFamily="var(--mono)" fontSize="7" fontWeight="bold" fill="rgba(244, 242, 238, 0.7)">TÚ · ROMA NORTE</text>

        {/* Doctores (Mid Right) - Yellow */}
        <path
          d="M 205 115 Q 235 110 250 125 Q 255 145 240 155 Q 215 160 205 145 Q 198 128 205 115 Z"
          fill="rgba(240,180,41,0.06)"
          stroke="rgba(240,180,41,0.32)"
          strokeWidth="1.5"
        />
        <circle cx="218" cy="133" r="3" fill="#F0B429" />
        <text x="226" y="136" fontFamily="var(--mono)" fontSize="7" fontWeight="bold" fill="rgba(240,197,102,0.8)">DOCTORES</text>

        {/* Red Alert Zone (Top Right) */}
        <path
          d="M 195 35 Q 230 20 250 35 Q 265 60 245 75 Q 210 80 195 65 Q 185 48 195 35 Z"
          fill="rgba(217,48,48,0.07)"
          stroke="rgba(217,48,48,0.4)"
          strokeWidth="1.5"
        />
        <circle cx="225" cy="48" r="8" fill="#D93030" />
        <path d="M225 44 L229 51 L221 51 Z" fill="#fff" />
        <rect x="224.5" y="47" width="1" height="2" fill="#D93030" />
        <circle cx="225" cy="50.2" r="0.5" fill="#D93030" />
      </svg>

      {/* Floating Map Controls */}
      <div
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "rgba(18, 22, 36, 0.82)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#E8563A",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="7" />
            <line x1="12" y1="1" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="1" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="23" y2="12" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 8,
            background: "rgba(18, 22, 36, 0.82)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 26,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(244,242,238,0.7)",
              fontSize: 13,
              fontWeight: "bold",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            +
          </div>
          <div
            style={{
              width: 26,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(244,242,238,0.7)",
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            -
          </div>
        </div>
      </div>
    </div>

    {/* Stats Panel */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        padding: "10px 6px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(12, 15, 25, 0.4)",
      }}
    >
      {[
        { n: "4", l: "SEGURAS", c: "#2ECC71" },
        { n: "2", l: "MONITOREAR", c: "#F0B429" },
        { n: "1", l: "EVITAR", c: "#D93030" },
        { n: "14", l: "REPORTES", c: "#D6B85E" },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 3.5 }}>
            <span
              style={{
                width: 4.5,
                height: 4.5,
                borderRadius: "50%",
                background: s.c,
                boxShadow: `0 0 6px ${s.c}`,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontWeight: 800,
                fontSize: 16,
                color: "#fff",
                fontFamily: "var(--ui)",
                lineHeight: 1.1,
              }}
            >
              {s.n}
            </span>
          </div>
          <span
            style={{
              fontSize: 7.5,
              fontFamily: "var(--mono)",
              color: "rgba(244,242,238,0.4)",
              letterSpacing: "0.04em",
              marginTop: 3,
            }}
          >
            {s.l}
          </span>
        </div>
      ))}
    </div>

    {/* Drawer Alert card */}
    <div
      style={{
        margin: "10px",
        background: "rgba(20, 25, 45, 0.62)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 18,
        padding: "8px 12px 10px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* Drawer Handle */}
      <div
        style={{
          width: 32,
          height: 3.5,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 99,
          margin: "0 auto 8px",
        }}
      />

      {/* Header info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#D93030",
              boxShadow: "0 0 6px #D93030",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 8.5,
              color: "#EE8B86",
              fontWeight: "bold",
              letterSpacing: "0.05em",
            }}
          >
            EVITAR · CENTRO HISTÓRICO
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 8.5,
            color: "rgba(244,242,238,0.4)",
          }}
        >
          hace 4 min
        </span>
      </div>

      {/* Alert body */}
      <div
        style={{
          fontSize: 11.5,
          color: "#F4F2EE",
          lineHeight: 1.45,
          marginBottom: 10,
        }}
      >
        Aguas con el Centro — hay marcha en <strong style={{ color: "#fff", fontWeight: "600" }}>5 de Febrero</strong> y el acceso al Zócalo está cerrado por el norte. Mejor déjalo para mañana.
      </div>

      {/* Sources & Action */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5.5,
            fontFamily: "var(--mono)",
            fontSize: 8.5,
            color: "#D6B85E",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 11,
              height: 11,
              borderRadius: "50%",
              border: "1px solid #D6B85E",
            }}
          >
            <span
              style={{
                width: 3.5,
                height: 3.5,
                borderRadius: "50%",
                background: "#D6B85E",
              }}
            />
          </span>
          6 fuentes confirman
        </div>
        <div
          style={{
            background: "#D93030",
            color: "#fff",
            fontSize: 10,
            fontWeight: "bold",
            padding: "6px 12px",
            borderRadius: 99,
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(217,48,48,0.25)",
          }}
        >
          <span>Ver ruta segura</span>
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </div>

    {/* Carousel Dots */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 5,
        paddingBottom: 7,
      }}
    >
      <span
        style={{
          width: 14,
          height: 4,
          borderRadius: 2,
          background: "#D93030",
          display: "inline-block",
        }}
      />
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "inline-block",
        }}
      />
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "inline-block",
        }}
      />
    </div>

    {/* Tab Bar */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 10px 18px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "#0E1222",
      }}
    >
      {[
        {
          l: "Mapa",
          act: true,
          icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" y1="3" x2="9" y2="18" />
              <line x1="15" y1="6" x2="15" y2="21" />
            </svg>
          ),
        },
        {
          l: "Chat",
          act: false,
          icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          ),
        },
        {
          l: "Zonas",
          act: false,
          icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          ),
        },
        {
          l: "Config",
          act: false,
          icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          ),
        },
      ].map((tab, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: tab.act ? "#E8563A" : "rgba(244,242,238,0.4)",
            cursor: "pointer",
            position: "relative",
            padding: "2px 4px",
          }}
        >
          {tab.icon}
          <span style={{ fontSize: 9, fontWeight: 600, marginTop: 3 }}>{tab.l}</span>
          {tab.act && (
            <span
              style={{
                position: "absolute",
                bottom: -6,
                width: 14,
                height: 2,
                background: "#E8563A",
                borderRadius: 9,
              }}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export const ChatMockupScreen = () => (
  <div
    className="screen"
    style={{
      display: "flex",
      flexDirection: "column",
      background: "#0C0F19",
      overflow: "hidden",
    }}
  >
    <StatusBar />

    {/* ── Chat header (same as real app) ── */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 18px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 11,
          background: "linear-gradient(150deg,#E8563A,#D93030)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <LoteMark size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "#F4F2EE",
            lineHeight: 1.2,
          }}
        >
          Lote
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginTop: 2,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#2ECC71",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: 9.5,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Monitoreando CDMX
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "rgba(214,184,94,0.1)",
          border: "1px solid rgba(214,184,94,0.25)",
          borderRadius: 999,
          padding: "3px 8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontWeight: 700,
            fontSize: 9.5,
            color: "#D6B85E",
          }}
        >
          7
        </span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 7.5,
            color: "rgba(214,184,94,0.7)",
            lineHeight: 1.1,
          }}
        >
          zonas
          <br />
          activas
        </span>
      </div>
    </div>
    {/* ── Messages ── */}
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "14px 14px 10px",
        overflowY: "hidden",
      }}
    >
      {/* Date divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 2,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 8.5,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.1em",
          }}
        >
          HOY
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "rgba(255,255,255,0.05)",
          }}
        />
      </div>
      {/* User bubble */}
      <div
        style={{
          alignSelf: "flex-end",
          background: "rgba(232,86,58,0.1)",
          border: "1px solid rgba(217,48,48,0.2)",
          borderRadius: "16px 16px 4px 16px",
          padding: "9px 12px",
          fontSize: 12,
          lineHeight: 1.5,
          color: "#F4F2EE",
          maxWidth: "82%",
        }}
      >
        ¿Puedo llevar a mi familia al Zócalo ahorita?
      </div>
      {/* Lote bubble */}
      <div
        style={{
          alignSelf: "flex-start",
          background: "rgba(20, 25, 45, 0.62)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "4px 16px 16px 16px",
          padding: "10px 13px",
          fontSize: 12,
          lineHeight: 1.5,
          color: "#F4F2EE",
          maxWidth: "88%",
        }}
      >
        Hay una marcha activa desde hace 40 min. El Zócalo está bloqueado.{" "}
        <span style={{ color: "#EE8B86", fontWeight: 600 }}>
          Mejor evítalo.
        </span>
        {/* Zone chips */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginTop: 9,
          }}
        >
          <span
            style={{
              background: "rgba(217,48,48,0.1)",
              border: "1px solid rgba(217,48,48,0.35)",
              borderRadius: 8,
              padding: "3px 8px",
              fontSize: 9.5,
              color: "#EE8B86",
              fontFamily: "var(--mono)",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Zócalo · EVITAR
          </span>
          <span
            style={{
              background: "rgba(46,204,113,0.08)",
              border: "1px solid rgba(46,204,113,0.32)",
              borderRadius: 8,
              padding: "3px 8px",
              fontSize: 9.5,
              color: "#5BD996",
              fontFamily: "var(--mono)",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Eje Central · LIBRE
          </span>
        </div>
        {/* Sources */}
        <div
          style={{
            marginTop: 9,
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            color: "#D6B85E",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D6B85E"
            strokeWidth="2"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          6 fuentes confirman
        </div>
      </div>
    </div>
    {/* ── Input bar ── */}
    <div
      style={{
        margin: "0 12px 14px",
        background: "rgba(20, 25, 45, 0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          flex: 1,
          fontSize: 12,
          color: "rgba(244,242,238,0.35)",
        }}
      >
        Pregunta algo...
      </div>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 10,
          background: "linear-gradient(150deg,#E8563A,#D93030)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  </div>
);
