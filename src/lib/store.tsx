import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { buildSeed, CURRENT_USER } from "./seed";
import type {
  AppNotification, Message, Offer, OfferStatus, PaymentStatus, PurchaseRequest, Role, RouteGroup, Transaction, TxStatus,
} from "./types";
import { TX_LABEL } from "./types";

/**
 * Estado de demostración EN MEMORIA. Punto de integración: reemplazar cada acción
 * por llamadas a Supabase (ver docs/supabase-schema.sql). Se reinicia al recargar.
 */
type Data = ReturnType<typeof buildSeed>;
export interface State extends Data { role: Role }

const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 8)}`;
const nowIso = () => new Date().toISOString();

export const NEXT_STATUS: Partial<Record<TxStatus, { to: TxStatus; label: string; roles: Role[] }[]>> = {
  contacto_solicitado: [{ to: "en_negociacion", label: "Iniciar negociación", roles: ["productor", "asociacion"] }],
  en_negociacion: [{ to: "acordada", label: "Aceptar acuerdo", roles: ["productor", "comprador", "asociacion"] }],
  acordada: [{ to: "recogida_programada", label: "Programar recogida", roles: ["transportador", "comprador", "productor"] }],
  recogida_programada: [{ to: "en_transito", label: "Confirmar recogida", roles: ["transportador"] }],
  en_transito: [{ to: "entregada", label: "Confirmar entrega", roles: ["comprador", "transportador"] }],
  entregada: [{ to: "cerrada", label: "Cerrar operación", roles: ["comprador", "productor", "admin"] }],
};

type Action =
  | { type: "setRole"; role: Role }
  | { type: "publishOffer"; offer: Offer }
  | { type: "updateOffer"; id: string; patch: Partial<Offer> }
  | { type: "createRequest"; request: PurchaseRequest }
  | { type: "requestContact"; offerId: string; proposedPrice?: number; note?: string }
  | { type: "sendMessage"; txId: string; body: string; proposal?: Message["proposal"] }
  | { type: "setTxStatus"; txId: string; status: TxStatus; note?: string; deliveredLiters?: number; deliveredTempC?: number }
  | { type: "setPayment"; txId: string; payment: PaymentStatus }
  | { type: "toggleSave"; offerId: string }
  | { type: "reportOffer"; offerId: string; reason: string }
  | { type: "proposeRoute"; route: RouteGroup }
  | { type: "updateRoute"; id: string; patch: Partial<RouteGroup> }
  | { type: "markRead"; id?: string }
  | { type: "setAccountStatus"; profileId: string; status: State["profiles"][number]["status"] }
  | { type: "reviewQuality"; offerId: string; qualityId: string; review: "revisado" | "rechazado" }
  | { type: "reset" };

function notify(state: State, n: Omit<AppNotification, "id" | "at" | "read">): AppNotification[] {
  return [{ ...n, id: uid("n"), at: nowIso(), read: false }, ...state.notifications];
}

function reducer(state: State, a: Action): State {
  const me = CURRENT_USER[state.role];
  switch (a.type) {
    case "setRole":
      return { ...state, role: a.role };
    case "publishOffer":
      return {
        ...state,
        offers: [a.offer, ...state.offers],
        notifications: notify(state, { role: "comprador", kind: "match", title: "Nueva oferta publicada", body: `${a.offer.liters} L en ${a.offer.municipality}`, link: `/app/ofertas/${a.offer.id}` }),
      };
    case "updateOffer":
      return { ...state, offers: state.offers.map((o) => (o.id === a.id ? { ...o, ...a.patch } : o)) };
    case "createRequest":
      return { ...state, requests: [a.request, ...state.requests] };
    case "requestContact": {
      const offer = state.offers.find((o) => o.id === a.offerId);
      if (!offer) return state;
      const existing = state.transactions.find((t) => t.offerId === offer.id && t.buyerId === me && !["cancelada", "cerrada"].includes(t.status));
      if (existing) return state;
      const n = state.transactions.length + 1;
      const t = nowIso();
      const tx: Transaction = {
        id: uid("tx"), lotCode: `VL-2026-${String(n).padStart(4, "0")}`, offerId: offer.id, buyerId: me, producerId: offer.producerId,
        liters: offer.liters, pricePerLiter: a.proposedPrice ?? offer.pricePerLiter, pickupPoint: "Por definir", transportBy: "por_definir",
        status: "contacto_solicitado", paymentStatus: "pendiente",
        messages: a.note || a.proposedPrice ? [{ id: uid("m"), senderId: me, body: a.note || "Propuesta de precio", at: t, proposal: a.proposedPrice ? { pricePerLiter: a.proposedPrice, liters: offer.liters, pickupAt: offer.deadline, transportBy: "por_definir" } : undefined }] : [],
        events: [{ id: uid("e"), at: t, actorId: me, event: a.proposedPrice ? `Contacto solicitado con propuesta de $${a.proposedPrice}/L` : "Contacto solicitado" }],
        createdAt: t,
      };
      return {
        ...state,
        transactions: [tx, ...state.transactions],
        offers: state.offers.map((o) => (o.id === offer.id ? { ...o, status: "en_negociacion" as OfferStatus, firstContactAt: o.firstContactAt ?? t } : o)),
        notifications: notify(state, { role: "productor", kind: "propuesta", title: "Solicitud de contacto recibida", body: `Un comprador se interesó en tu oferta de ${offer.liters} L`, link: `/app/operaciones/${tx.id}` }),
      };
    }
    case "sendMessage":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id !== a.txId ? t : {
            ...t,
            messages: [...t.messages, { id: uid("m"), senderId: me, body: a.body, at: nowIso(), proposal: a.proposal }],
            ...(a.proposal ? { pricePerLiter: a.proposal.pricePerLiter, liters: a.proposal.liters, pickupAt: a.proposal.pickupAt, transportBy: a.proposal.transportBy as Transaction["transportBy"] } : {}),
            status: a.proposal && t.status === "contacto_solicitado" ? "en_negociacion" : t.status,
            events: a.proposal ? [...t.events, { id: uid("e"), at: nowIso(), actorId: me, event: `Propuesta: ${a.proposal.liters} L a $${a.proposal.pricePerLiter}/L` }] : t.events,
          }),
      };
    case "setTxStatus": {
      const tx = state.transactions.find((t) => t.id === a.txId);
      if (!tx) return state;
      const t = nowIso();
      const extra = a.deliveredLiters != null ? ` — recibidos ${a.deliveredLiters} L${a.deliveredTempC != null ? ` a ${a.deliveredTempC} °C` : ""}` : "";
      const offerPatch: Partial<Offer> | null =
        a.status === "acordada" ? { status: "acordada", agreedAt: t } : a.status === "cancelada" ? { status: "disponible" } : null;
      return {
        ...state,
        transactions: state.transactions.map((x) => x.id !== a.txId ? x : {
          ...x, status: a.status,
          deliveredLiters: a.deliveredLiters ?? x.deliveredLiters, deliveredTempC: a.deliveredTempC ?? x.deliveredTempC,
          events: [...x.events, { id: uid("e"), at: t, actorId: me, event: `${TX_LABEL[a.status]}${extra}${a.note ? ` · ${a.note}` : ""}` }],
        }),
        offers: offerPatch ? state.offers.map((o) => (o.id === tx.offerId ? { ...o, ...offerPatch } : o)) : state.offers,
        notifications: notify(state, { role: "all", kind: "estado", title: `Operación ${tx.lotCode}`, body: `Nuevo estado: ${TX_LABEL[a.status]}`, link: `/app/operaciones/${tx.id}` }),
      };
    }
    case "setPayment":
      return { ...state, transactions: state.transactions.map((t) => t.id !== a.txId ? t : { ...t, paymentStatus: a.payment, events: [...t.events, { id: uid("e"), at: nowIso(), actorId: me, event: `Estado de pago (informativo): ${a.payment}` }] }) };
    case "toggleSave":
      return { ...state, savedOfferIds: state.savedOfferIds.includes(a.offerId) ? state.savedOfferIds.filter((x) => x !== a.offerId) : [...state.savedOfferIds, a.offerId] };
    case "reportOffer":
      return {
        ...state,
        offers: state.offers.map((o) => (o.id === a.offerId ? { ...o, reports: o.reports + 1, status: o.reports + 1 >= 2 ? "reportada" : o.status } : o)),
        notifications: notify(state, { role: "admin", kind: "documento", title: "Publicación reportada", body: a.reason, link: "/app/admin" }),
      };
    case "proposeRoute":
      return { ...state, routes: [a.route, ...state.routes] };
    case "updateRoute":
      return { ...state, routes: state.routes.map((r) => (r.id === a.id ? { ...r, ...a.patch } : r)) };
    case "markRead":
      return { ...state, notifications: state.notifications.map((n) => (!a.id || n.id === a.id ? { ...n, read: true } : n)) };
    case "setAccountStatus":
      return { ...state, profiles: state.profiles.map((p) => (p.id === a.profileId ? { ...p, status: a.status } : p)) };
    case "reviewQuality":
      return { ...state, offers: state.offers.map((o) => o.id !== a.offerId ? o : { ...o, quality: o.quality.map((q) => (q.id === a.qualityId ? { ...q, review: a.review } : q)) }) };
    case "reset":
      return { ...buildSeed(), role: state.role };
  }
}

const Ctx = createContext<{ state: State; dispatch: React.Dispatch<Action>; me: string } | null>(null);
const ROLE_KEY = "vl.role"; // preferencia no sensible

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({ ...buildSeed(), role: "comprador" as Role }));
  useEffect(() => {
    const r = window.localStorage.getItem(ROLE_KEY) as Role | null;
    if (r && r !== state.role) dispatch({ type: "setRole", role: r });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { window.localStorage.setItem(ROLE_KEY, state.role); }, [state.role]);
  const value = useMemo(() => ({ state, dispatch, me: CURRENT_USER[state.role] }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore fuera de StoreProvider");
  return c;
}

export const newId = uid;
