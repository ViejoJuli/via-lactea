import { createFileRoute } from '@tanstack/react-router';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { PageTitle, Empty } from '@/components/via/shared';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/alertas')({ head: () => pageHead('Notificaciones', 'Novedades de tus ofertas y acuerdos en la demostración de Vía Láctea.'), component: Alerts });
function Alerts() {
  const {state, dispatch} = useStore();
  const notifications = state.notifications.filter(n => n.role === state.role || n.role === 'all');
  return <><PageTitle eyebrow="Actividad de la red · Demo" title="Notificaciones" />{notifications.length ? notifications.map(n => <article key={n.id} className="flex items-start gap-4 border-b py-5"><Bell className="mt-1 size-5 shrink-0 text-teal" /><div className="flex-1"><h2 className="text-sm font-bold">{n.title}</h2><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{n.body}</p></div><Button variant="ghost" size="icon" disabled={n.read} aria-label="Marcar como leída" onClick={() => dispatch({type:'markRead', id:n.id})}><Check /></Button></article>) : <Empty title="No hay notificaciones para este perfil de demostración." />}</>;
}