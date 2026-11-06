import type { AppNotification, Offer, Profile, PurchaseRequest, QualityRecord, RouteGroup, Transaction } from "./types";

/** TODOS los datos de este archivo son DATOS DE DEMOSTRACIÓN. Nombres ficticios. */
export const CURRENT_USER: Record<"productor" | "comprador" | "transportador" | "asociacion" | "admin", string> = {
  productor: "p1",
  comprador: "b1",
  transportador: "t1",
  asociacion: "a1",
  admin: "ad1",
};

export const seedProfiles: Profile[] = [
  { id: "p1", name: "Finca El Mirador (demo)", org: "Productor individual", role: "productor", municipality: "Ubaté", status: "activo", completeness: 90 },
  { id: "p2", name: "Finca La Esperanza (demo)", org: "Productor individual", role: "productor", municipality: "Susa", status: "activo", completeness: 75 },
  { id: "p3", name: "Hato San José (demo)", org: "Productor individual", role: "productor", municipality: "Simijaca", status: "activo", completeness: 60 },
  { id: "p4", name: "Finca Los Alisos (demo)", org: "Productor individual", role: "productor", municipality: "Fúquene", status: "pendiente", completeness: 40 },
  { id: "p5", name: "Finca Altamira (demo)", org: "Productor individual", role: "productor", municipality: "Cucunubá", status: "activo", completeness: 85 },
  { id: "p6", name: "Finca El Recreo (demo)", org: "Productor individual", role: "productor", municipality: "Paipa", status: "activo", completeness: 70 },
  { id: "b1", name: "Quesera Andina (demo)", org: "Quesería artesanal", role: "comprador", municipality: "Chiquinquirá", status: "activo", completeness: 95 },
  { id: "b2", name: "Lácteos Sabana (demo)", org: "Transformador regional", role: "comprador", municipality: "Zipaquirá", status: "activo", completeness: 80 },
  { id: "t1", name: "Transportes Ruta Fría (demo)", org: "Operador logístico", role: "transportador", municipality: "Ubaté", status: "activo", completeness: 88 },
  { id: "a1", name: "Asociación Valle de Ubaté (demo)", org: "Asociación de productores", role: "asociacion", municipality: "Ubaté", status: "revision", completeness: 65 },
  { id: "ad1", name: "Equipo Vía Láctea", org: "Administración", role: "admin", municipality: "Ubaté", status: "activo", completeness: 100 },
];

const q = (id: string, test: string, value: string, unit: string, review: QualityRecord["review"], date: string, issuer = "Laboratorio por definir"): QualityRecord => ({ id, test, value, unit, review, date, issuer });

export function buildSeed(now = Date.now()) {
  const h = (n: number) => new Date(now + n * 3.6e6).toISOString();

  const offers: Offer[] = [
    { id: "of-101", producerId: "p1", liters: 650, product: "leche_cruda_enfriada", municipality: "Ubaté", availableFrom: h(-2), deadline: h(10), milkedAt: h(-3), tempC: 4, coolingMethod: "Tanque de enfriamiento", quality: [q("q1", "Grasa", "3,6", "%", "revisado", h(-30)), q("q2", "Antibióticos", "Negativo", "", "revisado", h(-30))], pricePerLiter: 1950, storageLiters: 1500, vehicleAccess: "Carreteable, apto camión 3,5 t", status: "disponible", createdAt: h(-2), reports: 0 },
    { id: "of-102", producerId: "p2", liters: 380, product: "leche_cruda_enfriada", municipality: "Susa", availableFrom: h(-1), deadline: h(8), tempC: 5, coolingMethod: "Tanque comunitario", quality: [q("q3", "Antibióticos", "Negativo", "", "declarado", h(-48))], pricePerLiter: null, storageLiters: 600, vehicleAccess: "Vía destapada; solo camioneta", status: "disponible", createdAt: h(-1), reports: 0 },
    { id: "of-103", producerId: "p3", liters: 900, product: "leche_cruda_enfriada", municipality: "Simijaca", availableFrom: h(-4), deadline: h(6), tempC: 4, coolingMethod: "Tanque de enfriamiento", quality: [q("q4", "Grasa", "3,4", "%", "en_revision", h(-20)), q("q5", "Proteína", "3,1", "%", "en_revision", h(-20)), q("q6", "Antibióticos", "Negativo", "", "en_revision", h(-20))], pricePerLiter: 2050, storageLiters: 2000, vehicleAccess: "Pavimentada hasta la finca", status: "disponible", createdAt: h(-4), reports: 0 },
    { id: "of-104", producerId: "p4", liters: 220, product: "leche_cruda_sin_enfriar", municipality: "Fúquene", availableFrom: h(-1), deadline: h(3), coolingMethod: "Sin enfriamiento (cantinas)", quality: [], pricePerLiter: 1700, storageLiters: 300, vehicleAccess: "Camino veredal", status: "disponible", createdAt: h(-1), reports: 0 },
    { id: "of-105", producerId: "p5", liters: 520, product: "leche_cruda_enfriada", municipality: "Cucunubá", availableFrom: h(0), deadline: h(12), tempC: 3, coolingMethod: "Tanque de enfriamiento", quality: [q("q7", "Grasa", "3,7", "%", "revisado", h(-10)), q("q8", "Antibióticos", "Negativo", "", "revisado", h(-10)), q("q9", "Recuento bacteriano", "85.000", "UFC/mL", "declarado", h(-10))], pricePerLiter: 2000, storageLiters: 1200, vehicleAccess: "Carreteable", status: "disponible", createdAt: h(-0.5), reports: 0 },
    { id: "of-106", producerId: "p6", liters: 1200, product: "leche_cruda_enfriada", municipality: "Paipa", availableFrom: h(-3), deadline: h(9), tempC: 4, coolingMethod: "Tanque de enfriamiento", quality: [q("q10", "Antibióticos", "Negativo", "", "declarado", h(-40))], pricePerLiter: 1900, storageLiters: 3000, vehicleAccess: "Pavimentada", status: "disponible", createdAt: h(-3), reports: 0 },
    { id: "of-090", producerId: "p1", liters: 500, product: "leche_cruda_enfriada", municipality: "Ubaté", availableFrom: h(-50), deadline: h(-40), tempC: 4, coolingMethod: "Tanque de enfriamiento", quality: [], pricePerLiter: 1980, storageLiters: 1500, vehicleAccess: "Carreteable", status: "acordada", createdAt: h(-52), firstContactAt: h(-51), agreedAt: h(-49), reports: 0 },
  ];

  const requests: PurchaseRequest[] = [
    { id: "rq-1", buyerId: "b1", product: "leche_cruda_enfriada", minLiters: 500, maxLiters: 1500, budgetMax: 2000, municipality: "Chiquinquirá", radiusKm: 60, windowStart: h(0), windowEnd: h(14), requiredTests: ["Antibióticos", "Grasa"], maxTempC: 6, acceptsMultiple: true, createdAt: h(-5) },
    { id: "rq-2", buyerId: "b2", product: "leche_cruda_enfriada", minLiters: 1000, maxLiters: 3000, budgetMax: 2100, municipality: "Zipaquirá", radiusKm: 80, windowStart: h(2), windowEnd: h(20), requiredTests: ["Antibióticos"], maxTempC: 6, acceptsMultiple: true, createdAt: h(-8) },
  ];

  const transactions: Transaction[] = [
    {
      id: "tx-1", lotCode: "VL-2026-0001", offerId: "of-090", buyerId: "b1", producerId: "p1", liters: 500, pricePerLiter: 1980,
      pickupPoint: "Portón principal finca, vereda (aprox.)", pickupAt: h(-41), transportBy: "transportador", status: "entregada", paymentStatus: "informado_pagado",
      deliveredLiters: 495, deliveredTempC: 5,
      messages: [
        { id: "m1", senderId: "b1", body: "Buenos días, nos interesa la oferta completa.", at: h(-51) },
        { id: "m2", senderId: "p1", body: "Con gusto. ¿Recogen antes de las 10 a. m.?", at: h(-50.5) },
        { id: "m3", senderId: "b1", body: "Propuesta formal", at: h(-50), proposal: { pricePerLiter: 1980, liters: 500, pickupAt: h(-41), transportBy: "transportador" } },
      ],
      events: [
        { id: "e1", at: h(-51), actorId: "b1", event: "Contacto solicitado" },
        { id: "e2", at: h(-50), actorId: "b1", event: "Propuesta: 500 L a $1.980/L" },
        { id: "e3", at: h(-49), actorId: "p1", event: "Acuerdo aceptado" },
        { id: "e4", at: h(-45), actorId: "t1", event: "Recogida programada" },
        { id: "e5", at: h(-41), actorId: "t1", event: "En tránsito — recogidos 500 L a 4 °C (declarado)" },
        { id: "e6", at: h(-39), actorId: "b1", event: "Entregada — recibidos 495 L a 5 °C" },
      ],
      createdAt: h(-51),
    },
    {
      id: "tx-2", lotCode: "VL-2026-0002", offerId: "of-103", buyerId: "b1", producerId: "p3", liters: 900, pricePerLiter: null,
      pickupPoint: "Por definir", transportBy: "por_definir", status: "en_negociacion", paymentStatus: "pendiente",
      messages: [{ id: "m4", senderId: "b1", body: "Hola, ¿tienen resultados de proteína recientes?", at: h(-2) }],
      events: [{ id: "e7", at: h(-2.5), actorId: "b1", event: "Contacto solicitado" }, { id: "e8", at: h(-2), actorId: "p3", event: "Negociación iniciada" }],
      createdAt: h(-2.5),
    },
  ];
  const negotiatingOffer = offers.find((o) => o.id === "of-103");
  if (negotiatingOffer) {
    negotiatingOffer.status = "en_negociacion";
    negotiatingOffer.firstContactAt = h(-2.5);
  }

  const routes: RouteGroup[] = [];

  const notifications: AppNotification[] = [
    { id: "n1", role: "comprador", kind: "match", title: "Nueva oferta compatible", body: "650 L en Ubaté coinciden con su solicitud (dato de demostración).", at: h(-2), read: false, link: "/app/ofertas/of-101" },
    { id: "n2", role: "productor", kind: "vence", title: "Tu oferta vence pronto", body: "Revisa la hora límite de recogida de tus ofertas activas.", at: h(-0.5), read: false, link: "/app/mis-ofertas" },
    { id: "n3", role: "productor", kind: "documento", title: "Actualiza tus documentos", body: "Agrega un resultado reciente de recuento bacteriano.", at: h(-20), read: true },
    { id: "n4", role: "transportador", kind: "match", title: "Ruta comunitaria sugerida", body: "Hay ofertas cercanas que se pueden consolidar.", at: h(-1), read: false, link: "/app/rutas" },
    { id: "n5", role: "admin", kind: "documento", title: "Cuenta en revisión", body: "Asociación Valle de Ubaté (demo) requiere revisión documental.", at: h(-6), read: false, link: "/app/admin" },
  ];

  return { profiles: seedProfiles, offers, requests, transactions, routes, notifications, savedOfferIds: [] as string[] };
}
