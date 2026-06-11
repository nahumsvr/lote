import React from "react";

export const HowItWorksSection = () => {
  return (
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
  );
};
