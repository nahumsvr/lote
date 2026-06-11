"use client";

import dynamic from "next/dynamic";

// Define the props interface here since we need to pass them down
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
  return <Map {...props} />;
}
