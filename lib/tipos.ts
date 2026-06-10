export interface Evento {
  id: string;
  zona: string; // Ej: "Centro Histórico", "Roma Norte"
  alcaldia: string; // Ej: "Cuauhtémoc", "Coyoacán"
  estado: "tranquilo" | "monitorear" | "evitar";
  titulo: string;
  descripcion: string;
  fuente: "telegram" | "rss" | "reddit";
  fuentes_count: number; // Cuántas fuentes confirman el incidente
  lat: number;
  lng: number;
  timestamp: string; // ISO 8601
  confianza: number; // Rango 0-1
}
