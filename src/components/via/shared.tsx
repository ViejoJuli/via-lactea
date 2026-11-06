import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Clock3, MapPin, Snowflake, Bookmark, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { fmtLiters, fmtPrice, fmtRelative } from '@/lib/format';
import { PRODUCT_LABEL, type Offer } from '@/lib/types';

export function Brand({ light = false }: { light?: boolean }) {
  return <Link to="/" className={`flex items-center gap-2.5 ${light ? 'text-sidebar-foreground' : 'text-primary'}`}><span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary"><Droplets className="size-5" /></span><span className="text-xl font-extrabold">vía láctea<span className="text-teal">.</span></span></Link>;
}
export function PageTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase tracking-widest text-teal">{eyebrow}</p><h1 className="text-3xl font-extrabold">{title}</h1>{description && <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>}</div>{action}</div>;
}
export function Status({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'success' | 'warning' }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[11px] font-bold ${tone === 'success' ? 'bg-success/10 text-success' : tone === 'warning' ? 'bg-warning/20 text-warning-foreground' : 'bg-muted text-muted-foreground'}`}><span className="size-1.5 rounded-full bg-current" />{children}</span>;
}
export function OfferCard({ offer, score }: { offer: Offer; score?: number }) {
  const { state, dispatch } = useStore();
  const saved = state.savedOfferIds.includes(offer.id);
  return <article className="flex flex-col rounded-lg border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift"><div className="mb-5 flex items-center justify-between"><Status tone={offer.status === 'disponible' ? 'success' : 'neutral'}>{offer.status === 'disponible' ? 'Disponible' : offer.status.replaceAll('_', ' ')}</Status><Button variant="ghost" size="icon" aria-label={saved ? 'Quitar guardado' : 'Guardar oferta'} onClick={() => dispatch({ type: 'toggleSave', offerId: offer.id })}><Bookmark className={saved ? 'fill-teal text-teal' : 'text-muted-foreground'} /></Button></div><p className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="size-4" />{offer.municipality} · {offer.municipality === 'Paipa' ? 'Boyacá' : 'Cundinamarca'}</p><div className="mt-3 flex items-baseline justify-between gap-2"><h3 className="text-3xl font-extrabold tabular">{fmtLiters(offer.liters)}</h3><span className="text-sm font-bold">{fmtPrice(offer.pricePerLiter)}</span></div><p className="mt-1 text-xs text-muted-foreground">{PRODUCT_LABEL[offer.product]}</p><div className="my-5 flex flex-wrap gap-x-4 gap-y-2 border-y py-3 text-xs"><span className="flex items-center gap-1"><Snowflake className="size-3.5 text-teal" />{offer.tempC != null ? `${offer.tempC} °C declarados` : 'Sin enfriamiento'}</span><span className="flex items-center gap-1"><Clock3 className="size-3.5 text-warning-foreground" />Límite {fmtRelative(offer.deadline)}</span></div><div className="mb-4 flex items-center justify-between text-xs"><span className="text-muted-foreground">{offer.quality.some(q => q.review === 'revisado') ? 'Documentos revisados (demo)' : 'Calidad declarada'}</span>{score != null && <span className="font-bold text-teal">{score}% compatible</span>}</div><Button variant="outline" asChild className="mt-auto w-full justify-between"><Link to="/app/ofertas/$id" params={{ id: offer.id }}>Ver oportunidad<ArrowUpRight /></Link></Button></article>;
}
export function Empty({ title }: { title: string }) { return <div className="py-16 text-center text-muted-foreground"><Droplets className="mx-auto mb-3 size-8" /><p>{title}</p></div>; }
