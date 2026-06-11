import React from "react";

export const LoteMark = ({ size = 21 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
      <path d="M15 18 8 13" />
      <path d="M14 23 6 22" />
      <path d="M15 28 8 32" />
      <path d="M33 18 40 13" />
      <path d="M34 23 42 22" />
      <path d="M33 28 40 32" />
    </g>
    <ellipse cx="24" cy="24" rx="10.5" ry="11.5" fill="#fff" />
    <circle cx="20" cy="23" r="1.6" fill="#D93030" />
    <circle cx="28" cy="23" r="1.6" fill="#D93030" />
    <path
      d="M21 28 Q24 30 27 28"
      stroke="#D93030"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
