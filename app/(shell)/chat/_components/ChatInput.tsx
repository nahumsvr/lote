"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n/context"

interface ChatInputProps {
    onEnviar: (mensaje: string) => void
}

export default function ChatInput({ onEnviar }: ChatInputProps) {
    const [texto, setTexto] = useState("")
    const t = useTranslation()

    const handleEnviar = () => {
        if (!texto.trim()) return
        onEnviar(texto.trim())
        setTexto("")
    }

    return (
        <div className="flex items-center gap-2.5 px-4 py-3 border-t border-white/[0.07] bg-[#13172A]">
            <div className="flex-1 flex items-center gap-2.5 h-11 rounded-xl px-4 bg-black/30 border border-white/[0.07]">
                <input
                    type="text"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
                    placeholder={t.chat.placeholder}
                    className="flex-1 bg-transparent outline-none text-[14px] text-[#F4F2EE] placeholder:text-white/30 font-[family-name:var(--font-geist-sans)]"
                />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(244,242,238,0.4)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="3" width="6" height="11" rx="3" />
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
            </div>
            <button
                onClick={handleEnviar}
                className="w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center bg-[#D93030] hover:brightness-110 active:scale-95 transition-all"
            >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z" />
                </svg>
            </button>
        </div>
    )
}