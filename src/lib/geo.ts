import type { Municipality } from "./types";

/** Coordenadas aproximadas de cabeceras municipales (piloto de demostración: altiplano cundiboyacense). */
export const MUNICIPALITIES: Municipality[] = [
  { name: "Ubaté", dept: "Cundinamarca", lat: 5.3089, lng: -73.8158 },
  { name: "Chiquinquirá", dept: "Boyacá", lat: 5.6177, lng: -73.8193 },
  { name: "Simijaca", dept: "Cundinamarca", lat: 5.5043, lng: -73.8514 },
  { name: "Susa", dept: "Cundinamarca", lat: 5.4537, lng: -73.8142 },
  { name: "Fúquene", dept: "Cundinamarca", lat: 5.4045, lng: -73.7967 },
  { name: "Cucunubá", dept: "Cundinamarca", lat: 5.2497, lng: -73.7663 },
  { name: "Lenguazaque", dept: "Cundinamarca", lat: 5.3067, lng: -73.7117 },
  { name: "Zipaquirá", dept: "Cundinamarca", lat: 5.0221, lng: -74.0058 },
  { name: "Chía", dept: "Cundinamarca", lat: 4.8617, lng: -74.0328 },
  { name: "Sopó", dept: "Cundinamarca", lat: 4.9077, lng: -73.9381 },
  { name: "Tocancipá", dept: "Cundinamarca", lat: 4.965, lng: -73.913 },
  { name: "Sogamoso", dept: "Boyacá", lat: 5.7146, lng: -72.9339 },
  { name: "Belén", dept: "Boyacá", lat: 6.0133, lng: -72.9111 },
  { name: "Paipa", dept: "Boyacá", lat: 5.78, lng: -73.1175 },
  { name: "Tunja", dept: "Boyacá", lat: 5.5353, lng: -73.3678 },
];

export const muni = (name: string) => MUNICIPALITIES.find((m) => m.name === name) ?? MUNICIPALITIES[0];

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Distancia por carretera estimada = línea recta × factor de sinuosidad (SIMULADO). */
export const ROAD_FACTOR = 1.35;
export const roadKm = (a: string, b: string) => haversineKm(muni(a), muni(b)) * ROAD_FACTOR;
