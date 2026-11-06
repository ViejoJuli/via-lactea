import { createFileRoute } from '@tanstack/react-router';
import { Market } from '@/components/via/market';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/ofertas/')({ head:()=>pageHead('Mercado de oportunidades','Explora ofertas de leche por municipio, volumen, condiciones y compatibilidad.'), component: Market });
