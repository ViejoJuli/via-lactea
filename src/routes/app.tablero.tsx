import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/via/dashboard';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/tablero')({ head: () => pageHead('Mi tablero', 'Actividad y oportunidades de tu perfil en la demostración de Vía Láctea.'), component: Dashboard });