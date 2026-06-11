import NavBar from "../_components/shared/NavBar";
import { LocaleProvider } from "@/lib/i18n/context";

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-background h-[100dvh] overflow-hidden text-foreground">
      {/* Ambient glow + grain (global) */}
      <div className="fixed inset-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="relative w-full max-w-2xl h-full">
          <div className="-top-[120px] -left-[40px] absolute bg-[radial-gradient(circle,rgba(217,48,48,0.08),transparent_65%)] dark:bg-[radial-gradient(circle,rgba(217,48,48,0.16),transparent_65%)] w-[360px] h-[320px]"></div>
          <div className="-top-[80px] -right-[80px] absolute bg-[radial-gradient(circle,rgba(200,168,75,0.10),transparent_68%)] dark:bg-[radial-gradient(circle,rgba(200,168,75,0.08),transparent_68%)] w-[300px] h-[280px]"></div>
        </div>
      </div>

      <svg className="z-0 fixed inset-0 opacity-[0.04] opacity-[0.05] dark:opacity-[0.05] w-full h-full pointer-events-none dark:mix-blend-overlay mix-blend-multiply">
        <filter id="loteGrainZ">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={2}
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

      {/* Bottom Nav */}
      <div className="z-20 relative bg-[rgba(255,255,255,0.94)] dark:bg-[rgba(19,23,42,0.92)] backdrop-blur-[14px] border-[rgba(19,23,42,0.08)] dark:border-[rgba(255,255,255,0.07)] border-t w-full shrink-0">
      </div>
    </div>
  );
}
