export type Role = "productor" | "comprador" | "transportador" | "asociacion" | "admin";

export const ROLE_LABEL: Record<Role, string> = {
  productor: "Productor",
  comprador: "Comprador B2B",
  transportador: "Transportador",
  asociacion: "Asociación / Acopio",
  admin: "Administrador",
};

export type AccountStatus = "pendiente" | "activo" | "suspendido" | "revision";

export interface Municipality {
  name: string;
  dept: string;
  lat: number;
  lng: number;
}

export interface Profile {
  id: string;
  name: string;
  org: string;
  role: Role;
  municipality: string;
  status: AccountStatus;
  completeness: number; // 0-100, perfil completo
}

export type ProductType = "leche_cruda_enfriada" | "leche_cruda_sin_enfriar";
export const PRODUCT_LABEL: Record<ProductType, string> = {
  leche_cruda_enfriada: "Leche cruda enfriada",
  leche_cruda_sin_enfriar: "Leche cruda sin enfriar",
};

export type ReviewStatus = "declarado" | "en_revision" | "revisado" | "rechazado";

export interface QualityRecord {
  id: string;
  test: string; // p.ej. "Grasa", "Proteína", "Antibióticos", "Recuento bacteriano"
  value: string;
  unit: string;
  date: string;
  issuer: string;
  review: ReviewStatus;
}

export type OfferStatus = "borrador" | "disponible" | "en_negociacion" | "acordada" | "vencida" | "reportada";

export interface Offer {
  id: string;
  producerId: string;
  liters: number;
  product: ProductType;
  municipality: string;
  availableFrom: string; // ISO
  deadline: string; // ISO hora límite de recogida
  milkedAt?: string;
  tempC?: number;
  coolingMethod: string;
  quality: QualityRecord[];
  pricePerLiter: number | null; // null = negociable
  storageLiters: number;
  vehicleAccess: string;
  status: OfferStatus;
  createdAt: string;
  firstContactAt?: string;
  agreedAt?: string;
  reports: number;
}

export interface PurchaseRequest {
  id: string;
  buyerId: string;
  product: ProductType;
  minLiters: number;
  maxLiters: number;
  budgetMax: number; // COP/L
  municipality: string;
  radiusKm: number;
  windowStart: string;
  windowEnd: string;
  requiredTests: string[];
  maxTempC: number;
  acceptsMultiple: boolean;
  createdAt: string;
}

export const TX_STATUSES = [
  "contacto_solicitado",
  "en_negociacion",
  "acordada",
  "recogida_programada",
  "en_transito",
  "entregada",
  "cerrada",
  "cancelada",
  "reportada",
] as const;
export type TxStatus = (typeof TX_STATUSES)[number];

export const TX_LABEL: Record<TxStatus, string> = {
  contacto_solicitado: "Contacto solicitado",
  en_negociacion: "En negociación",
  acordada: "Acordada",
  recogida_programada: "Recogida programada",
  en_transito: "En tránsito",
  entregada: "Entregada",
  cerrada: "Cerrada",
  cancelada: "Cancelada",
  reportada: "Reportada",
};

export type PaymentStatus = "pendiente" | "informado_pagado" | "en_disputa";

export interface Message {
  id: string;
  senderId: string;
  body: string;
  at: string;
  proposal?: { pricePerLiter: number; liters: number; pickupAt: string; transportBy: string } | undefined;
}

export interface EventEntry {
  id: string;
  at: string;
  actorId: string;
  event: string;
}

export interface Transaction {
  id: string;
  lotCode: string;
  offerId: string;
  buyerId: string;
  producerId: string;
  liters: number;
  pricePerLiter: number | null;
  pickupPoint: string;
  pickupAt?: string | undefined;
  transportBy: "comprador" | "productor" | "transportador" | "por_definir";
  status: TxStatus;
  paymentStatus: PaymentStatus;
  deliveredLiters?: number | undefined;
  deliveredTempC?: number | undefined;
  messages: Message[];
  events: EventEntry[];
  createdAt: string;
}

export type RouteStatus = "sugerida" | "aceptada" | "ejecutada";

export interface RouteGroup {
  id: string;
  operatorId: string | null;
  stopOfferIds: string[];
  capacityLiters: number;
  destination: string;
  status: RouteStatus;
}

export interface AppNotification {
  id: string;
  role: Role | "all";
  kind: "match" | "vence" | "propuesta" | "estado" | "documento";
  title: string;
  body: string;
  at: string;
  read: boolean;
  link?: string;
}
