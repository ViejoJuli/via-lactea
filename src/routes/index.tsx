import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/via/shell';
import { Dashboard } from '@/components/via/dashboard';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/')({ head: () => pageHead('Mi tablero', 'Actividad y oportunidades del piloto de abastecimiento lácteo colombiano.'), component: () => <AppShell><Dashboard /></AppShell> });
