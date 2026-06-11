"use client";

import React from "react";
import BriefingNote from "./_components/BriefingNote";
import HereCard from "./_components/HereCard";
import ZoneGroup from "./_components/ZoneGroup";
import EmergencyFooter from "./_components/EmergencyFooter";
import { useTranslation } from "@/lib/i18n/context";

export default function ZonasPage() {
  const t = useTranslation();

  return (
    <>
      {/* header */}
      <div className="relative px-6 pt-[6px] pb-3">
        <div className="font-sans font-extrabold text-[30px] tracking-[-0.02em] leading-none mt-2">
          {t.zones.title} <span className="text-primary">{t.zones.titleAccent}</span>
        </div>
      </div>

      {/* briefing note from Lote */}
      <BriefingNote summary={t.zones.summary} />

      {/* scrollable zone list */}
      <div className="lote-scroll relative flex-auto min-h-0 overflow-y-auto px-4 pt-[2px] pb-[18px] touch-pan-y">
        <HereCard here={t.zones.here} />
        
        {t.zones.groups.map((g) => (
          <ZoneGroup key={g.key} group={g} />
        ))}

        <div className="font-mono text-[9.5px] text-[var(--faint)] text-center py-[2px] pb-1 leading-[1.5]">
          {t.zones.disclaimer}<br/>{t.zones.disclaimerSub}
        </div>
      </div>

      <EmergencyFooter />
    </>
  );
}
