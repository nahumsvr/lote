import React from "react";

export const WorldCupSection = () => {
  return (
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
  );
};
