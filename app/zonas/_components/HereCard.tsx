"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n/context";

export default function HereCard({ here }: { here: any }) {
  const t = useTranslation();

  return (
    <div className="relative bg-surface border border-[rgba(46,204,113,0.32)] rounded-[18px] p-[14px] px-[15px] overflow-hidden mb-5">
      <div className="absolute -top-10 -right-[30px] w-[150px] h-[120px] bg-[radial-gradient(circle,rgba(46,204,113,0.16),transparent_70%)] pointer-events-none"></div>
      
      <div className="relative flex items-center gap-[11px]">
        <span className="w-[34px] h-[34px] rounded-[11px] bg-[#2ECC71]/[0.14] border border-[#2ECC71]/40 flex items-center justify-center shrink-0">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--greenT)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"></path>
            <circle cx="12" cy="10" r="2.4"></circle>
          </svg>
        </span>
        <div className="flex-1">
          <div className="font-mono text-[9.5px] font-semibold tracking-[0.1em] text-[var(--greenT)] uppercase">{t.zones.youAreHere}</div>
          <div className="font-sans font-bold text-[16.5px] text-foreground mt-[2px]">Roma Norte</div>
        </div>
        <span className="px-[10px] py-1 rounded-lg bg-[rgba(46,204,113,0.13)] border border-[rgba(46,204,113,0.42)] font-mono text-[10px] font-semibold tracking-[0.03em] text-[var(--greenT)] shrink-0 uppercase">
          {t.status.clear}
        </span>
      </div>

      <div className="relative text-[13px] leading-[1.5] text-[var(--text3)] mt-[11px]">
        {here.desc.map((seg: any, i: number) => (
          <span key={i} style={{ fontWeight: seg.w }} className={seg.w === 600 ? "text-foreground" : ""}>
            {seg.t}
          </span>
        ))}
      </div>
    </div>
  );
}
