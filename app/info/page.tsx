import type { Metadata } from "next";
import React from "react";
import { Navbar } from "./_components/Navbar";
import { HeroSection } from "./_components/HeroSection";
import { HowItWorksSection } from "./_components/HowItWorksSection";
import { ShowcaseSection } from "./_components/ShowcaseSection";
import { WhyLoteSection } from "./_components/WhyLoteSection";
import { WorldCupSection } from "./_components/WorldCupSection";
import { SourcesSection } from "./_components/SourcesSection";
import { FinalCtaSection } from "./_components/FinalCtaSection";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  title: "Lote — Know which streets are safe, right now",
  description:
    "Lote watches Mexico City block by block and tells you straight up: where to go, what to dodge, and how to get there safe. No corporate fluff. No fear-mongering. Just the carnal who looks out for you.",
};

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
        <Navbar />
        <HeroSection />
        <HowItWorksSection />
        <hr className="rule" />
        <ShowcaseSection />
        <hr className="rule" />
        <WhyLoteSection />
        <WorldCupSection />
        <hr className="rule" />
        <SourcesSection />
        <FinalCtaSection />
        <Footer />
      </div>
    </>
  );
}
