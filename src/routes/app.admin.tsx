import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { PageTitle, Status } from '@/components/via/shared';
import { useStore } from '@/lib/store';
import { fmtLiters } from '@/lib/format';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/app/admin')({ head: () => pageHead('Administración del piloto', 'Estado del área de administración de la demostración de Vía Láctea.'), component: Admin });
function Admin() {
	const { state, dispatch } = useStore();
	const reportedOffers = state.offers.filter((offer) => offer.reports > 0 || offer.status === 'reportada');
	const qualityRecords = state.offers.flatMap((offer) => offer.quality
		.filter((record) => record.review === 'declarado' || record.review === 'en_revision')
		.map((record) => ({ offer, record })));
	const accountsToReview = state.profiles.filter((profile) => profile.status === 'pendiente' || profile.status === 'revision');

	return <>
		<PageTitle eyebrow="Administración · Demostración" title="Administración del piloto" description="Revisa publicaciones, información declarada y estados ficticios de cuentas." />
		<p className="mb-8 border-l-2 border-warning px-4 py-3 text-sm leading-relaxed text-muted-foreground">Estas acciones solo modifican datos temporales de la demostración. El selector de perfiles no concede permisos ni representa controles de acceso reales.</p>
		<section className="mb-10">
			<h2 className="mb-4 text-lg font-bold">Publicaciones reportadas <span className="text-sm font-normal text-muted-foreground">({reportedOffers.length})</span></h2>
			{reportedOffers.length ? reportedOffers.map((offer) => <article key={offer.id} className="flex flex-wrap items-center justify-between gap-4 border-y py-4">
				<div><p className="font-semibold">{fmtLiters(offer.liters)} en {offer.municipality}</p><p className="mt-1 text-xs text-muted-foreground">{offer.reports} reportes · Estado: {offer.status.replaceAll('_', ' ')}</p></div>
				<Button asChild size="sm" variant="outline"><Link to="/app/ofertas/$id" params={{ id: offer.id }}>Revisar publicación</Link></Button>
			</article>) : <p className="border-y py-5 text-sm text-muted-foreground">No hay publicaciones reportadas.</p>}
		</section>
		<section className="mb-10">
			<h2 className="mb-4 text-lg font-bold">Información de calidad declarada <span className="text-sm font-normal text-muted-foreground">({qualityRecords.length})</span></h2>
			{qualityRecords.length ? qualityRecords.map(({ offer, record }) => <article key={record.id} className="flex flex-wrap items-center justify-between gap-4 border-y py-4">
				<div><p className="font-semibold">{record.test}: {record.value} {record.unit}</p><p className="mt-1 text-xs text-muted-foreground">{offer.municipality} · {record.issuer} · {record.review.replaceAll('_', ' ')}</p></div>
				<div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => dispatch({ type: 'reviewQuality', offerId: offer.id, qualityId: record.id, review: 'revisado' })}>Marcar revisado</Button><Button size="sm" variant="ghost" onClick={() => dispatch({ type: 'reviewQuality', offerId: offer.id, qualityId: record.id, review: 'rechazado' })}>Rechazar</Button></div>
			</article>) : <p className="border-y py-5 text-sm text-muted-foreground">No hay registros pendientes de revisión.</p>}
			<p className="mt-3 text-xs text-muted-foreground">La revisión de información declarada no constituye certificación sanitaria.</p>
		</section>
		<section>
			<h2 className="mb-4 text-lg font-bold">Cuentas de demostración <span className="text-sm font-normal text-muted-foreground">({accountsToReview.length} por revisar)</span></h2>
			{state.profiles.map((profile) => <article key={profile.id} className="flex flex-wrap items-center justify-between gap-4 border-y py-4">
				<div><p className="font-semibold">{profile.name} <span className="font-normal text-muted-foreground">· {profile.org}</span></p><p className="mt-1 text-xs text-muted-foreground">{profile.role} · {profile.municipality}</p></div>
							   <div className="flex items-center gap-3"><Status tone={profile.status === 'activo' ? 'success' : profile.status === 'suspendido' ? 'warning' : 'neutral'}>{profile.status}</Status><Button size="sm" variant="outline" onClick={() => dispatch({ type: 'setAccountStatus', profileId: profile.id, status: profile.status === 'suspendido' || profile.status === 'pendiente' || profile.status === 'revision' ? 'activo' : 'suspendido' })}>{profile.status === 'suspendido' ? 'Reactivar' : profile.status === 'activo' ? 'Suspender' : 'Aprobar cuenta'}</Button></div>
			</article>)}
		</section>
	</>;
}