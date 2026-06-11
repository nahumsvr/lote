"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ZoneProps {
  name: string;
  lat: number;
  lng: number;
  radius: number;
  status: "tranquilo" | "monitorear" | "evitar";
}

export interface MapProps {
  zones: ZoneProps[];
  center: [number, number];
}

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapWrapper(props: MapProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full min-h-[280px] bg-[var(--color-bg)] animate-pulse rounded-[16px]" />;
  }

  return <Map {...props} theme={resolvedTheme} />;
}