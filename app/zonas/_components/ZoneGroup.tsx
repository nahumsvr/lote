import React from "react";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "avoid":
      return {
        dot: "bg-primary",
        halo: "shadow-[0_0_0_4px_rgba(217,48,48,0.18)] dark:shadow-[0_0_0_4px_rgba(217,48,48,0.22)]",
        badgeBg: "bg-[rgba(217,48,48,0.12)] dark:bg-[rgba(217,48,48,0.14)]",
        badgeBorder: "border-[rgba(217,48,48,0.40)] dark:border-[rgba(217,48,48,0.45)]",
        badgeText: "text-[var(--redT)]",
        badge: "EVITAR",
        anim: "animate-[loteDot_2.2s_ease-in-out_infinite]",
        cardBg: "bg-[linear-gradient(180deg,rgba(217,48,48,0.08),rgba(217,48,48,0.02))] dark:bg-[linear-gradient(180deg,rgba(217,48,48,0.15),rgba(217,48,48,0.05))]",
        cardBorder: "border-[rgba(217,48,48,0.28)] dark:border-[rgba(217,48,48,0.32)]",
        cardShadow: "shadow-[0_16px_32px_-22px_rgba(217,48,48,0.3)] dark:shadow-[0_16px_32px_-20px_rgba(217,48,48,0.55)]",
      };
    case "watch":
      return {
        dot: "bg-warn",
        halo: "shadow-[0_0_0_4px_rgba(240,180,41,0.22)] dark:shadow-[0_0_0_4px_rgba(240,180,41,0.2)]",
        badgeBg: "bg-[rgba(240,180,41,0.18)] dark:bg-[rgba(240,180,41,0.15)]",
        badgeBorder: "border-[rgba(240,180,41,0.55)] dark:border-[rgba(240,180,41,0.50)]",
        badgeText: "text-[var(--warnT)]",
        badge: "MONITOREAR",
        anim: "animate-[loteDot_3.2s_ease-in-out_infinite]",
        cardBg: "bg-surface",
        cardBorder: "border-[rgba(19,23,42,0.09)] dark:border-[rgba(255,255,255,0.08)]",
        cardShadow: "shadow-none",
      };
    case "calm":
    default:
      return {
        dot: "bg-safe",
        halo: "shadow-[0_0_0_4px_rgba(46,204,113,0.16)] dark:shadow-[0_0_0_4px_rgba(46,204,113,0.18)]",
        badgeBg: "bg-[rgba(46,204,113,0.14)] dark:bg-[rgba(46,204,113,0.13)]",
        badgeBorder: "border-[rgba(46,204,113,0.45)] dark:border-[rgba(46,204,113,0.42)]",
        badgeText: "text-[var(--greenT)]",
        badge: "TRANQUILO",
        anim: "none",
        cardBg: "bg-surface",
        cardBorder: "border-[rgba(19,23,42,0.09)] dark:border-[rgba(255,255,255,0.08)]",
        cardShadow: "shadow-none",
      };
  }
};

function ZoneCard({ zone }: { zone: any }) {
  const s = getStatusStyles(zone.status);

  return (
    <div className={`${s.cardBg} border ${s.cardBorder} rounded-[16px] p-[14px] px-[15px] ${s.cardShadow}`}>
      <div className="flex items-start justify-between gap-[10px]">
        <div className="flex gap-[9px]">
          <span className={`w-[10px] h-[10px] rounded-full ${s.dot} mt-[5px] shrink-0 ${s.halo} ${s.anim}`}></span>
          <div>
            <div className="font-sans font-bold text-[15.5px] text-foreground">{zone.name}</div>
            <div className="font-mono text-[10px] text-[var(--mute)] mt-[3px]">{zone.meta}</div>
          </div>
        </div>
        <span className={`px-[10px] py-1 rounded-lg ${s.badgeBg} border ${s.badgeBorder} font-mono text-[10px] font-semibold tracking-[0.03em] ${s.badgeText} whitespace-nowrap shrink-0`}>
          {s.badge}
        </span>
      </div>

      <div className="text-[13px] leading-[1.5] text-[var(--text3)] mt-[11px]">
        {zone.desc.map((seg: any, i: number) => (
          <span key={i} style={{ fontWeight: seg.w }} className={seg.w === 600 ? "text-foreground" : ""}>
            {seg.t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-[10px] mt-[13px]">
        <div className="flex items-center gap-[14px] font-mono text-[10px] text-[var(--faint)]">
          <span className="flex items-center gap-[5px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9"></circle>
              <circle cx="12" cy="12" r="3.2" fill="var(--gold)" stroke="none"></circle>
            </svg>
            {zone.sources}
          </span>
          <span className="flex items-center gap-[5px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M12 7.5v5l3 1.8"></path>
            </svg>
            {zone.ago}
          </span>
        </div>
        {zone.hasCta && (
          <div className="flex items-center gap-[6px] px-[13px] py-2 rounded-[12px] bg-primary text-white text-[12px] font-semibold whitespace-nowrap shrink-0">
            {zone.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ZoneGroup({ group }: { group: any }) {
  return (
    <div className="mb-[22px]">
      <div className="flex items-center gap-[9px] mb-[11px] px-[2px]">
        <span className={`w-[7px] h-[7px] rounded-full ${group.color} ${group.shadowColor}`}></span>
        <span className={`font-mono text-[10.5px] font-semibold tracking-[0.1em] ${group.labelColor}`}>
          {group.label}
        </span>
        <span className="flex-1 h-[1px] bg-foreground/[0.08]"></span>
        <span className="font-mono text-[10px] text-[var(--faint)]">{group.count}</span>
      </div>
      <div className="flex flex-col gap-[11px]">
        {group.zones.map((z: any, i: number) => (
          <ZoneCard key={i} zone={z} />
        ))}
      </div>
    </div>
  );
}
