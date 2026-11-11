import { createFileRoute } from '@tanstack/react-router';
import { Landing } from '@/components/via/public-site';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/')({ head: () => pageHead('Del excedente a la oportunidad', 'Vía Láctea conecta productores de leche, compradores B2B y transportadores para facilitar acuerdos comerciales y recogidas en Colombia.'), component: Landing });
