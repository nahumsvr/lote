import React from "react";

export const SourcesSection = () => {
  return (
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
  );
};
