import React from "react";
import Link from "next/link";
import { LoteMark } from "./LoteMark";

export const Footer = () => {
  return (
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
  );
};
