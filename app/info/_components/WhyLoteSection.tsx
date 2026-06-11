import React from "react";

export const WhyLoteSection = () => {
  return (
    <section className="sec" id="why">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">
            <span className="sq" />
            Why Lote
          </span>
          <h2 className="h2" style={{ marginTop: 18 }}>
            Built for a real night out in CDMX.
          </h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Not a feed of fear. Not a wall of stats. A calm, local read on
            the city so you can actually enjoy it.
          </p>
        </div>
        <div className="vgrid">
          <div className="vcard reveal">
            <div className="ic">
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
            </div>
            <h3>Real-time, not yesterday.</h3>
            <p>
              The city changes by the hour. Lote reads it as it moves —
              zones recolor live, not on tomorrow&apos;s news.
            </p>
          </div>
          <div className="vcard reveal">
            <div className="ic">
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
            </div>
            <h3>It points you somewhere.</h3>
            <p>
              Every red comes with a way around. You don&apos;t just learn
              what to avoid — you get the clear route out.
            </p>
          </div>
          <div className="vcard reveal">
            <div className="ic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3 2.4 5.2L20 9l-4 4 1 6-5-2.8L7 19l1-6-4-4 5.6-.8Z" />
              </svg>
            </div>
            <h3>Local voice, no panic.</h3>
            <p>
              Named for the ajolote — and it talks like one of us. Direct,
              warm, al chile. Never corporate, never alarmist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
