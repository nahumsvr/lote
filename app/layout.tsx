import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/shared/NavBar";
import type { Metadata, Viewport } from "next";
import { BottomNav } from "./_components/shared/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lote — CDMX en tiempo real",
  description: "Agente de movilidad urbana en tiempo real para la Ciudad de México.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="h-[100dvh] flex flex-col bg-background text-foreground overflow-hidden">
        
        {/* Ambient glow + grain (global) */}
        <div className="fixed inset-0 pointer-events-none flex justify-center overflow-hidden">
          <div className="relative w-full max-w-2xl h-full">
            <div className="absolute -top-[120px] -left-[40px] w-[360px] h-[320px] bg-[radial-gradient(circle,rgba(217,48,48,0.08),transparent_65%)] dark:bg-[radial-gradient(circle,rgba(217,48,48,0.16),transparent_65%)]"></div>
            <div className="absolute -top-[80px] -right-[80px] w-[300px] h-[280px] bg-[radial-gradient(circle,rgba(200,168,75,0.10),transparent_68%)] dark:bg-[radial-gradient(circle,rgba(200,168,75,0.08),transparent_68%)]"></div>
          </div>
        </div>
        
        <svg className="fixed inset-0 w-full h-full opacity-[0.05] dark:opacity-[0.05] opacity-[0.04] pointer-events-none dark:mix-blend-overlay mix-blend-multiply z-0">
          <filter id="loteGrainZ"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"></feTurbulence></filter>
          <rect width="100%" height="100%" filter="url(#loteGrainZ)"></rect>
        </svg>

        {/* Main Content Area */}
        <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col relative z-10 overflow-hidden">
          {/* Status bar (mobile only) */}
          <div className="relative flex items-center justify-between px-[28px] pt-[16px] pb-[6px] sm:hidden shrink-0">
            <span className="font-mono text-[14px] font-medium">21:51</span>
            <span className="flex items-center gap-2 opacity-75">
              <svg width="18" height="13" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"></rect><rect x="4.5" y="5.5" width="3" height="6.5" rx="1"></rect><rect x="9" y="3" width="3" height="9" rx="1"></rect><rect x="13.5" y="0.5" width="3" height="11.5" rx="1"></rect></svg>
              <svg width="25" height="13" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="currentColor"></rect><rect x="2.5" y="2.5" width="14" height="7" rx="1.5" fill="currentColor"></rect><rect x="21.5" y="4" width="1.5" height="4" rx="0.75" fill="currentColor"></rect></svg>
            </span>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden relative">
            {children}
          </div>
        </div>

        {/* Bottom Nav (Full width on desktop) */}
        <div className="relative z-20 shrink-0 w-full bg-[rgba(255,255,255,0.94)] dark:bg-[rgba(19,23,42,0.92)] backdrop-blur-[14px] border-t border-[rgba(19,23,42,0.08)] dark:border-[rgba(255,255,255,0.07)]">
          <NavBar />
        </div>

      </body>
    </html>
  );
}
