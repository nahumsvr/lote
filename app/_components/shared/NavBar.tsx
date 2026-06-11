"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const tabs = [
    { name: "Mapa", path: "/mapa", icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"></path><path d="M9 4v14M15 6v14"></path></svg> },
    { name: "Chat", path: "/chat", icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H10l-5 4v-4H4Z"></path></svg> },
    { name: "Zonas", path: "/zonas", icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.9 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z"></path></svg> },
    { name: "Config", path: "/config", icon: <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"></path></svg> }
  ];

  return (
    <div className="flex sm:items-center sm:justify-center px-2 sm:px-8 pt-[11px] pb-[22px] sm:py-0 relative h-[84px] sm:h-[72px]">
      
      {/* Desktop Logo (Left aligned) */}
      <div className="hidden sm:flex absolute left-8 items-center justify-center w-[38px] h-[38px] rounded-full bg-foreground">
        <span className="text-background font-sans font-extrabold text-[18px]">N</span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 sm:flex sm:gap-20 w-full sm:w-auto h-full">
        {tabs.map((tab) => {
          const isActive = pathname?.startsWith(tab.path) || (tab.path === "/mapa" && pathname === "/");
          return (
            <Link key={tab.name} href={tab.path} className={`relative flex flex-col items-center justify-center gap-[5px] h-full sm:w-[60px] ${isActive ? "text-primary" : "text-foreground/40 hover:text-foreground transition-colors"}`}>
              {isActive && (
                <>
                  {/* Mobile indicator */}
                  <span className="absolute -top-[12px] w-[22px] h-[3px] rounded-full bg-primary sm:hidden"></span>
                  {/* Desktop indicator */}
                  <span className="hidden sm:block absolute top-0 w-[32px] h-[3px] bg-primary"></span>
                </>
              )}
              {tab.icon}
              <span className={isActive ? "text-[10.5px] font-semibold" : "text-[10.5px] font-medium"}>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
