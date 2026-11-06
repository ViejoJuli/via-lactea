import { createFileRoute } from '@tanstack/react-router';
import { AppShell } from '@/components/via/shell';
export const Route = createFileRoute('/app')({ component: AppShell });
