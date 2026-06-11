import React from "react";

export default function BriefingNote({ summary }: { summary: any[] }) {
  return (
    <div className="relative mx-4 mb-[14px] p-[13px] px-[14px] rounded-[18px] bg-white dark:bg-[#1A2034] border border-foreground/[0.08] dark:border-white/[0.07] flex gap-[11px]">
      <span className="w-[34px] h-[34px] rounded-[11px] bg-primary flex items-center justify-center shrink-0">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
          <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
            <path d="M15 18 8 13"></path>
            <path d="M14 23 6 22"></path>
            <path d="M15 28 8 32"></path>
            <path d="M33 18 40 13"></path>
            <path d="M34 23 42 22"></path>
            <path d="M33 28 40 32"></path>
          </g>
          <ellipse cx="24" cy="24" rx="10.5" ry="11.5" fill="#fff"></ellipse>
          <circle cx="20" cy="23" r="1.6" fill="#D93030"></circle>
          <circle cx="28" cy="23" r="1.6" fill="#D93030"></circle>
          <path d="M21 28 Q24 30 27 28" stroke="#D93030" strokeWidth="1.8" strokeLinecap="round" fill="none"></path>
        </svg>
      </span>
      <div className="text-[13.5px] leading-[1.5] text-[var(--text3)]">
        {summary.map((seg, i) => (
          <span key={i} style={{ fontWeight: seg.w }} className={seg.w === 600 ? "text-foreground" : ""}>
            {seg.t}
          </span>
        ))}
      </div>
    </div>
  );
}
