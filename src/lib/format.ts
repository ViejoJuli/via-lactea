const TZ = "America/Bogota";
const nf = new Intl.NumberFormat("es-CO");
const cop = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export const fmtLiters = (n: number) => `${nf.format(Math.round(n))} L`;
export const fmtNum = (n: number) => nf.format(n);
export const fmtCOP = (n: number) => cop.format(n);
export const fmtPrice = (n: number | null) => (n == null ? "Negociable" : `${cop.format(n)}/L`);
export const fmtDateTime = (iso: string) =>
  new Intl.DateTimeFormat("es-CO", { timeZone: TZ, day: "2-digit", month: "short", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
export const fmtTime = (iso: string) =>
  new Intl.DateTimeFormat("es-CO", { timeZone: TZ, hour: "numeric", minute: "2-digit" }).format(new Date(iso));

export function fmtRelative(iso: string, now = Date.now()) {
  const diff = new Date(iso).getTime() - now;
  const abs = Math.abs(diff);
  const h = Math.floor(abs / 3.6e6);
  const m = Math.floor((abs % 3.6e6) / 6e4);
  const txt = h >= 24 ? `${Math.floor(h / 24)} d` : h > 0 ? `${h} h ${m} min` : `${m} min`;
  return diff >= 0 ? `en ${txt}` : `hace ${txt}`;
}

/** datetime-local value (hora de Bogotá, UTC-5 sin horario de verano) */
export function toLocalInput(iso: string) {
  const d = new Date(new Date(iso).getTime() - 5 * 3.6e6);
  return d.toISOString().slice(0, 16);
}
export function fromLocalInput(v: string) {
  return new Date(`${v}:00-05:00`).toISOString();
}
