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
      <path d="M15 18 8 13" /><path d="M14 23 6 22" /><path d="M15 28 8 32" />
      <path d="M33 18 40 13" /><path d="M34 23 42 22" /><path d="M33 28 40 32" />
    </g>
    <ellipse cx="24" cy="24" rx="10.5" ry="11.5" fill="#fff" />
    <circle cx="20" cy="23" r="1.6" fill="#D93030" />
    <circle cx="28" cy="23" r="1.6" fill="#D93030" />
    <path d="M21 28 Q24 30 27 28" stroke="#D93030" strokeWidth="1.8" strokeLinecap="round" fill="none" />
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

        /* floating chips */
        @keyframes floaty{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        .float-chip{position:absolute;display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:0.04em;padding:9px 13px;border-radius:11px;background:rgba(27,34,54,0.82);border:1px solid var(--line);backdrop-filter:blur(10px);box-shadow:0 16px 34px -18px rgba(0,0,0,0.8);z-index:3;animation:floaty 6s ease-in-out infinite;}
        .float-chip .d{width:8px;height:8px;border-radius:50%;}
        .float-chip.green{color:var(--greenT);} .float-chip.green .d{background:var(--green);box-shadow:0 0 10px var(--green);}
        .float-chip.red{color:var(--redT);} .float-chip.red .d{background:var(--red);box-shadow:0 0 10px var(--red);}
        .float-chip.yellow{color:var(--yellowT);} .float-chip.yellow .d{background:var(--yellow);box-shadow:0 0 10px var(--yellow);}
        .float-chip.c1{top:8%;left:-2%;animation-delay:0s;}
        .float-chip.c2{top:40%;right:-6%;animation-delay:-2s;}
        .float-chip.c3{bottom:9%;left:4%;animation-delay:-4s;}

        /* ── phone frame ── */
        .phone-frame{position:relative;width:312px;height:676px;flex:0 0 auto;border-radius:46px;padding:0;background:#05070F;box-shadow:0 50px 110px -40px rgba(0,0,0,0.9),0 0 0 2px rgba(255,255,255,0.05),0 0 0 11px #0C1020,0 0 0 12px rgba(255,255,255,0.06),inset 0 0 0 1px rgba(255,255,255,0.04);}
        .phone-frame .screen{position:absolute;inset:0;border-radius:46px;overflow:hidden;background:#13172A;}
        .phone-frame .notch{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:104px;height:26px;border-radius:0 0 16px 16px;background:#05070F;z-index:4;}
        .phone-frame .gleam{position:absolute;inset:0;border-radius:46px;pointer-events:none;z-index:5;background:linear-gradient(135deg,rgba(255,255,255,0.10),transparent 28%);mix-blend-mode:screen;}
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
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div className="shell">

        {/* ── NAV ── */}
        <nav className="nav">
          <div className="wrap">
            <a className="brand" href="#top">
              <span className="mark"><LoteMark /></span>
              Lote
            </a>
            <div className="links">
              <a href="#how">How it reads the city</a>
              <a href="#screens">The app</a>
              <a href="#worldcup">World Cup 2026</a>
              <a href="#sources">Sources</a>
            </div>
            <div className="right">
              <span className="live"><span className="dot" />MONITORING CDMX</span>
              <Link className="btn btn-primary" href="/map">
                Open Lote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <header className="hero" id="top">
          <div className="wrap">
            <div className="hero-copy reveal">
              <span className="eyebrow"><span className="sq" />Real-time street safety · Mexico City</span>
              <h1 className="display" style={{ marginTop: 22 }}>Know which streets are <em>safe</em> — right now.</h1>
              <p className="lede" style={{ marginTop: 24 }}>
                Lote watches Mexico City block by block and tells you straight up: where to go, what to dodge, and how to get there safe.{" "}
                <strong>No corporate fluff. No fear-mongering.</strong> Just the carnal who looks out for you.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary btn-lg" href="/map">
                  Open Lote
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
                <a className="btn btn-ghost btn-lg" href="#how">See how it works</a>
              </div>
              <div className="hero-trust">
                <div className="tt"><b>Live across 7 zones</b> of CDMX<br />cross-checked against public feeds &amp; C5.</div>
              </div>
            </div>

            <div className="hero-stage reveal">
              <span className="float-chip green c1"><span className="d" />COYOACÁN · CLEAR</span>
              <span className="float-chip red c2"><span className="d" />CENTRO · AVOID</span>
              <span className="float-chip yellow c3"><span className="d" />DOCTORES · WATCH</span>
              <div className="phone-frame">
                <div className="notch" />
                <div className="screen" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* Map screen placeholder — coloured zones */}
                  <svg width="312" height="676" viewBox="0 0 312 676" fill="none">
                    <rect width="312" height="676" fill="#0E1322" />
                    <rect x="30" y="180" width="110" height="90" rx="12" fill="rgba(46,204,113,0.18)" stroke="rgba(46,204,113,0.5)" strokeWidth="1" />
                    <rect x="160" y="200" width="120" height="80" rx="12" fill="rgba(217,48,48,0.22)" stroke="rgba(217,48,48,0.6)" strokeWidth="1" />
                    <rect x="50" y="290" width="130" height="70" rx="12" fill="rgba(240,180,41,0.17)" stroke="rgba(240,180,41,0.5)" strokeWidth="1" />
                    <circle cx="156" cy="338" r="8" fill="#E8563A" />
                    <circle cx="156" cy="338" r="14" fill="none" stroke="rgba(232,86,58,0.4)" strokeWidth="1.5" />
                    {/* Radar sweep */}
                    <circle cx="156" cy="338" r="60" fill="none" stroke="rgba(232,86,58,0.08)" strokeWidth="1" />
                    <circle cx="156" cy="338" r="90" fill="none" stroke="rgba(232,86,58,0.05)" strokeWidth="1" />
                    {/* Alert card at bottom */}
                    <rect x="14" y="530" width="284" height="80" rx="16" fill="rgba(30,36,56,0.95)" stroke="rgba(217,48,48,0.4)" strokeWidth="1" />
                    <circle cx="36" cy="560" r="8" fill="#D93030" />
                    <rect x="52" y="550" width="80" height="8" rx="4" fill="rgba(244,242,238,0.7)" />
                    <rect x="52" y="566" width="120" height="6" rx="3" fill="rgba(244,242,238,0.3)" />
                    <rect x="52" y="578" width="90" height="6" rx="3" fill="rgba(244,242,238,0.3)" />
                  </svg>
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
              <span className="eyebrow green"><span className="sq" />One simple language</span>
              <h2 className="h2" style={{ marginTop: 18 }}>The whole city, read like a traffic light.</h2>
              <p className="lede" style={{ marginTop: 18 }}>
                Every colonia gets a color, updated as the night moves. You don&apos;t read reports — you read green, yellow, red, and you keep moving.
              </p>
            </div>
            <div className="zones">
              <div className="zone-card green reveal">
                <span className="bar" />
                <span className="glyph"><span className="d" />GREEN · CLEAR</span>
                <h3>Go, tranquilo.</h3>
                <p>Calm right now. Good to walk, eat, hang out. Polanco, Condesa, Del Valle, Coyoacán tonight.</p>
              </div>
              <div className="zone-card yellow reveal">
                <span className="bar" />
                <span className="glyph"><span className="d" />YELLOW · WATCH</span>
                <h3>Keep your eyes open.</h3>
                <p>Something&apos;s moving — a closure, a crowd, a march nearby. Fine to pass, just stay sharp.</p>
              </div>
              <div className="zone-card red reveal">
                <span className="bar" />
                <span className="glyph"><span className="d" />RED · AVOID</span>
                <h3>Not tonight.</h3>
                <p>Real movement happening. Lote routes you around it and shows you the clear way through.</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ── SCREENS / SHOWCASE ── */}
        <section className="sec" id="screens">
          <div className="wrap">
            <div className="sec-head reveal" style={{ marginBottom: 8 }}>
              <span className="eyebrow"><span className="sq" />Inside the app</span>
              <h2 className="h2" style={{ marginTop: 18 }}>A map that&apos;s alive, and a carnal who answers.</h2>
            </div>

            {/* row 1: map */}
            <div className="show reveal" style={{ marginTop: 56 }}>
              <div className="show-media">
                <div>
                  <div className="phone-frame">
                    <div className="notch" />
                    <div className="screen" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="312" height="676" viewBox="0 0 312 676" fill="none">
                        <rect width="312" height="676" fill="#0E1322" />
                        <rect x="20" y="140" width="130" height="100" rx="14" fill="rgba(46,204,113,0.18)" stroke="rgba(46,204,113,0.45)" strokeWidth="1" />
                        <rect x="170" y="160" width="120" height="90" rx="14" fill="rgba(217,48,48,0.22)" stroke="rgba(217,48,48,0.55)" strokeWidth="1" />
                        <rect x="40" y="258" width="140" height="75" rx="14" fill="rgba(240,180,41,0.17)" stroke="rgba(240,180,41,0.45)" strokeWidth="1" />
                        <circle cx="156" cy="338" r="8" fill="#E8563A" />
                        <circle cx="156" cy="338" r="18" fill="none" stroke="rgba(232,86,58,0.35)" strokeWidth="1.5" />
                        <circle cx="156" cy="338" r="70" fill="none" stroke="rgba(232,86,58,0.07)" strokeWidth="1" />
                        <rect x="14" y="520" width="284" height="90" rx="18" fill="rgba(30,36,56,0.97)" stroke="rgba(217,48,48,0.38)" strokeWidth="1" />
                        <circle cx="36" cy="554" r="9" fill="#D93030" />
                        <rect x="54" y="543" width="90" height="8" rx="4" fill="rgba(244,242,238,0.75)" />
                        <rect x="54" y="559" width="140" height="6" rx="3" fill="rgba(244,242,238,0.3)" />
                        <rect x="54" y="572" width="110" height="6" rx="3" fill="rgba(244,242,238,0.3)" />
                      </svg>
                    </div>
                    <div className="gleam" />
                  </div>
                </div>
              </div>
              <div className="show-copy">
                <span className="phone-tag"><span className="d" />THE MAP · LIVE</span>
                <h3 className="h3">CDMX right now, zone by zone.</h3>
                <p className="lede">Seven live zones, a radar sweeping for changes, your pin in the middle of it. Incidents surface as they happen and the city recolors around you.</p>
                <ul className="feat-list">
                  <li>
                    <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span>
                    <span><b>Updated as it happens.</b> Marches, closures, crowds — surfaced the moment feeds confirm them.</span>
                  </li>
                  <li>
                    <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.6" /></svg></span>
                    <span><b>Your pin, your block.</b> Everything is framed around where you actually are.</span>
                  </li>
                  <li>
                    <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17 10 7l4 6 6-9" /><path d="M4 21h16" /></svg></span>
                    <span><b>Safe routes around red.</b> One tap to route around whatever you should avoid.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* row 2: chat */}
            <div className="show flip reveal">
              <div className="show-media">
                <div>
                  <div className="phone-frame">
                    <div className="notch" />
                    <div className="screen" style={{ display: "flex", flexDirection: "column", padding: "80px 16px 20px", gap: 12, background: "#13172A" }}>
                      {/* Chat bubbles */}
                      <div style={{ background: "rgba(30,36,56,0.9)", borderRadius: "16px 16px 16px 4px", padding: "12px 14px", fontSize: 13, lineHeight: 1.5, color: "#F4F2EE", maxWidth: "85%", border: "1px solid rgba(255,255,255,0.07)" }}>
                        ¿Puedo llevar a mi familia al Zócalo ahorita?
                      </div>
                      <div style={{ background: "linear-gradient(150deg,rgba(232,86,58,0.15),rgba(217,48,48,0.08))", borderRadius: "16px 16px 4px 16px", padding: "12px 14px", fontSize: 13, lineHeight: 1.5, color: "#F4F2EE", maxWidth: "90%", alignSelf: "flex-end", border: "1px solid rgba(217,48,48,0.3)" }}>
                        Hay una marcha activa en Centro Histórico desde hace 40 min. El Zócalo está bloqueado por el norte. <b style={{ color: "#EE8B86" }}>Mejor evítalo ahorita.</b>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ background: "rgba(217,48,48,0.14)", border: "1px solid rgba(217,48,48,0.4)", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "#EE8B86", fontFamily: "var(--mono)", fontWeight: 600, letterSpacing: "0.04em" }}>Zócalo · EVITAR</span>
                        <span style={{ background: "rgba(46,204,113,0.13)", border: "1px solid rgba(46,204,113,0.4)", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "#5BD996", fontFamily: "var(--mono)", fontWeight: 600, letterSpacing: "0.04em" }}>Eje Central · LIBRE</span>
                      </div>
                    </div>
                    <div className="gleam" />
                  </div>
                </div>
              </div>
              <div className="show-copy">
                <span className="phone-tag"><span className="d" />THE CHAT · ASK ANYTHING</span>
                <h3 className="h3">&ldquo;Can I take my family to the Zócalo right now?&rdquo;</h3>
                <p className="lede">Ask in plain words. Lote answers like a local who&apos;s actually out there — clear, warm, no sugarcoating — and shows you the route, the zones, and how many sources confirm it.</p>
                <ul className="feat-list">
                  <li>
                    <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H10l-5 4v-4H4Z" /></svg></span>
                    <span><b>Talk, don&apos;t dig.</b> &ldquo;Is Coyoacán okay for dinner?&rdquo; — get a straight answer back.</span>
                  </li>
                  <li>
                    <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 4 4L20 6" /></svg></span>
                    <span><b>Answers you can act on.</b> Inline route maps, zone chips, and &ldquo;6 sources confirm&rdquo; so you trust it.</span>
                  </li>
                  <li>
                    <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8 13s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01M15 9h.01" /></svg></span>
                    <span><b>A voice, not a bot.</b> The tone of a carnal looking out for you — never alarmist.</span>
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
              <span className="eyebrow"><span className="sq" />Why Lote</span>
              <h2 className="h2" style={{ marginTop: 18 }}>Built for a real night out in CDMX.</h2>
              <p className="lede" style={{ marginTop: 18 }}>Not a feed of fear. Not a wall of stats. A calm, local read on the city so you can actually enjoy it.</p>
            </div>
            <div className="vgrid">
              <div className="vcard reveal">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></div>
                <h3>Real-time, not yesterday.</h3>
                <p>The city changes by the hour. Lote reads it as it moves — zones recolor live, not on tomorrow&apos;s news.</p>
              </div>
              <div className="vcard reveal">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17 10 7l4 6 6-9" /><path d="M4 21h16" /></svg></div>
                <h3>It points you somewhere.</h3>
                <p>Every red comes with a way around. You don&apos;t just learn what to avoid — you get the clear route out.</p>
              </div>
              <div className="vcard reveal">
                <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.4 5.2L20 9l-4 4 1 6-5-2.8L7 19l1-6-4-4 5.6-.8Z" /></svg></div>
                <h3>Local voice, no panic.</h3>
                <p>Named for the ajolote — and it talks like one of us. Direct, warm, al chile. Never corporate, never alarmist.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WORLD CUP 2026 ── */}
        <section className="sec" id="worldcup">
          <div className="wrap">
            <div className="cup reveal">
              <div className="top">
                <span className="eyebrow"><span className="sq" />The reason we built it now</span>
              </div>
              <h2 className="h2">Mexico City is about to host the world.</h2>
              <p className="lede">The 2026 World Cup brings millions of visitors to a city of 22 million — packed metros, closed avenues, marches, fan zones, and match-day crowds. Locals and visitors alike need one calm read on where it&apos;s safe to be. That&apos;s Lote.</p>
              <div className="cup-stats">
                <div className="cup-stat">
                  <div className="n c">5</div>
                  <div className="l"><span className="mono">CDMX matches</span>Hosted at Estadio Azteca, including the opener.</div>
                </div>
                <div className="cup-stat">
                  <div className="n g">5.5M</div>
                  <div className="l"><span className="mono">Expected visitors</span>Across Mexico through the tournament.</div>
                </div>
                <div className="cup-stat">
                  <div className="n v">7</div>
                  <div className="l"><span className="mono">Live zones</span>Monitored across the city, expanding.</div>
                </div>
                <div className="cup-stat">
                  <div className="n">24/7</div>
                  <div className="l"><span className="mono">Always on</span>From pre-game to the last metro home.</div>
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
                <span className="eyebrow"><span className="sq" />Where it gets the truth</span>
                <h2 className="h2" style={{ marginTop: 18 }}>Cross-checked, never guessed.</h2>
                <p className="lede" style={{ marginTop: 18 }}>Lote doesn&apos;t make calls on a hunch. Every zone and alert is pieced together from public feeds and official channels — and it tells you how many confirm it.</p>
                <div className="confirm">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m4 12 4 4L20 6" /></svg>
                  6 sources confirm · before it ever shows red
                </div>
              </div>
              <div className="src-list reveal">
                {[
                  { label: "C5 CDMX", desc: "City command, cameras & incident feeds.", icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 14h8" /></> },
                  { label: "Mobility & transit", desc: "Closures, metro status, road events.", icon: <><path d="M4 17 10 7l4 6 6-9" /><path d="M4 21h16" /></> },
                  { label: "Official channels", desc: "City & protección civil announcements.", icon: <><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 3v9l6 3" /></> },
                  { label: "On-the-ground reports", desc: "Verified local signals, weighed by source.", icon: <><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.6" /></> },
                ].map((s) => (
                  <div className="src" key={s.label}>
                    <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg></span>
                    <span className="tx"><b>{s.label}</b><span>{s.desc}</span></span>
                    <span className="chk"><span className="d" />LIVE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="final">
          <div className="wrap reveal">
            <div className="axotl"><LoteMark size={40} /></div>
            <span className="eyebrow" style={{ marginTop: 24, display: "inline-flex" }}><span className="sq" />Open it before you head out</span>
            <h2 className="display">Head out knowing the city.</h2>
            <p className="lede">Pull up Lote, read the colors, ask your question, go. Your carnal for the streets of CDMX during the World Cup and every night after.</p>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" href="/map">
                Open Lote
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <a className="btn btn-ghost btn-lg" href="#top">Back to top</a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="foot">
          <div className="wrap">
            <div>
              <a className="brand" href="#top">
                <span className="mark"><LoteMark /></span>
                Lote
              </a>
              <p className="note">Real-time street safety for Mexico City. Named for the ajolote — local, direct, looking out for you.</p>
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
