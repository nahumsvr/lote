import React from "react";
import Link from "next/link";
import { PhoneMockup, MapMockupScreen } from "./PhoneMockups";

export const HeroSection = () => {
  return (
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
          <PhoneMockup>
            <MapMockupScreen />
          </PhoneMockup>
        </div>
      </div>
    </header>
  );
};
