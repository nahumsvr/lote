import React from "react";
import Link from "next/link";
import { LoteMark } from "./LoteMark";

export const Navbar = () => {
  return (
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
  );
};
