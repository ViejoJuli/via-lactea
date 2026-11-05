import { roadKm } from "./geo";
import type { Offer, Profile, PurchaseRequest } from "./types";

export type Criterion = "ubicacion" | "volumen" | "tiempo" | "precio" | "requisitos" | "confianza";

export interface Reason {
  criterion: Criterion;
  ok: boolean | "parcial";
  points: number;
  max: number;
  text: string;
}

export interface MatchResult {
  offerId: string;
  requestId: string;
  score: number; // 0-100
  excluded: boolean;
  excludedReason?: string | undefined;
  distanceKm: number;
  reasons: Reason[];
}

/** Pesos explicables y ajustables del motor de reglas (no IA opaca). */
export const WEIGHTS: Record<Criterion, number> = {
  ubicacion: 25,
  volumen: 25,
  tiempo: 20,
  precio: 15,
  requisitos: 10,
  confianza: 5,
};

export function scoreMatch(offer: Offer, req: PurchaseRequest, producer?: Profile, now = Date.now()): MatchResult {
  const reasons: Reason[] = [];
  const distanceKm = roadKm(offer.municipality, req.municipality);
  let excludedReason: string | undefined;

  // Producto
  if (offer.product !== req.product) excludedReason = "Tipo de producto distinto al solicitado";

  // Ubicación
  const inRadius = distanceKm <= req.radiusKm;
  const locPts = inRadius ? WEIGHTS.ubicacion * (1 - (distanceKm / req.radiusKm) * 0.5) : 0;
  reasons.push({
    criterion: "ubicacion",
    ok: inRadius,
    points: locPts,
    max: WEIGHTS.ubicacion,
    text: inRadius
      ? `A ~${Math.round(distanceKm)} km, dentro de su radio de ${req.radiusKm} km`
      : `A ~${Math.round(distanceKm)} km, fuera de su radio de ${req.radiusKm} km`,
  });

  // Volumen
  let volPts = 0;
  let volOk: Reason["ok"] = false;
  let volText = "";
  if (offer.liters >= req.minLiters && offer.liters <= req.maxLiters) {
    volPts = WEIGHTS.volumen; volOk = true; volText = "Volumen dentro del rango requerido";
  } else if (offer.liters > req.maxLiters) {
    volPts = WEIGHTS.volumen * 0.7; volOk = "parcial"; volText = "Oferta supera el máximo; podría comprarse parcialmente";
  } else if (req.acceptsMultiple) {
    volPts = WEIGHTS.volumen * (offer.liters / req.minLiters) * 0.8; volOk = "parcial";
    volText = `Cubre ${Math.round((offer.liters / req.minLiters) * 100)}% del mínimo; consolidable con otros proveedores`;
  } else {
    volText = "Volumen inferior al mínimo y no acepta varios proveedores";
  }
  reasons.push({ criterion: "volumen", ok: volOk, points: volPts, max: WEIGHTS.volumen, text: volText });

  // Tiempo
  const deadline = new Date(offer.deadline).getTime();
  const from = new Date(offer.availableFrom).getTime();
  const ws = new Date(req.windowStart).getTime();
  const we = new Date(req.windowEnd).getTime();
  const overlapStart = Math.max(from, ws, now);
  const overlapEnd = Math.min(deadline, we);
  const viable = overlapEnd - overlapStart >= 60 * 60 * 1000; // al menos 1 h de ventana común
  if (deadline <= now) excludedReason ??= "La hora límite de recogida ya pasó";
  else if (!viable) excludedReason ??= "La ventana de recogida no coincide con la del comprador";
  reasons.push({
    criterion: "tiempo",
    ok: viable,
    points: viable ? WEIGHTS.tiempo : 0,
    max: WEIGHTS.tiempo,
    text: viable ? `Ventana común de ${Math.round((overlapEnd - overlapStart) / 3.6e6)} h` : "Sin ventana horaria común viable",
  });

  // Precio
  let pricePts: number; let priceOk: Reason["ok"]; let priceText: string;
  if (offer.pricePerLiter == null) {
    pricePts = WEIGHTS.precio * 0.6; priceOk = "parcial"; priceText = "Precio negociable";
  } else if (offer.pricePerLiter <= req.budgetMax) {
    pricePts = WEIGHTS.precio; priceOk = true; priceText = "Precio dentro de su presupuesto";
  } else {
    const over = (offer.pricePerLiter - req.budgetMax) / req.budgetMax;
    pricePts = Math.max(0, WEIGHTS.precio * (1 - over * 5)); priceOk = over < 0.1 ? "parcial" : false;
    priceText = `Precio ${Math.round(over * 100)}% sobre su presupuesto; negociable`;
  }
  reasons.push({ criterion: "precio", ok: priceOk, points: pricePts, max: WEIGHTS.precio, text: priceText });

  // Requisitos (pruebas declaradas + temperatura)
  const have = new Set(offer.quality.map((q) => q.test));
  const missing = req.requiredTests.filter((t) => !have.has(t));
  const tempOk = offer.tempC != null && offer.tempC <= req.maxTempC;
  const reqParts = (req.requiredTests.length ? (req.requiredTests.length - missing.length) / req.requiredTests.length : 1) * 0.6 + (tempOk ? 0.4 : 0);
  reasons.push({
    criterion: "requisitos",
    ok: missing.length === 0 && tempOk ? true : reqParts > 0 ? "parcial" : false,
    points: WEIGHTS.requisitos * reqParts,
    max: WEIGHTS.requisitos,
    text: [
      missing.length ? `Faltan pruebas: ${missing.join(", ")}` : "Pruebas requeridas declaradas",
      offer.tempC == null ? "temperatura no declarada" : tempOk ? `temperatura declarada ${offer.tempC} °C` : `temperatura declarada ${offer.tempC} °C supera ${req.maxTempC} °C`,
    ].join(" · "),
  });

  // Confianza (completitud de perfil; NO es certificación sanitaria)
  const comp = producer?.completeness ?? 50;
  reasons.push({
    criterion: "confianza",
    ok: comp >= 80 ? true : "parcial",
    points: WEIGHTS.confianza * (comp / 100),
    max: WEIGHTS.confianza,
    text: `Perfil ${comp}% completo (no constituye certificación sanitaria)`,
  });

  const raw = reasons.reduce((s, r) => s + r.points, 0);
  return {
    offerId: offer.id,
    requestId: req.id,
    score: excludedReason ? 0 : Math.round(raw),
    excluded: !!excludedReason,
    excludedReason,
    distanceKm,
    reasons,
  };
}

export function rankOffers(offers: Offer[], req: PurchaseRequest, profiles: Profile[], now = Date.now()) {
  return offers
    .filter((o) => o.status === "disponible")
    .map((o) => scoreMatch(o, req, profiles.find((p) => p.id === o.producerId), now))
    .sort((a, b) => b.score - a.score);
}
