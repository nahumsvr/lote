import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lote — Know which streets are safe, right now",
  description:
    "Lote watches Mexico City block by block and tells you straight up: where to go, what to dodge, and how to get there safe. No corporate fluff. No fear-mongering. Just the carnal who looks out for you.",
};

/* ─── Lote mascara SVG (reutilizable) ─────────────────────── */
const LoteMark = ({ size = 21 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
      <path d="M15 18 8 13" />
      <path d="M14 23 6 22" />
      <path d="M15 28 8 32" />
      <path d="M33 18 40 13" />
      <path d="M34 23 42 22" />
      <path d="M33 28 40 32" />
    </g>
    <ellipse cx="24" cy="24" rx="10.5" ry="11.5" fill="#fff" />
    <circle cx="20" cy="23" r="1.6" fill="#D93030" />
    <circle cx="28" cy="23" r="1.6" fill="#D93030" />
    <path
      d="M21 28 Q24 30 27 28"
      stroke="#D93030"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export default function InfoPage() {
  return (
    <>
      <style>{`
        /* ── tokens ── */
        :root {
          --page:#0A0D18; --bg:#13172A; --surface:#1E2438; --surface2:#171D33;
          --text:#F4F2EE; --mute:rgba(244,242,238,0.55); --faint:rgba(244,242,238,0.34);
          --line:rgba(255,255,255,0.07); --line2:rgba(255,255,255,0.05);
          --accent:#D93030; --accent2:#E8563A;
          --green:#2ECC71; --yellow:#F0B429; --red:#D93030;
          --greenT:#5BD996; --yellowT:#F0C566; --redT:#EE8B86;
          --gold:#D6B85E;
          --ui:'Geist',system-ui,sans-serif;
          --mono:'JetBrains Mono',ui-monospace,monospace;
        }
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:var(--page);color:var(--text);font-family:var(--ui);-webkit-font-smoothing:antialiased;}
        a{color:inherit;text-decoration:none;}

        /* ── typography ── */
        .display{font-size:clamp(38px,5.5vw,72px);font-weight:800;letter-spacing:-0.03em;line-height:1.05;}
        .h2{font-size:clamp(28px,3.8vw,48px);font-weight:700;letter-spacing:-0.025em;line-height:1.12;}
        .h3{font-size:clamp(22px,2.6vw,32px);font-weight:700;letter-spacing:-0.02em;line-height:1.15;}
        .lede{font-size:clamp(15px,1.5vw,18px);line-height:1.65;color:var(--mute);}
        .eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--mute);}
        .eyebrow.green{color:var(--greenT);}
        .sq{width:7px;height:7px;border-radius:2px;background:var(--accent2);display:inline-block;flex-shrink:0;}
        em{font-style:normal;color:var(--accent2);}
        strong{color:var(--text);font-weight:600;}
        .mono{font-family:var(--mono);}

        /* ── layout ── */
        .wrap{max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,52px);}
        .shell{position:relative;}

        /* ── ambient bg ── */
        .glows{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
        .glow{position:absolute;border-radius:50%;filter:blur(90px);opacity:0.9;}
        .g1{width:700px;height:600px;top:-200px;left:-200px;background:radial-gradient(circle,rgba(217,48,48,0.14),transparent 65%);}
        .g2{width:600px;height:500px;top:-100px;right:-180px;background:radial-gradient(circle,rgba(200,168,75,0.08),transparent 65%);}
        .g3{width:500px;height:400px;bottom:0;left:30%;background:radial-gradient(circle,rgba(46,204,113,0.05),transparent 65%);}
        .grain{position:fixed;inset:0;pointer-events:none;z-index:0;opacity:0.05;mix-blend-mode:overlay;}

        /* ── buttons ── */
        .btn{display:inline-flex;align-items:center;gap:9px;font-family:var(--ui);font-size:15px;font-weight:600;letter-spacing:-0.01em;padding:13px 22px;border-radius:13px;cursor:pointer;border:1px solid transparent;transition:transform .18s cubic-bezier(.2,.7,.3,1),box-shadow .25s,background .2s,border-color .2s;white-space:nowrap;}
        .btn svg{width:17px;height:17px;}
        .btn-primary{color:#fff;background:linear-gradient(150deg,var(--accent2),var(--accent));box-shadow:0 12px 30px -12px rgba(217,48,48,0.8),inset 0 1px 0 rgba(255,255,255,0.18);}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 18px 40px -12px rgba(217,48,48,0.9),inset 0 1px 0 rgba(255,255,255,0.2);}
        .btn-ghost{color:var(--text);background:rgba(255,255,255,0.04);border-color:var(--line);}
        .btn-ghost:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.16);transform:translateY(-2px);}
        .btn-lg{font-size:16px;padding:16px 26px;border-radius:15px;}

        /* ── nav ── */
        .nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(18px) saturate(1.2);background:linear-gradient(180deg,rgba(10,13,24,0.86),rgba(10,13,24,0.5));border-bottom:1px solid var(--line2);}
        .nav .wrap{display:flex;align-items:center;height:68px;gap:28px;}
        .brand{display:flex;align-items:center;gap:11px;font-weight:700;font-size:18px;letter-spacing:-0.02em;}
        .brand .mark{width:34px;height:34px;border-radius:11px;flex:0 0 auto;background:linear-gradient(150deg,var(--accent2),var(--accent));display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px -6px rgba(217,48,48,0.7);}
        @keyframes breath{0%,100%{opacity:0.85;}50%{opacity:0.5;}}
        .brand .mark svg{animation:breath 4.5s ease-in-out infinite;}
        .nav .links{display:flex;align-items:center;gap:26px;margin-left:14px;}
        .nav .links a{font-size:14px;color:var(--mute);transition:color .2s;}
        .nav .links a:hover{color:var(--text);}
        .nav .right{margin-left:auto;display:flex;align-items:center;gap:12px;}
        .nav .live{display:none;align-items:center;gap:7px;font-family:var(--mono);font-size:11px;letter-spacing:0.08em;color:var(--greenT);padding:6px 11px;border-radius:999px;background:rgba(46,204,113,0.1);border:1px solid rgba(46,204,113,0.28);}
        .nav .live .dot{width:6px;height:6px;border-radius:50%;background:var(--green);}
        @keyframes pulseDot{0%,100%{opacity:1;}50%{opacity:0.4;}}
        .nav .live .dot{animation:pulseDot 1.7s ease-in-out infinite;}
        @media(min-width:880px){.nav .live{display:inline-flex;}}

        /* ── sections ── */
        section{position:relative;}
        .sec{padding:clamp(72px,9vw,128px) 0;}
        .sec-head{max-width:62ch;}
        .sec-head .h2{margin-top:18px;}
        .sec-head .lede{margin-top:18px;}
        .center{text-align:center;margin-left:auto;margin-right:auto;}
        .center .lede{margin-left:auto;margin-right:auto;}
        .rule{height:1px;background:linear-gradient(90deg,transparent,var(--line),transparent);border:0;margin:0;}

        /* ── hero ── */
        .hero{padding:clamp(48px,7vw,92px) 0 clamp(56px,7vw,104px);}
        .hero .wrap{display:grid;grid-template-columns:1.05fr 0.95fr;gap:clamp(32px,5vw,72px);align-items:center;}
        @media(max-width:760px){.hero .wrap{grid-template-columns:1fr;} .hero-stage{display:none;}}
        .hero-copy{max-width:600px;}
        .hero-copy .display{margin-top:22px;}
        .hero-copy .lede{margin-top:24px;}
        .hero-cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px;}
        .hero-trust{display:flex;align-items:center;gap:18px;margin-top:34px;flex-wrap:wrap;}
        .hero-trust .tt{font-size:13px;color:var(--mute);line-height:1.4;}
        .hero-trust .tt b{color:var(--text);font-weight:600;}
        .hero-stage{position:relative;display:flex;justify-content:center;align-items:center;min-height:560px;}

        /* background radar circles */
        .radar-circles{position:absolute;inset:0;display:flex;justify-content:center;align-items:center;pointer-events:none;z-index:0;}
        .radar-circle{position:absolute;border-radius:50%;border:1px solid rgba(232,86,58,0.05);transition:border-color 0.5s ease;}
        .radar-circle.rc1{width:450px;height:450px;border-color:rgba(232,86,58,0.07);}
        .radar-circle.rc2{width:680px;height:680px;border-color:rgba(232,86,58,0.04);}
        .radar-circle.rc3{width:900px;height:900px;border-color:rgba(232,86,58,0.02);}

        /* floating chips */
        @keyframes floaty{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        .float-chip{position:absolute;display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.06em;padding:10px 16px;border-radius:14px;background:rgba(14,18,30,0.8);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 20px 40px -15px rgba(0,0,0,0.7);z-index:10;animation:floaty 6s ease-in-out infinite;}
        .float-chip .d{width:8px;height:8px;border-radius:50%;}
        .float-chip.green{color:#5BD996;border:1px solid rgba(46,204,113,0.3);} .float-chip.green .d{background:#2ECC71;box-shadow:0 0 10px var(--green);}
        .float-chip.red{color:#EE8B86;border:1px solid rgba(217,48,48,0.35);} .float-chip.red .d{background:#D93030;box-shadow:0 0 10px var(--red);}
        .float-chip.yellow{color:#F0C566;border:1px solid rgba(240,180,41,0.35);} .float-chip.yellow .d{background:#F0B429;box-shadow:0 0 10px var(--yellow);}
        .float-chip.c1{top:8%;left:-2%;animation-delay:0s;}
        .float-chip.c2{top:40%;right:-6%;animation-delay:-2s;}
        .float-chip.c3{bottom:9%;left:4%;animation-delay:-4s;}

        /* ── phone frame ── */
        .phone-frame{position:relative;width:312px;height:676px;flex:0 0 auto;border-radius:46px;padding:0;background:#090B15;box-shadow:0 40px 90px -30px rgba(0,0,0,0.95),0 0 0 1.5px rgba(232,86,58,0.35),0 0 0 9px #0C0F1D,0 0 0 10.5px rgba(232,86,58,0.45),0 0 28px rgba(232,86,58,0.35),inset 0 0 0 1px rgba(255,255,255,0.04);transition:transform 0.3s ease;}
        .phone-frame .screen{position:absolute;inset:0;border-radius:46px;overflow:hidden;background:#0C0F19;}
        .phone-frame .notch{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:104px;height:26px;border-radius:0 0 16px 16px;background:#090B15;z-index:4;}
        .phone-frame .gleam{position:absolute;inset:0;border-radius:46px;pointer-events:none;z-index:5;background:linear-gradient(135deg,rgba(255,255,255,0.08),transparent 28%);mix-blend-mode:screen;}
        .phone-tag{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--faint);padding:7px 12px;border-radius:999px;background:rgba(255,255,255,0.03);border:1px solid var(--line);}
        .phone-tag .d{width:6px;height:6px;border-radius:50%;background:var(--accent2);}

        /* ── zone cards ── */
        .zones{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:46px;}
        @media(max-width:640px){.zones{grid-template-columns:1fr;}}
        .zone-card{position:relative;padding:26px 24px;border-radius:18px;border:1px solid var(--line);background:linear-gradient(180deg,var(--surface),var(--surface2));overflow:hidden;}
        .zone-card .bar{position:absolute;top:0;left:0;right:0;height:3px;}
        .zone-card.green .bar{background:var(--green);} .zone-card.yellow .bar{background:var(--yellow);} .zone-card.red .bar{background:var(--red);}
        .zone-card .glyph{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12px;letter-spacing:0.08em;font-weight:600;}
        .zone-card .glyph .d{width:11px;height:11px;border-radius:50%;}
        .zone-card.green .glyph{color:var(--greenT);} .zone-card.green .glyph .d{background:var(--green);box-shadow:0 0 12px var(--green);}
        .zone-card.yellow .glyph{color:var(--yellowT);} .zone-card.yellow .glyph .d{background:var(--yellow);box-shadow:0 0 12px var(--yellow);}
        .zone-card.red .glyph{color:var(--redT);} .zone-card.red .glyph .d{background:var(--red);box-shadow:0 0 12px var(--red);}
        .zone-card h3{margin-top:16px;font-size:21px;font-weight:700;letter-spacing:-0.015em;}
        .zone-card p{margin:10px 0 0;font-size:14.5px;line-height:1.55;color:var(--mute);}

        /* ── showcase rows ── */
        .show{display:grid;grid-template-columns:1fr 1fr;gap:clamp(36px,5vw,80px);align-items:center;}
        .show+.show{margin-top:clamp(72px,8vw,120px);}
        .show.flip .show-media{order:2;}
        @media(max-width:760px){.show{grid-template-columns:1fr;} .show.flip .show-media{order:unset;} .show-media{display:none;}}
        .show-media{display:flex;justify-content:center;position:relative;}
        .show-copy .h3{margin-top:18px;}
        .show-copy .lede{margin-top:16px;}
        .feat-list{list-style:none;margin:26px 0 0;padding:0;display:flex;flex-direction:column;gap:14px;}
        .feat-list li{display:flex;gap:13px;align-items:flex-start;font-size:15px;color:var(--mute);line-height:1.5;}
        .feat-list li b{color:var(--text);font-weight:600;}
        .feat-list .ic{flex:0 0 auto;width:26px;height:26px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(232,86,58,0.12);color:var(--accent2);margin-top:1px;}
        .feat-list .ic svg{width:15px;height:15px;}

        /* ── value grid ── */
        .vgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:52px;}
        @media(max-width:640px){.vgrid{grid-template-columns:1fr;}}
        .vcard{padding:28px 26px 30px;border-radius:18px;border:1px solid var(--line);background:linear-gradient(180deg,rgba(27,34,54,0.7),rgba(22,27,46,0.7));transition:transform .25s cubic-bezier(.2,.7,.3,1),border-color .25s,background .25s;}
        .vcard:hover{transform:translateY(-4px);border-color:rgba(232,86,58,0.35);background:linear-gradient(180deg,rgba(33,41,64,0.8),rgba(24,30,50,0.8));}
        .vcard .ic{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;background:rgba(232,86,58,0.12);color:var(--accent2);margin-bottom:20px;}
        .vcard .ic svg{width:24px;height:24px;}
        .vcard h3{font-size:20px;font-weight:700;letter-spacing:-0.015em;}
        .vcard p{margin:11px 0 0;font-size:14.5px;line-height:1.58;color:var(--mute);}

        /* ── world cup band ── */
        .cup{position:relative;border-radius:28px;overflow:hidden;border:1px solid var(--line);background:radial-gradient(120% 140% at 0% 0%,rgba(217,48,48,0.18),transparent 50%),radial-gradient(120% 160% at 100% 100%,rgba(200,168,75,0.12),transparent 55%),linear-gradient(180deg,var(--surface),var(--surface2));padding:clamp(40px,5vw,68px);}
        .cup .top{display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
        .cup .h2{margin-top:22px;max-width:18ch;}
        .cup .lede{margin-top:20px;max-width:56ch;}
        .cup-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:44px;}
        @media(max-width:640px){.cup-stats{grid-template-columns:repeat(2,1fr);}}
        .cup-stat .n{font-size:clamp(34px,4vw,52px);font-weight:800;letter-spacing:-0.03em;line-height:1;}
        .cup-stat .n.c{color:var(--accent2);} .cup-stat .n.g{color:var(--gold);} .cup-stat .n.v{color:var(--greenT);}
        .cup-stat .l{margin-top:10px;font-size:13.5px;color:var(--mute);line-height:1.4;}
        .cup-stat .l .mono{display:block;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;color:var(--faint);margin-bottom:4px;}

        /* ── trust / sources ── */
        .trust-grid{display:grid;grid-template-columns:0.9fr 1.1fr;gap:clamp(36px,5vw,72px);align-items:center;}
        @media(max-width:760px){.trust-grid{grid-template-columns:1fr;}}
        .src-list{display:flex;flex-direction:column;gap:12px;}
        .src{display:flex;align-items:center;gap:15px;padding:18px 20px;border-radius:15px;border:1px solid var(--line);background:rgba(27,34,54,0.55);}
        .src .ic{width:42px;height:42px;border-radius:11px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:rgba(214,184,94,0.12);color:var(--gold);}
        .src .ic svg{width:21px;height:21px;}
        .src .tx b{display:block;font-size:15.5px;font-weight:600;}
        .src .tx span{font-size:13px;color:var(--mute);}
        .src .chk{margin-left:auto;font-family:var(--mono);font-size:11px;color:var(--greenT);display:flex;align-items:center;gap:6px;}
        .src .chk .d{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);}
        .confirm{display:inline-flex;align-items:center;gap:10px;margin-top:26px;font-family:var(--mono);font-size:12px;letter-spacing:0.06em;color:var(--gold);padding:10px 15px;border-radius:11px;background:rgba(214,184,94,0.08);border:1px solid rgba(214,184,94,0.26);}

        /* ── final cta ── */
        .final{position:relative;text-align:center;padding:clamp(80px,10vw,150px) 0;}
        .final .display{margin:22px auto 0;max-width:16ch;}
        .final .lede{margin:24px auto 0;}
        .final .hero-cta{justify-content:center;margin-top:38px;}
        .axotl{width:64px;height:64px;border-radius:20px;margin:0 auto;display:flex;align-items:center;justify-content:center;background:linear-gradient(150deg,var(--accent2),var(--accent));box-shadow:0 18px 40px -14px rgba(217,48,48,0.8);}
        .axotl svg{animation:breath 4.5s ease-in-out infinite;}

        /* ── footer ── */
        .foot{border-top:1px solid var(--line2);padding:44px 0 56px;}
        .foot .wrap{display:flex;align-items:flex-start;justify-content:space-between;gap:30px;flex-wrap:wrap;}
        .foot .brand{font-size:16px;}
        .foot .note{font-size:13px;color:var(--faint);max-width:38ch;line-height:1.55;margin-top:14px;}
        .foot .cols{display:flex;gap:64px;flex-wrap:wrap;}
        .foot .col h4{font-size:13px;font-weight:600;letter-spacing:0.04em;color:var(--faint);text-transform:uppercase;margin-bottom:14px;}
        .foot .col a{display:block;font-size:14px;color:var(--mute);margin-bottom:10px;transition:color .2s;}
        .foot .col a:hover{color:var(--text);}
        .foot .legal{width:100%;margin-top:36px;padding-top:22px;border-top:1px solid var(--line2);display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:12px;color:var(--faint);}

        /* ── scroll reveal ── */
        @media(prefers-reduced-motion:no-preference){
          .reveal{animation:rise .7s cubic-bezier(.2,.7,.3,1) both;}
        }
        @keyframes rise{from{transform:translateY(16px);}to{transform:translateY(0);}}
      `}</style>

      {/* Ambient background */}
      <div className="glows" aria-hidden>
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="glow g3" />
      </div>
      <svg className="grain" aria-hidden>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div className="shell">
        {/* ── NAV ── */}
        <nav className="nav">
          <div className="wrap">
            <a className="brand" href="#top">
              <span className="mark">
                <LoteMark />
              </span>
              Lote
            </a>
            <div className="links">
              <a href="#how">How it reads the city</a>
              <a href="#screens">The app</a>
              <a href="#worldcup">World Cup 2026</a>
              <a href="#sources">Sources</a>
            </div>
            <div className="right">
              <span className="live">
                <span className="dot" />
                MONITORING CDMX
              </span>
              <Link className="btn btn-primary" href="/map">
                Open Lote
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <header className="hero" id="top">
          <div className="wrap">
            <div className="hero-copy reveal">
              <span className="eyebrow">
                <span className="sq" />
                Real-time street safety · Mexico City
              </span>
              <h1 className="display" style={{ marginTop: 22 }}>
                Know which streets are <em>safe</em> — right now.
              </h1>
              <p className="lede" style={{ marginTop: 24 }}>
                Lote watches Mexico City block by block and tells you straight
                up: where to go, what to dodge, and how to get there safe.{" "}
                <strong>No corporate fluff. No fear-mongering.</strong> Just the
                carnal who looks out for you.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary btn-lg" href="/map">
                  Open Lote
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <a className="btn btn-ghost btn-lg" href="#how">
                  See how it works
                </a>
              </div>
              <div className="hero-trust">
                <div className="tt">
                  <b>Live across 7 zones</b> of CDMX
                  <br />
                  cross-checked against public feeds &amp; C5.
                </div>
              </div>
            </div>

            <div className="hero-stage reveal">
              {/* Concentric radar circles behind the phone */}
              <div className="radar-circles" aria-hidden>
                <div className="radar-circle rc1" />
                <div className="radar-circle rc2" />
                <div className="radar-circle rc3" />
              </div>
              <span className="float-chip green c1">
                <span className="d" />
                COYOACÁN · CLEAR
              </span>
              <span className="float-chip red c2">
                <span className="d" />
                CENTRO · AVOID
              </span>
              <span className="float-chip yellow c3">
                <span className="d" />
                DOCTORES · WATCH
              </span>
              <div className="phone-frame">
                <div className="notch" />
                <div
                  className="screen"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#0C0F19",
                    overflow: "hidden",
                  }}
                >
                  {/* Status Bar */}
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
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <svg
                        width="15"
                        height="10"
                        viewBox="0 0 17 11"
                        fill="currentColor"
                      >
                        <rect x="0" y="8" width="2" height="3" rx="0.5" />
                        <rect x="4" y="6" width="2" height="5" rx="0.5" />
                        <rect x="8" y="4" width="2" height="7" rx="0.5" />
                        <rect x="12" y="1" width="2" height="10" rx="0.5" />
                      </svg>
                      <svg
                        width="13"
                        height="10"
                        viewBox="0 0 14 11"
                        fill="currentColor"
                      >
                        <path d="M7 11c-.5 0-.9-.2-1.2-.5L.7 5.4c-.9-.9-.9-2.5 0-3.4C2.5.2 4.7-.2 7-.2s4.5.4 6.3 2.2c.9.9.9 2.5 0 3.4l-5.1 5.1c-.3.3-.7.5-1.2.5zm0-9.8C5.2 1.2 3.4 1.5 2 2.9l5 5 5-5C10.6 1.5 8.8 1.2 7 1.2z" />
                      </svg>
                      <svg
                        width="20"
                        height="10"
                        viewBox="0 0 22 11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="16"
                          height="9"
                          rx="2"
                          fill="none"
                        />
                        <rect
                          x="3"
                          y="3"
                          width="10"
                          height="5"
                          rx="1"
                          fill="currentColor"
                        />
                        <path d="M19 4v3" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

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
                      Todo tranquilo por tu rumbo. Hay{" "}
                      <strong style={{ color: "#E8563A" }}>1 zona</strong> que
                      mejor evitas esta noche.
                    </p>
                  </div>

                  {/* Map area */}
                  <div
                    style={{
                      flex: 1,
                      position: "relative",
                      minHeight: 0,
                      overflow: "hidden",
                    }}
                  >
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
                      <path
                        d="M 0 40 L 312 40 M 0 100 L 312 100 M 0 160 L 312 160 M 0 220 L 312 220 M 0 280 L 312 280"
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth="1"
                      />
                      <path
                        d="M 50 0 L 50 314 M 110 0 L 110 314 M 170 0 L 170 314 M 230 0 L 230 314 M 290 0 L 290 314"
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth="1"
                      />

                      {/* Diagonal Street Lines (Mock Map) */}
                      <path
                        d="M -20 180 L 330 110 M 80 -10 L 240 330 M 20 50 L 340 160 M -10 260 L 330 230 M 180 -10 L 60 330"
                        stroke="rgba(255,255,255,0.04)"
                        strokeWidth="1.5"
                      />

                      {/* Concentric radar rings centered around Roma Norte (154, 128) */}
                      <circle
                        cx="154"
                        cy="128"
                        r="30"
                        stroke="rgba(232, 86, 58, 0.08)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx="154"
                        cy="128"
                        r="65"
                        stroke="rgba(232, 86, 58, 0.05)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="154"
                        cy="128"
                        r="110"
                        stroke="rgba(232, 86, 58, 0.03)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="154"
                        cy="128"
                        r="160"
                        stroke="rgba(232, 86, 58, 0.02)"
                        strokeWidth="1"
                      />

                      {/* Organic Polygon Zones */}

                      {/* Polanco (Top Left) - Green */}
                      <path
                        d="M 50 30 Q 80 20 100 40 Q 115 70 85 85 Q 45 80 40 55 Q 35 35 50 30 Z"
                        fill="rgba(46,204,113,0.06)"
                        stroke="rgba(46,204,113,0.32)"
                        strokeWidth="1.5"
                      />
                      <circle cx="60" cy="50" r="3" fill="#2ECC71" />
                      <text
                        x="68"
                        y="53"
                        fontFamily="var(--mono)"
                        fontSize="7"
                        fontWeight="bold"
                        fill="rgba(91,217,150,0.8)"
                      >
                        POLANCO
                      </text>

                      {/* Condesa (Mid Left) - Green */}
                      <path
                        d="M 45 110 Q 75 105 85 125 Q 95 155 75 165 Q 45 165 35 145 Q 30 120 45 110 Z"
                        fill="rgba(46,204,113,0.06)"
                        stroke="rgba(46,204,113,0.32)"
                        strokeWidth="1.5"
                      />
                      <circle cx="50" cy="130" r="3" fill="#2ECC71" />
                      <text
                        x="58"
                        y="133"
                        fontFamily="var(--mono)"
                        fontSize="7"
                        fontWeight="bold"
                        fill="rgba(91,217,150,0.8)"
                      >
                        CONDESA
                      </text>

                      {/* Del Valle (Bottom Left) - Green */}
                      <path
                        d="M 55 190 Q 85 185 105 200 Q 115 235 90 250 Q 55 250 45 230 Q 38 205 55 190 Z"
                        fill="rgba(46,204,113,0.06)"
                        stroke="rgba(46,204,113,0.32)"
                        strokeWidth="1.5"
                      />
                      <circle cx="60" cy="215" r="3" fill="#2ECC71" />
                      <text
                        x="68"
                        y="218"
                        fontFamily="var(--mono)"
                        fontSize="7"
                        fontWeight="bold"
                        fill="rgba(91,217,150,0.8)"
                      >
                        DEL VALLE
                      </text>

                      {/* Coyoacán (Bottom Right) - Green */}
                      <path
                        d="M 185 190 Q 225 185 240 200 Q 250 235 225 250 Q 185 255 175 235 Q 170 205 185 190 Z"
                        fill="rgba(46,204,113,0.06)"
                        stroke="rgba(46,204,113,0.32)"
                        strokeWidth="1.5"
                      />
                      <circle cx="195" cy="215" r="3" fill="#2ECC71" />
                      <text
                        x="203"
                        y="218"
                        fontFamily="var(--mono)"
                        fontSize="7"
                        fontWeight="bold"
                        fill="rgba(91,217,150,0.8)"
                      >
                        COYOACÁN
                      </text>

                      {/* Roma Norte (Center) - Orange (Tú) */}
                      <path
                        d="M 125 110 Q 155 95 180 115 Q 195 140 175 160 Q 140 170 125 150 Q 115 130 125 110 Z"
                        fill="rgba(232,86,58,0.07)"
                        stroke="rgba(232,86,58,0.38)"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="154"
                        cy="128"
                        r="8"
                        fill="rgba(232, 86, 58, 0.2)"
                        stroke="#E8563A"
                        strokeWidth="1.8"
                      />
                      <circle cx="154" cy="128" r="3" fill="#E8563A" />
                      <text
                        x="130"
                        y="146"
                        fontFamily="var(--mono)"
                        fontSize="7"
                        fontWeight="bold"
                        fill="rgba(244, 242, 238, 0.7)"
                      >
                        TÚ · ROMA NORTE
                      </text>

                      {/* Doctores (Mid Right) - Yellow */}
                      <path
                        d="M 205 115 Q 235 110 250 125 Q 255 145 240 155 Q 215 160 205 145 Q 198 128 205 115 Z"
                        fill="rgba(240,180,41,0.06)"
                        stroke="rgba(240,180,41,0.32)"
                        strokeWidth="1.5"
                      />
                      <circle cx="218" cy="133" r="3" fill="#F0B429" />
                      <text
                        x="226"
                        y="136"
                        fontFamily="var(--mono)"
                        fontSize="7"
                        fontWeight="bold"
                        fill="rgba(240,197,102,0.8)"
                      >
                        DOCTORES
                      </text>

                      {/* Red Alert Zone (Top Right) */}
                      <path
                        d="M 195 35 Q 230 20 250 35 Q 265 60 245 75 Q 210 80 195 65 Q 185 48 195 35 Z"
                        fill="rgba(217,48,48,0.07)"
                        stroke="rgba(217,48,48,0.4)"
                        strokeWidth="1.5"
                      />
                      <circle cx="225" cy="48" r="8" fill="#D93030" />
                      <path d="M225 44 L229 51 L221 51 Z" fill="#fff" />
                      <rect
                        x="224.5"
                        y="47"
                        width="1"
                        height="2"
                        fill="#D93030"
                      />
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
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <circle cx="12" cy="12" r="7" />
                          <line x1="12" y1="1" x2="12" y2="5" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="1" y1="12" x2="5" y2="12" />
                          <line x1="19" y1="12" x2="23" y2="12" />
                        </svg>
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
                          borderRight:
                            i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3.5,
                          }}
                        >
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
                      Aguas con el Centro — hay marcha en{" "}
                      <strong style={{ color: "#fff", fontWeight: "600" }}>
                        5 de Febrero
                      </strong>{" "}
                      y el acceso al Zócalo está cerrado por el norte. Mejor
                      déjalo para mañana.
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
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          >
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
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        ),
                      },
                      {
                        l: "Zonas",
                        act: false,
                        icon: (
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        ),
                      },
                      {
                        l: "Config",
                        act: false,
                        icon: (
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          >
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
                        <span
                          style={{ fontSize: 9, fontWeight: 600, marginTop: 3 }}
                        >
                          {tab.l}
                        </span>
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
                <div className="gleam" />
              </div>
            </div>
          </div>
        </header>

        {/* ── HOW IT READS THE CITY ── */}
        <section className="sec" id="how">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow green">
                <span className="sq" />
                One simple language
              </span>
              <h2 className="h2" style={{ marginTop: 18 }}>
                The whole city, read like a traffic light.
              </h2>
              <p className="lede" style={{ marginTop: 18 }}>
                Every colonia gets a color, updated as the night moves. You
                don&apos;t read reports — you read green, yellow, red, and you
                keep moving.
              </p>
            </div>
            <div className="zones">
              <div className="zone-card green reveal">
                <span className="bar" />
                <span className="glyph">
                  <span className="d" />
                  GREEN · CLEAR
                </span>
                <h3>Go, tranquilo.</h3>
                <p>
                  Calm right now. Good to walk, eat, hang out. Polanco, Condesa,
                  Del Valle, Coyoacán tonight.
                </p>
              </div>
              <div className="zone-card yellow reveal">
                <span className="bar" />
                <span className="glyph">
                  <span className="d" />
                  YELLOW · WATCH
                </span>
                <h3>Keep your eyes open.</h3>
                <p>
                  Something&apos;s moving — a closure, a crowd, a march nearby.
                  Fine to pass, just stay sharp.
                </p>
              </div>
              <div className="zone-card red reveal">
                <span className="bar" />
                <span className="glyph">
                  <span className="d" />
                  RED · AVOID
                </span>
                <h3>Not tonight.</h3>
                <p>
                  Real movement happening. Lote routes you around it and shows
                  you the clear way through.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ── SCREENS / SHOWCASE ── */}
        <section className="sec" id="screens">
          <div className="wrap">
            <div className="sec-head reveal" style={{ marginBottom: 8 }}>
              <span className="eyebrow">
                <span className="sq" />
                Inside the app
              </span>
              <h2 className="h2" style={{ marginTop: 18 }}>
                A map that&apos;s alive, and a carnal who answers.
              </h2>
            </div>

            {/* row 1: map */}
            <div className="show reveal" style={{ marginTop: 56 }}>
              <div className="show-media">
                <div>
                  <div className="phone-frame">
                    <div className="notch" />
                    <div
                      className="screen"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        background: "#0C0F19",
                        overflow: "hidden",
                      }}
                    >
                      {/* Status Bar */}
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
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            alignItems: "center",
                          }}
                        >
                          <svg
                            width="15"
                            height="10"
                            viewBox="0 0 17 11"
                            fill="currentColor"
                          >
                            <rect x="0" y="8" width="2" height="3" rx="0.5" />
                            <rect x="4" y="6" width="2" height="5" rx="0.5" />
                            <rect x="8" y="4" width="2" height="7" rx="0.5" />
                            <rect x="12" y="1" width="2" height="10" rx="0.5" />
                          </svg>
                          <svg
                            width="13"
                            height="10"
                            viewBox="0 0 14 11"
                            fill="currentColor"
                          >
                            <path d="M7 11c-.5 0-.9-.2-1.2-.5L.7 5.4c-.9-.9-.9-2.5 0-3.4C2.5.2 4.7-.2 7-.2s4.5.4 6.3 2.2c.9.9.9 2.5 0 3.4l-5.1 5.1c-.3.3-.7.5-1.2.5zm0-9.8C5.2 1.2 3.4 1.5 2 2.9l5 5 5-5C10.6 1.5 8.8 1.2 7 1.2z" />
                          </svg>
                          <svg
                            width="20"
                            height="10"
                            viewBox="0 0 22 11"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <rect
                              x="1"
                              y="1"
                              width="16"
                              height="9"
                              rx="2"
                              fill="none"
                            />
                            <rect
                              x="3"
                              y="3"
                              width="10"
                              height="5"
                              rx="1"
                              fill="currentColor"
                            />
                            <path d="M19 4v3" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>

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
                          Todo tranquilo por tu rumbo. Hay{" "}
                          <strong style={{ color: "#E8563A" }}>1 zona</strong>{" "}
                          que mejor evitas esta noche.
                        </p>
                      </div>

                      {/* Map area */}
                      <div
                        style={{
                          flex: 1,
                          position: "relative",
                          minHeight: 0,
                          overflow: "hidden",
                        }}
                      >
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
                          <path
                            d="M 0 40 L 312 40 M 0 100 L 312 100 M 0 160 L 312 160 M 0 220 L 312 220 M 0 280 L 312 280"
                            stroke="rgba(255,255,255,0.03)"
                            strokeWidth="1"
                          />
                          <path
                            d="M 50 0 L 50 314 M 110 0 L 110 314 M 170 0 L 170 314 M 230 0 L 230 314 M 290 0 L 290 314"
                            stroke="rgba(255,255,255,0.03)"
                            strokeWidth="1"
                          />

                          {/* Diagonal Street Lines (Mock Map) */}
                          <path
                            d="M -20 180 L 330 110 M 80 -10 L 240 330 M 20 50 L 340 160 M -10 260 L 330 230 M 180 -10 L 60 330"
                            stroke="rgba(255,255,255,0.04)"
                            strokeWidth="1.5"
                          />

                          {/* Concentric radar rings centered around Roma Norte (154, 128) */}
                          <circle
                            cx="154"
                            cy="128"
                            r="30"
                            stroke="rgba(232, 86, 58, 0.08)"
                            strokeWidth="1"
                            strokeDasharray="3 3"
                          />
                          <circle
                            cx="154"
                            cy="128"
                            r="65"
                            stroke="rgba(232, 86, 58, 0.05)"
                            strokeWidth="1"
                          />
                          <circle
                            cx="154"
                            cy="128"
                            r="110"
                            stroke="rgba(232, 86, 58, 0.03)"
                            strokeWidth="1"
                          />
                          <circle
                            cx="154"
                            cy="128"
                            r="160"
                            stroke="rgba(232, 86, 58, 0.02)"
                            strokeWidth="1"
                          />

                          {/* Organic Polygon Zones */}

                          {/* Polanco (Top Left) - Green */}
                          <path
                            d="M 50 30 Q 80 20 100 40 Q 115 70 85 85 Q 45 80 40 55 Q 35 35 50 30 Z"
                            fill="rgba(46,204,113,0.06)"
                            stroke="rgba(46,204,113,0.32)"
                            strokeWidth="1.5"
                          />
                          <circle cx="60" cy="50" r="3" fill="#2ECC71" />
                          <text
                            x="68"
                            y="53"
                            fontFamily="var(--mono)"
                            fontSize="7"
                            fontWeight="bold"
                            fill="rgba(91,217,150,0.8)"
                          >
                            POLANCO
                          </text>

                          {/* Condesa (Mid Left) - Green */}
                          <path
                            d="M 45 110 Q 75 105 85 125 Q 95 155 75 165 Q 45 165 35 145 Q 30 120 45 110 Z"
                            fill="rgba(46,204,113,0.06)"
                            stroke="rgba(46,204,113,0.32)"
                            strokeWidth="1.5"
                          />
                          <circle cx="50" cy="130" r="3" fill="#2ECC71" />
                          <text
                            x="58"
                            y="133"
                            fontFamily="var(--mono)"
                            fontSize="7"
                            fontWeight="bold"
                            fill="rgba(91,217,150,0.8)"
                          >
                            CONDESA
                          </text>

                          {/* Del Valle (Bottom Left) - Green */}
                          <path
                            d="M 55 190 Q 85 185 105 200 Q 115 235 90 250 Q 55 250 45 230 Q 38 205 55 190 Z"
                            fill="rgba(46,204,113,0.06)"
                            stroke="rgba(46,204,113,0.32)"
                            strokeWidth="1.5"
                          />
                          <circle cx="60" cy="215" r="3" fill="#2ECC71" />
                          <text
                            x="68"
                            y="218"
                            fontFamily="var(--mono)"
                            fontSize="7"
                            fontWeight="bold"
                            fill="rgba(91,217,150,0.8)"
                          >
                            DEL VALLE
                          </text>

                          {/* Coyoacán (Bottom Right) - Green */}
                          <path
                            d="M 185 190 Q 225 185 240 200 Q 250 235 225 250 Q 185 255 175 235 Q 170 205 185 190 Z"
                            fill="rgba(46,204,113,0.06)"
                            stroke="rgba(46,204,113,0.32)"
                            strokeWidth="1.5"
                          />
                          <circle cx="195" cy="215" r="3" fill="#2ECC71" />
                          <text
                            x="203"
                            y="218"
                            fontFamily="var(--mono)"
                            fontSize="7"
                            fontWeight="bold"
                            fill="rgba(91,217,150,0.8)"
                          >
                            COYOACÁN
                          </text>

                          {/* Roma Norte (Center) - Orange (Tú) */}
                          <path
                            d="M 125 110 Q 155 95 180 115 Q 195 140 175 160 Q 140 170 125 150 Q 115 130 125 110 Z"
                            fill="rgba(232,86,58,0.07)"
                            stroke="rgba(232,86,58,0.38)"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="154"
                            cy="128"
                            r="8"
                            fill="rgba(232, 86, 58, 0.2)"
                            stroke="#E8563A"
                            strokeWidth="1.8"
                          />
                          <circle cx="154" cy="128" r="3" fill="#E8563A" />
                          <text
                            x="130"
                            y="146"
                            fontFamily="var(--mono)"
                            fontSize="7"
                            fontWeight="bold"
                            fill="rgba(244, 242, 238, 0.7)"
                          >
                            TÚ · ROMA NORTE
                          </text>

                          {/* Doctores (Mid Right) - Yellow */}
                          <path
                            d="M 205 115 Q 235 110 250 125 Q 255 145 240 155 Q 215 160 205 145 Q 198 128 205 115 Z"
                            fill="rgba(240,180,41,0.06)"
                            stroke="rgba(240,180,41,0.32)"
                            strokeWidth="1.5"
                          />
                          <circle cx="218" cy="133" r="3" fill="#F0B429" />
                          <text
                            x="226"
                            y="136"
                            fontFamily="var(--mono)"
                            fontSize="7"
                            fontWeight="bold"
                            fill="rgba(240,197,102,0.8)"
                          >
                            DOCTORES
                          </text>

                          {/* Red Alert Zone (Top Right) */}
                          <path
                            d="M 195 35 Q 230 20 250 35 Q 265 60 245 75 Q 210 80 195 65 Q 185 48 195 35 Z"
                            fill="rgba(217,48,48,0.07)"
                            stroke="rgba(217,48,48,0.4)"
                            strokeWidth="1.5"
                          />
                          <circle cx="225" cy="48" r="8" fill="#D93030" />
                          <path d="M225 44 L229 51 L221 51 Z" fill="#fff" />
                          <rect
                            x="224.5"
                            y="47"
                            width="1"
                            height="2"
                            fill="#D93030"
                          />
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
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
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
                                borderBottom:
                                  "1px solid rgba(255,255,255,0.06)",
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
                              borderRight:
                                i < 3
                                  ? "1px solid rgba(255,255,255,0.06)"
                                  : "none",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 3.5,
                              }}
                            >
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
                          Aguas con el Centro — hay marcha en{" "}
                          <strong style={{ color: "#fff", fontWeight: "600" }}>
                            5 de Febrero
                          </strong>{" "}
                          y el acceso al Zócalo está cerrado por el norte. Mejor
                          déjalo para mañana.
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
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                              >
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
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                            ),
                          },
                          {
                            l: "Zonas",
                            act: false,
                            icon: (
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                            ),
                          },
                          {
                            l: "Config",
                            act: false,
                            icon: (
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                              >
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
                              color: tab.act
                                ? "#E8563A"
                                : "rgba(244,242,238,0.4)",
                              cursor: "pointer",
                              position: "relative",
                              padding: "2px 4px",
                            }}
                          >
                            {tab.icon}
                            <span
                              style={{
                                fontSize: 9,
                                fontWeight: 600,
                                marginTop: 3,
                              }}
                            >
                              {tab.l}
                            </span>
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
                    <div className="gleam" />
                  </div>
                </div>
              </div>
              <div className="show-copy">
                <span className="phone-tag">
                  <span className="d" />
                  THE MAP · LIVE
                </span>
                <h3 className="h3">CDMX right now, zone by zone.</h3>
                <p className="lede">
                  Seven live zones, a radar sweeping for changes, your pin in
                  the middle of it. Incidents surface as they happen and the
                  city recolors around you.
                </p>
                <ul className="feat-list">
                  <li>
                    <span className="ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </span>
                    <span>
                      <b>Updated as it happens.</b> Marches, closures, crowds —
                      surfaced the moment feeds confirm them.
                    </span>
                  </li>
                  <li>
                    <span className="ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z" />
                        <circle cx="12" cy="10" r="2.6" />
                      </svg>
                    </span>
                    <span>
                      <b>Your pin, your block.</b> Everything is framed around
                      where you actually are.
                    </span>
                  </li>
                  <li>
                    <span className="ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 17 10 7l4 6 6-9" />
                        <path d="M4 21h16" />
                      </svg>
                    </span>
                    <span>
                      <b>Safe routes around red.</b> One tap to route around
                      whatever you should avoid.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* row 2: zonas + chat */}
            <div className="show flip reveal">
              <div className="show-media">
                <div>
                  <div className="phone-frame">
                    <div className="notch" />
                    <div
                      className="screen"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        background: "#0C0F19",
                        overflow: "hidden",
                      }}
                    >
                      {/* Status Bar */}
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
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            alignItems: "center",
                          }}
                        >
                          <svg
                            width="15"
                            height="10"
                            viewBox="0 0 17 11"
                            fill="currentColor"
                          >
                            <rect x="0" y="8" width="2" height="3" rx="0.5" />
                            <rect x="4" y="6" width="2" height="5" rx="0.5" />
                            <rect x="8" y="4" width="2" height="7" rx="0.5" />
                            <rect x="12" y="1" width="2" height="10" rx="0.5" />
                          </svg>
                          <svg
                            width="13"
                            height="10"
                            viewBox="0 0 14 11"
                            fill="currentColor"
                          >
                            <path d="M7 11c-.5 0-.9-.2-1.2-.5L.7 5.4c-.9-.9-.9-2.5 0-3.4C2.5.2 4.7-.2 7-.2s4.5.4 6.3 2.2c.9.9.9 2.5 0 3.4l-5.1 5.1c-.3.3-.7.5-1.2.5zm0-9.8C5.2 1.2 3.4 1.5 2 2.9l5 5 5-5C10.6 1.5 8.8 1.2 7 1.2z" />
                          </svg>
                          <svg
                            width="20"
                            height="10"
                            viewBox="0 0 22 11"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <rect
                              x="1"
                              y="1"
                              width="16"
                              height="9"
                              rx="2"
                              fill="none"
                            />
                            <rect
                              x="3"
                              y="3"
                              width="10"
                              height="5"
                              rx="1"
                              fill="currentColor"
                            />
                            <path d="M19 4v3" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>

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
                            background:
                              "linear-gradient(150deg,#E8563A,#D93030)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                            fill="none"
                          >
                            <g
                              stroke="white"
                              strokeWidth="2.4"
                              strokeLinecap="round"
                            >
                              <path d="M15 18 8 13" />
                              <path d="M14 23 6 22" />
                              <path d="M15 28 8 32" />
                              <path d="M33 18 40 13" />
                              <path d="M34 23 42 22" />
                              <path d="M33 28 40 32" />
                            </g>
                            <ellipse
                              cx="24"
                              cy="24"
                              rx="10.5"
                              ry="11.5"
                              fill="white"
                            />
                            <circle cx="20" cy="23" r="1.6" fill="#D93030" />
                            <circle cx="28" cy="23" r="1.6" fill="#D93030" />
                            <path
                              d="M21 28 Q24 30 27 28"
                              stroke="#D93030"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              fill="none"
                            />
                          </svg>
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
                          Hay una marcha activa desde hace 40 min. El Zócalo
                          está bloqueado.{" "}
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
                            background:
                              "linear-gradient(150deg,#E8563A,#D93030)",
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
                    <div className="gleam" />
                  </div>
                </div>
              </div>
              <div className="show-copy">
                <span className="phone-tag">
                  <span className="d" />
                  THE CHAT · ASK ANYTHING
                </span>
                <h3 className="h3">
                  &ldquo;Can I take my family to the Zócalo right now?&rdquo;
                </h3>
                <p className="lede">
                  Ask in plain words. Lote answers like a local who&apos;s
                  actually out there — clear, warm, no sugarcoating — and shows
                  you the route, the zones, and how many sources confirm it.
                </p>
                <ul className="feat-list">
                  <li>
                    <span className="ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 5h16v11H10l-5 4v-4H4Z" />
                      </svg>
                    </span>
                    <span>
                      <b>Talk, don&apos;t dig.</b> &ldquo;Is Coyoacán okay for
                      dinner?&rdquo; — get a straight answer back.
                    </span>
                  </li>
                  <li>
                    <span className="ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m4 12 4 4L20 6" />
                      </svg>
                    </span>
                    <span>
                      <b>Answers you can act on.</b> Inline route maps, zone
                      chips, and &ldquo;6 sources confirm&rdquo; so you trust
                      it.
                    </span>
                  </li>
                  <li>
                    <span className="ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M8 13s1.5 2 4 2 4-2 4-2" />
                        <path d="M9 9h.01M15 9h.01" />
                      </svg>
                    </span>
                    <span>
                      <b>A voice, not a bot.</b> The tone of a carnal looking
                      out for you — never alarmist.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ── WHY LOTE / VALUE ── */}
        <section className="sec" id="why">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">
                <span className="sq" />
                Why Lote
              </span>
              <h2 className="h2" style={{ marginTop: 18 }}>
                Built for a real night out in CDMX.
              </h2>
              <p className="lede" style={{ marginTop: 18 }}>
                Not a feed of fear. Not a wall of stats. A calm, local read on
                the city so you can actually enjoy it.
              </p>
            </div>
            <div className="vgrid">
              <div className="vcard reveal">
                <div className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <h3>Real-time, not yesterday.</h3>
                <p>
                  The city changes by the hour. Lote reads it as it moves —
                  zones recolor live, not on tomorrow&apos;s news.
                </p>
              </div>
              <div className="vcard reveal">
                <div className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 17 10 7l4 6 6-9" />
                    <path d="M4 21h16" />
                  </svg>
                </div>
                <h3>It points you somewhere.</h3>
                <p>
                  Every red comes with a way around. You don&apos;t just learn
                  what to avoid — you get the clear route out.
                </p>
              </div>
              <div className="vcard reveal">
                <div className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 3 2.4 5.2L20 9l-4 4 1 6-5-2.8L7 19l1-6-4-4 5.6-.8Z" />
                  </svg>
                </div>
                <h3>Local voice, no panic.</h3>
                <p>
                  Named for the ajolote — and it talks like one of us. Direct,
                  warm, al chile. Never corporate, never alarmist.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WORLD CUP 2026 ── */}
        <section className="sec" id="worldcup">
          <div className="wrap">
            <div className="cup reveal">
              <div className="top">
                <span className="eyebrow">
                  <span className="sq" />
                  The reason we built it now
                </span>
              </div>
              <h2 className="h2">Mexico City is about to host the world.</h2>
              <p className="lede">
                The 2026 World Cup brings millions of visitors to a city of 22
                million — packed metros, closed avenues, marches, fan zones, and
                match-day crowds. Locals and visitors alike need one calm read
                on where it&apos;s safe to be. That&apos;s Lote.
              </p>
              <div className="cup-stats">
                <div className="cup-stat">
                  <div className="n c">5</div>
                  <div className="l">
                    <span className="mono">CDMX matches</span>Hosted at Estadio
                    Azteca, including the opener.
                  </div>
                </div>
                <div className="cup-stat">
                  <div className="n g">5.5M</div>
                  <div className="l">
                    <span className="mono">Expected visitors</span>Across Mexico
                    through the tournament.
                  </div>
                </div>
                <div className="cup-stat">
                  <div className="n v">7</div>
                  <div className="l">
                    <span className="mono">Live zones</span>Monitored across the
                    city, expanding.
                  </div>
                </div>
                <div className="cup-stat">
                  <div className="n">24/7</div>
                  <div className="l">
                    <span className="mono">Always on</span>From pre-game to the
                    last metro home.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ── SOURCES / TRUST ── */}
        <section className="sec" id="sources">
          <div className="wrap">
            <div className="trust-grid">
              <div className="sec-head reveal">
                <span className="eyebrow">
                  <span className="sq" />
                  Where it gets the truth
                </span>
                <h2 className="h2" style={{ marginTop: 18 }}>
                  Cross-checked, never guessed.
                </h2>
                <p className="lede" style={{ marginTop: 18 }}>
                  Lote doesn&apos;t make calls on a hunch. Every zone and alert
                  is pieced together from public feeds and official channels —
                  and it tells you how many confirm it.
                </p>
                <div className="confirm">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m4 12 4 4L20 6" />
                  </svg>
                  6 sources confirm · before it ever shows red
                </div>
              </div>
              <div className="src-list reveal">
                {[
                  {
                    label: "C5 CDMX",
                    desc: "City command, cameras & incident feeds.",
                    icon: (
                      <>
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M3 9h18M8 14h8" />
                      </>
                    ),
                  },
                  {
                    label: "Mobility & transit",
                    desc: "Closures, metro status, road events.",
                    icon: (
                      <>
                        <path d="M4 17 10 7l4 6 6-9" />
                        <path d="M4 21h16" />
                      </>
                    ),
                  },
                  {
                    label: "Official channels",
                    desc: "City & protección civil announcements.",
                    icon: (
                      <>
                        <path d="M12 3a9 9 0 1 0 9 9" />
                        <path d="M12 3v9l6 3" />
                      </>
                    ),
                  },
                  {
                    label: "On-the-ground reports",
                    desc: "Verified local signals, weighed by source.",
                    icon: (
                      <>
                        <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z" />
                        <circle cx="12" cy="10" r="2.6" />
                      </>
                    ),
                  },
                ].map((s) => (
                  <div className="src" key={s.label}>
                    <span className="ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {s.icon}
                      </svg>
                    </span>
                    <span className="tx">
                      <b>{s.label}</b>
                      <span>{s.desc}</span>
                    </span>
                    <span className="chk">
                      <span className="d" />
                      LIVE
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="final">
          <div className="wrap reveal">
            <div className="axotl">
              <LoteMark size={40} />
            </div>
            <span
              className="eyebrow"
              style={{ marginTop: 24, display: "inline-flex" }}
            >
              <span className="sq" />
              Open it before you head out
            </span>
            <h2 className="display">Head out knowing the city.</h2>
            <p className="lede">
              Pull up Lote, read the colors, ask your question, go. Your carnal
              for the streets of CDMX during the World Cup and every night
              after.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" href="/map">
                Open Lote
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <a className="btn btn-ghost btn-lg" href="#top">
                Back to top
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="foot">
          <div className="wrap">
            <div>
              <a className="brand" href="#top">
                <span className="mark">
                  <LoteMark />
                </span>
                Lote
              </a>
              <p className="note">
                Real-time street safety for Mexico City. Named for the ajolote —
                local, direct, looking out for you.
              </p>
            </div>
            <div className="cols">
              <div className="col">
                <h4>App</h4>
                <Link href="/map">Open Lote</Link>
                <a href="#screens">The map</a>
                <a href="#screens">The chat</a>
              </div>
              <div className="col">
                <h4>About</h4>
                <a href="#how">How it works</a>
                <a href="#worldcup">World Cup 2026</a>
                <a href="#sources">Sources</a>
              </div>
              <div className="col">
                <h4>Reach</h4>
                <a href="#top">Contact</a>
                <a href="#top">Press</a>
                <a href="#top">Privacy</a>
              </div>
            </div>
            <div className="legal">
              <span>© 2026 Lote · Hecho en CDMX</span>
              <span>Not an emergency service · For emergencies call 911</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
