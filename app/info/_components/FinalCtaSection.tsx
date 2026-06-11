import React from "react";
import Link from "next/link";
import { LoteMark } from "./LoteMark";

export const FinalCtaSection = () => {
  return (
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
  );
};
