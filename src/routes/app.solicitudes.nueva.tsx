import { createFileRoute } from '@tanstack/react-router';
import { PublishForm } from '@/components/via/forms';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/solicitudes/nueva')({ head:()=>pageHead('Nueva solicitud','Define tus necesidades de abastecimiento B2B para encontrar ofertas compatibles.'), component:()=> <PublishForm request /> });
