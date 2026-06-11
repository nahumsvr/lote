import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/shared/NavBar";
import { ThemeProvider } from "./ThemeProvider";
import { LocaleProvider } from "@/lib/i18n/context";

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
  title: "Lote — CDMX in real time",
  description:
    "Real-time urban mobility agent for Mexico City.",
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
    // aplicará el cliente hasta que ThemeProvider lee localStorage.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col bg-background h-[100dvh] overflow-hidden text-foreground transition-colors duration-300">
        <ThemeProvider>
          {/* Ambient glow + grain (global) — transición a los gradientes */}
          <div className="fixed inset-0 flex justify-center overflow-hidden pointer-events-none transition-colors duration-300">
            <div className="relative w-full max-w-2xl h-full">
              <div className="-top-[120px] -left-[40px] absolute bg-[radial-gradient(circle,rgba(217,48,48,0.06),transparent_65%)] dark:bg-[radial-gradient(circle,rgba(217,48,48,0.16),transparent_65%)] w-[360px] h-[320px] transition-colors duration-300"></div>
              <div className="-top-[80px] -right-[80px] absolute bg-[radial-gradient(circle,rgba(200,168,75,0.08),transparent_68%)] dark:bg-[radial-gradient(circle,rgba(200,168,75,0.08),transparent_68%)] w-[300px] h-[280px] transition-colors duration-300"></div>
            </div>
          </div>

          <svg className="z-0 fixed inset-0 opacity-[0.03] dark:opacity-[0.05] w-full h-full pointer-events-none dark:mix-blend-overlay mix-blend-multiply transition-opacity duration-300">
            <filter id="loteGrainZ">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="2"
                stitchTiles="stitch"
              ></feTurbulence>
            </filter>
            <rect width="100%" height="100%" filter="url(#loteGrainZ)"></rect>
          </svg>

          {/* Main Content Area */}
          <div className="z-10 relative flex flex-col flex-1 mx-auto w-full max-w-2xl overflow-hidden">
            <div className="relative flex flex-col flex-1 overflow-hidden">
              <LocaleProvider>{children}</LocaleProvider>
            </div>
          </div>

          {/* Bottom Nav (Full width on desktop) — CLASES DE TRANSICIÓN  */}
          <div className="z-20 relative bg-[rgba(255,255,255,0.94)] dark:bg-[rgba(19,23,42,0.92)] backdrop-blur-[14px] border-[rgba(19,23,42,0.08)] dark:border-[rgba(255,255,255,0.07)] border-t w-full shrink-0 transition-colors duration-300">
            <NavBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}