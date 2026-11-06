import { createFileRoute } from '@tanstack/react-router';
import { OfferDetail } from '@/components/via/offer-detail';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/ofertas/$id')({ head:({params})=>pageHead(`Oferta ${params.id}`,'Condiciones declaradas, compatibilidad comercial y contacto para una oferta de leche.'), component:Page });
function Page(){const {id}=Route.useParams();return <OfferDetail id={id} />;}
