import { haversineKm, muni, ROAD_FACTOR } from "./geo";
import type { Offer } from "./types";

/** Parámetros SIMULADOS para cálculos demostrativos. No es ruteo real. */
export const SIM = { copPerKm: 4200, maxClusterKm: 30 };

export function routeMetrics(stops: Offer[], destination: string) {
  const pts = stops.map((s) => muni(s.municipality));
  let km = 0;
  for (let i = 1; i < pts.length; i++) km += haversineKm(pts[i - 1], pts[i]);
  if (pts.length) km += haversineKm(pts[pts.length - 1], muni(destination));
  km *= ROAD_FACTOR;
  // ruta base: cada productor viaja por separado al destino (ida)
  const baseKm = pts.reduce((s, p) => s + haversineKm(p, muni(destination)) * ROAD_FACTOR, 0);
  const liters = stops.reduce((s, o) => s + o.liters, 0);
  return { km, baseKm, liters, cost: km * SIM.copPerKm, baseCost: baseKm * SIM.copPerKm, stops: stops.length };
}

function windowsOverlap(a: Offer, b: Offer) {
  return Math.max(+new Date(a.availableFrom), +new Date(b.availableFrom)) + 3.6e6 <= Math.min(+new Date(a.deadline), +new Date(b.deadline));
}

/**
 * Agrupa ofertas disponibles solo si: mismo tipo de producto (no mezclar lotes incompatibles),
 * ventanas horarias compatibles, cercanía y capacidad del vehículo.
 */
export function suggestGroups(offers: Offer[], capacityLiters: number, now = Date.now()): Offer[][] {
  const pool = offers
    .filter((o) => o.status === "disponible" && +new Date(o.deadline) > now)
    .sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline));
  const used = new Set<string>();
  const groups: Offer[][] = [];
  for (const seed of pool) {
    if (used.has(seed.id)) continue;
    const g = [seed];
    let total = seed.liters;
    for (const o of pool) {
      if (used.has(o.id) || o.id === seed.id) continue;
      if (o.product !== seed.product) continue;
      if (total + o.liters > capacityLiters) continue;
      if (!g.every((x) => windowsOverlap(x, o))) continue;
      if (haversineKm(muni(seed.municipality), muni(o.municipality)) > SIM.maxClusterKm) continue;
      g.push(o); total += o.liters;
    }
    if (g.length >= 2) { g.forEach((x) => used.add(x.id)); groups.push(g); }
  }
  return groups;
}
