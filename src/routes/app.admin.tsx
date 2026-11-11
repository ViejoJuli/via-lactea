import { createFileRoute } from '@tanstack/react-router';
import { PageTitle } from '@/components/via/shared';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/admin')({ head: () => pageHead('Administración del piloto', 'Estado del área de administración de la demostración de Vía Láctea.'), component: Admin });
function Admin() { return <><PageTitle eyebrow="Demostración" title="Administración del piloto" /><p className="max-w-xl text-sm leading-relaxed text-muted-foreground">La administración de cuentas y la revisión de documentos aún no están habilitadas. El selector de perfiles es una demostración, no un sistema de autorización.</p></>; }