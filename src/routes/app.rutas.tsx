import { createFileRoute } from '@tanstack/react-router';
import { RoutesView } from '@/components/via/routes-view';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/rutas')({ head:()=>pageHead('Rutas comunitarias','Evalúa agrupaciones de ofertas, capacidad y recorridos simulados del piloto.'), component: RoutesView });
