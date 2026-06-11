"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/context";

export default function NavBar() {
  const pathname = usePathname();
  const t = useTranslation();

  const tabs = [
    {
      name: t.nav.map,
      path: "/map",
      icon: (
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"></path>
          <path d="M9 4v14M15 6v14"></path>
        </svg>
      ),
    },
    {
      name: t.nav.chat,
      path: "/chat",
      icon: (
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 5h16v11H10l-5 4v-4H4Z"></path>
        </svg>
      ),
    },
    {
      name: t.nav.zones,
      path: "/zonas",
      icon: (
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.9 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z"></path>
        </svg>
      ),
    },
    {
      name: t.nav.settings,
      path: "/config",
      icon: (
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"></path>
        </svg>
      ),
    },
  ];


  return (
    <div className="relative flex sm:justify-center sm:items-center px-2 sm:px-8 sm:py-0 pt-[11px] pb-[22px] h-[84px] sm:h-[72px]">
      {/* Desktop Logo (Left aligned) */}
      <div className="hidden left-8 absolute sm:flex justify-center items-center bg-foreground rounded-full w-[38px] h-[38px]">
        <span className="font-sans font-extrabold text-[18px] text-background">
          N
        </span>
      </div>

      {/* Tabs */}
      <div className="sm:flex sm:gap-20 grid grid-cols-4 w-full sm:w-auto h-full">
        {tabs.map((tab) => {
          const isActive =
            pathname?.startsWith(tab.path) ||
            (tab.path === "/mapa" && pathname === "/");
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`relative flex flex-col items-center justify-center gap-[5px] h-full sm:w-[60px] ${isActive ? "text-primary" : "text-foreground/40 hover:text-foreground transition-colors"}`}
            >
              {isActive && (
                <>
                  {/* Mobile indicator */}
                  <span className="sm:hidden -top-[12px] absolute bg-primary rounded-full w-[22px] h-[3px]"></span>
                  {/* Desktop indicator */}
                  <span className="hidden sm:block top-0 absolute bg-primary w-[32px] h-[3px]"></span>
                </>
              )}
              {tab.icon}
              <span
                className={
                  isActive
                    ? "text-[10.5px] font-semibold"
                    : "text-[10.5px] font-medium"
                }
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
