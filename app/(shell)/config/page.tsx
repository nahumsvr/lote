"use client";

import { useLocale, type Locale } from "@/lib/i18n/context";
import { ThemeToggle } from "../../_components/shared/ThemeToggle";

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇲🇽" },
];

export default function ConfigPage() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-5 pt-2 pb-8">
      {/* Header */}
      <div className="font-sans font-extrabold text-[30px] tracking-[-0.02em] leading-none mt-2 mb-6">
        {t.nav.settings}
      </div>

      {/* Appearance Section (Tu componente unificado al nuevo diseño) */}
      <div className="mb-8">
        <div className="font-mono text-[10px] font-semibold tracking-[0.1em] text-[var(--gold)] uppercase mb-3 px-1">
          {locale === "en" ? "Appearance" : "Apariencia"}
        </div>
        <div className="flex items-center justify-between bg-surface border border-foreground/[0.08] rounded-[14px] px-4 py-3.5">
          <div>
            <div className="font-sans font-bold text-[15px] text-foreground">
              {locale === "en" ? "Theme" : "Tema"}
            </div>
            <div className="text-[12.5px] text-[var(--mute)] mt-1">
              {locale === "en" ? "Toggle dark/light mode" : "Alternar modo claro y oscuro"}
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Language Section (De tus compañeros) */}
      <div className="mb-8">
        <div className="font-mono text-[10px] font-semibold tracking-[0.1em] text-[var(--gold)] uppercase mb-3 px-1">
          Language / Idioma
        </div>
        <div className="flex flex-col gap-2">
          {LANGUAGES.map((lang) => {
            const isActive = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-[14px] border transition-all text-left ${isActive
                  ? "bg-primary/[0.10] border-primary/40 shadow-[0_0_0_1px_rgba(217,48,48,0.15)]"
                  : "bg-surface border-foreground/[0.08] hover:border-foreground/[0.15]"
                  }`}
              >
                <span className="text-[22px]">{lang.flag}</span>
                <div className="flex-1">
                  <div className={`text-[15px] font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>
                    {lang.label}
                  </div>
                </div>
                {isActive && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* About Section (De tus compañeros) */}
      <div>
        <div className="font-mono text-[10px] font-semibold tracking-[0.1em] text-[var(--gold)] uppercase mb-3 px-1">
          About
        </div>
        <div className="bg-surface border border-foreground/[0.08] rounded-[14px] px-4 py-3.5">
          <div className="font-sans font-bold text-[15px] text-foreground">Lote</div>
          <div className="text-[12.5px] text-[var(--mute)] mt-1 leading-relaxed">
            {t.meta.description}
          </div>
          <div className="font-mono text-[9.5px] text-[var(--faint)] mt-3">
            v1.0 · CDMX · World Cup 2026
          </div>
        </div>
      </div>
    </div>
  );
}