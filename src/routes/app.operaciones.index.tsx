import { createFileRoute } from '@tanstack/react-router';
import { Operations } from '@/components/via/operations';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/operaciones/')({ head:()=>pageHead('Mis operaciones','Acuerdos, conversaciones y seguimiento de operaciones del piloto lácteo.'), component: Operations });
