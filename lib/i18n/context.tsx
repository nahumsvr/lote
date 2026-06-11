"use client";
import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";

export type Locale = "en" | "es";
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, es };

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lote-locale") as Locale | null;
    if (saved && (saved === "en" || saved === "es")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("lote-locale", l);
    document.documentElement.lang = l;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale() {
  return useContext(I18nContext);
}

export function useTranslation() {
  const { t } = useContext(I18nContext);
  return t;
}
