import React from "react";
import { PhoneMockup, MapMockupScreen, ChatMockupScreen } from "./PhoneMockups";

export const ShowcaseSection = () => {
  return (
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
            <PhoneMockup>
              <MapMockupScreen />
            </PhoneMockup>
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
        <div className="show flip reveal" style={{ marginTop: "clamp(72px, 8vw, 120px)" }}>
          <div className="show-media">
            <PhoneMockup>
              <ChatMockupScreen />
            </PhoneMockup>
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
  );
};
