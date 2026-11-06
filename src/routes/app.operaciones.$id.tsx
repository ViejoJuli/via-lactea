import { createFileRoute } from '@tanstack/react-router';
import { OperationDetail } from '@/components/via/operations';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/operaciones/$id')({ head:({params})=>pageHead(`Operación ${params.id}`,'Conversación, propuestas y bitácora de trazabilidad de la operación.'), component:Page });
function Page(){const {id}=Route.useParams();return <OperationDetail id={id} />;}
