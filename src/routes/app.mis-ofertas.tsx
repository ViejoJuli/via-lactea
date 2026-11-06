import { createFileRoute } from '@tanstack/react-router';
import { Market } from '@/components/via/market';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/mis-ofertas')({ head:()=>pageHead('Mis ofertas','Consulta tus publicaciones y su estado comercial.'), component:()=> <Market mine /> });
