export default function EmergencyFooter() {
  return (
    <div className="relative shrink-0 bg-[rgba(244,242,238,0.98)] dark:bg-[rgba(17,21,38,0.97)] border-t border-foreground/[0.09] dark:border-white/[0.08] shadow-[0_-14px_28px_-18px_rgba(19,23,42,0.18)] dark:shadow-[0_-14px_28px_-18px_rgba(0,0,0,0.8)] pt-[13px] px-4 pb-[14px]">
      <div className="flex items-center justify-between mb-[10px]">
        <div className="flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"></path>
          </svg>
          <span className="font-sans font-bold text-[13.5px] text-foreground">Si algo se pone feo</span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.08em] text-[var(--faint)] uppercase">A LA MANO</span>
      </div>
      
      <div className="grid grid-cols-[0.78fr_1.11fr_1.11fr] gap-2">
        <div className="rounded-[13px] p-[9px] px-[11px] bg-primary flex flex-col gap-[2px] shadow-[0_8px_18px_-10px_rgba(217,48,48,0.7)]">
          <span className="font-mono text-[8px] font-semibold tracking-[0.08em] text-white/85">EMERGENCIAS</span>
          <span className="font-sans font-extrabold text-[21px] text-white leading-none">911</span>
        </div>
        
        <div className="rounded-[13px] p-[9px] px-[11px] bg-[rgba(19,23,42,0.035)] dark:bg-[rgba(255,255,255,0.045)] border border-[rgba(19,23,42,0.1)] dark:border-[rgba(255,255,255,0.1)] flex flex-col gap-[3px] justify-center">
          <span className="font-mono text-[8px] font-semibold tracking-[0.07em] text-[var(--gold)]">LOCATEL</span>
          <span className="font-mono text-[11.5px] font-medium text-foreground leading-tight">55 5658-1111</span>
        </div>
        
        <div className="rounded-[13px] p-[9px] px-[11px] bg-[rgba(19,23,42,0.035)] dark:bg-[rgba(255,255,255,0.045)] border border-[rgba(19,23,42,0.1)] dark:border-[rgba(255,255,255,0.1)] flex flex-col gap-[3px] justify-center">
          <span className="font-mono text-[8px] font-semibold tracking-[0.07em] text-[var(--gold)]">POLICÍA TURÍSTICA</span>
          <span className="font-mono text-[11.5px] font-medium text-foreground leading-tight">55 5250-8222</span>
        </div>
      </div>
    </div>
  );
}
