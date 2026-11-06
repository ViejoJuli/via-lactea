import { createFileRoute } from '@tanstack/react-router';
import { PublishForm } from '@/components/via/forms';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/publicar')({ head:()=>pageHead('Publicar oferta','Registra volumen, horarios y condiciones declaradas de tu oferta de leche.'), component: PublishForm });
