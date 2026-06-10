"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, MessageSquare, MapPin, Settings } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 pb-6 pt-2 bg-[var(--nav-bg)] border-t border-[var(--line)] backdrop-blur-md">
      <NavItem href="/" icon={<Map size={23} strokeWidth={1.8} />} label="Mapa" isActive={pathname === "/"} />
      <NavItem href="/chat" icon={<MessageSquare size={23} strokeWidth={1.8} />} label="Chat" isActive={pathname === "/chat"} />
      <NavItem href="/zonas" icon={<MapPin size={23} strokeWidth={1.8} />} label="Zonas" isActive={pathname === "/zonas"} />
      <NavItem href="/config" icon={<Settings size={23} strokeWidth={1.8} />} label="Config" isActive={pathname === "/config"} />
    </nav>
  );
}

function NavItem({ href, icon, label, isActive }: { href: string; icon: React.ReactNode; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`relative flex flex-col items-center gap-1 text-[10.5px] no-underline ${
        isActive ? "text-[var(--accent)] font-semibold" : "text-[var(--faint)] font-medium"
      }`}
    >
      {isActive && (
        <span className="absolute -top-[11px] w-[22px] h-[3px] rounded-full bg-[var(--accent)]" />
      )}
      {icon}
      <span>{label}</span>
    </Link>
  );
}
