# PRD: Vía Láctea

**Estado:** borrador para validación de producto

**Fecha:** 19 de noviembre de 2026

**Etapa:** demostración; aún no habilitada para operaciones reales

## 1. Resumen

Vía Láctea es una propuesta de mercado B2B y coordinación logística para la cadena láctea colombiana. Busca conectar directamente a productores y asociaciones con compradores y transportadores, facilitar acuerdos informados y dar seguimiento a la recogida y entrega.

La hipótesis es que una mayor visibilidad de la demanda, información de precios y alternativas de transporte pueden mejorar el poder de negociación y el ingreso neto del productor. Esto debe validarse con productores y compradores; la plataforma no garantiza mejores precios, ventas ni recogidas.

## 2. Problema y oportunidad

Los productores pueden depender de pocos compradores o intermediarios y tener escasa información para comparar ofertas, costos de transporte y condiciones de pago. La leche es perecedera y las ventanas de recogida, la conservación, la ubicación y el volumen limitan las alternativas. Los compradores, por su parte, necesitan abastecimiento confiable con condiciones verificables.

El objetivo no es eliminar indiscriminadamente toda intermediación: asociaciones, acopiadores y transportadores pueden aportar valor. Se busca ampliar las opciones y hacer transparentes sus costos y condiciones para que el productor decida con quién negociar.

## 3. Objetivos y métricas

Objetivos del piloto: comprobar que la conexión directa genera oportunidades reales, permite coordinar entregas y aporta información útil para negociar. El alcance geográfico inicial se debe confirmar con los participantes; la demo usa municipios del altiplano cundiboyacense.

| Indicador propuesto | Definición | Meta inicial |
| --- | --- | --- |
| Productores activos | Productores que publican al menos una oferta válida en 30 días | Por definir tras establecer línea base |
| Conversión a acuerdo | Ofertas con al menos un acuerdo / ofertas publicadas | Por definir tras piloto |
| Tiempo al primer contacto | Mediana entre publicación y primer contacto válido | Por definir tras piloto |
| Ingreso neto por litro | Precio acordado menos costos de transporte y comisiones asumidos por el productor, dividido según el volumen aplicable | Comparar con línea base voluntaria y periodo equivalente |
| Entregas completadas | Operaciones entregadas / operaciones acordadas | Por definir tras piloto |
| Retención | Productores que vuelven a publicar en el periodo siguiente | Por definir tras piloto |

Los indicadores requieren eventos persistentes, definición del periodo y consentimiento cuando corresponda. No se deben presentar cifras de demostración como resultados reales.

## 4. Usuarios y necesidades

| Perfil | Necesidad principal |
| --- | --- |
| Productor | Publicar leche disponible, encontrar compradores y comparar condiciones para obtener un mejor ingreso neto. |
| Asociación o acopio | Representar y coordinar productores y, cuando corresponda, consolidar volúmenes o recogidas. |
| Comprador B2B | Encontrar oferta compatible en volumen, ubicación, tiempo y condiciones declaradas. |
| Transportador | Identificar recogidas compatibles con su capacidad y coordinar la entrega. |
| Administrador | Revisar cuentas, reportes y registros de calidad conforme a permisos y procedimientos definidos. |

## 5. Estado actual verificado

El repositorio contiene una introducción pública y una demostración separada en `/app/tablero`. El usuario puede elegir perfiles ficticios. El estado de la demo se genera en memoria y se reinicia al recargar; la preferencia de perfil se guarda localmente. El selector de perfil no autentica ni autoriza usuarios.

La demo incluye mercado y detalle de ofertas, publicación de ofertas y solicitudes de compra, comparación de compatibilidad, contacto y negociación, estados e historial de operaciones, estado de pago informativo, alertas, administración y propuestas de rutas. Las rutas, distancias y costos son simulados. Las condiciones y registros de calidad son declarados y su revisión no equivale a certificación sanitaria.

La aplicación no procesa pagos ni garantiza ventas, transporte, calidad o inocuidad. La demo advierte que no se deben compartir datos personales ni documentos privados. No hay registro de usuarios ni operaciones persistentes habilitados en los flujos de producto.

### Supabase y despliegue

- Existe un cliente Supabase para navegador, clientes y middleware de servidor y tipos de base de datos generados. Los tipos reflejan un esquema conocido por el código, pero no prueban por sí solos el estado actual ni la seguridad de la base remota.
- Los flujos de producto usan `StoreProvider` y no invocan el cliente Supabase. Por ello, la presencia de configuración no demuestra que autenticación, permisos, almacenamiento o persistencia funcionen de extremo a extremo.
- El 19 de noviembre de 2026, el endpoint público de configuración de Supabase Auth respondió HTTP 200 con la clave publicable configurada y reportó Google deshabilitado. Esto verifica conectividad con Auth, no inicio de sesión ni acceso o seguridad de la base de datos. No había una conexión de base de datos disponible para validar el esquema remoto o sus políticas.
- El archivo de entorno local contiene nombres de variables para el proyecto, URL y clave publicable; no contiene una variable de clave de servicio. No se verificaron las variables de los entornos desplegados ni se requiere exponer la clave de servicio al navegador.
- La configuración de Vite indica Nitro con destino Cloudflare por defecto; no se ha verificado un despliegue compatible en Vercel.
- Lovable administra el esquema y los archivos generados: los cambios de base de datos deben solicitarse allí, sin editar manualmente migraciones ni archivos generados. Los secretos deben permanecer fuera del repositorio y del navegador.

## 6. Alcance funcional objetivo del piloto

1. **Identidad y acceso:** iniciar y cerrar sesión con Google; registrar perfil y rol; aplicar autorización real en servidor y políticas de base de datos. El administrador no se asigna por selección libre.
2. **Oferta y demanda:** crear y consultar ofertas y solicitudes persistentes con volumen, producto, ubicación aproximada, disponibilidad, precio y condiciones declaradas. Validar datos y estados en servidor.
3. **Descubrimiento:** buscar y comparar oportunidades por municipio, volumen, horarios, precio y condiciones; indicar limitaciones del cálculo de compatibilidad.
4. **Negociación:** contacto entre participantes autorizados, mensajes y propuestas, acuerdo explícito y seguimiento de la operación por lote con historial auditable.
5. **Logística:** coordinar responsable, recogida, entrega y volúmenes; conservar la identificación de cada lote. Las distancias y costos estimados deben identificarse como tales.
6. **Confianza:** administrar reportes y revisión de información declarada; proteger ubicación precisa, contactos y documentos con permisos explícitos. Una revisión no certifica calidad sanitaria.
7. **Alertas:** informar cambios y oportunidades relevantes a los participantes autorizados; definir canales y preferencias antes de habilitar envíos externos.

Fuera de alcance inicial: procesamiento o custodia de pagos, garantía de venta o recogida, certificación sanitaria, precios regulados y optimización logística profesional. El estado de pago es informativo hasta que se decida e implemente otra cosa.

## 7. Requisitos no funcionales

- **Seguridad:** mínimo privilegio, RLS en tablas expuestas, verificación de pertenencia y transición en servidor, protección de secretos y pruebas de acceso entre roles y usuarios. La clave de servicio nunca va al navegador.
- **Privacidad:** mostrar ubicación aproximada por defecto; limitar contactos, ubicación precisa y documentos a participantes autorizados. Definir consentimiento, retención y eliminación antes de usar datos reales.
- **Confiabilidad:** operaciones persistentes y consistentes, manejo de errores, registros de auditoría, copias de seguridad y procedimiento de recuperación comprobado.
- **Usabilidad:** flujos en español, móviles y accesibles, con conexiones rurales variables; mensajes claros cuando una operación falla o queda pendiente.
- **Operación:** monitoreo, alertas, configuración separada por entorno y pruebas automatizadas de los flujos críticos antes de cada despliegue.
- **Cumplimiento:** validar con asesoría competente obligaciones colombianas de protección de datos, comercialización, transporte y condiciones sanitarias antes del piloto real.

## 8. Milestones

Las siguientes etapas son propuestas y no implican fechas comprometidas. La preparación de Vercel puede avanzar en paralelo, pero la apertura a datos reales depende de identidad, permisos y persistencia verificadas.

### M0. Consolidar la demostración

- Completar y probar recorridos de los cinco perfiles en móvil y escritorio; corregir bloqueos identificados.
- Mantener explícitas las limitaciones de datos ficticios, reinicio y simulación.
- **Aceptación:** se prueban publicación, descubrimiento, negociación y seguimiento sin presentar la demo como servicio real.

### M1. Base productiva segura en Supabase

- Inventariar y validar el proyecto remoto, esquema existente, entorno y permisos. Solicitar a Lovable los cambios necesarios en esquema, RLS y almacenamiento privado.
- Diseñar perfiles, ofertas, solicitudes, operaciones, mensajes, eventos, rutas y alertas; migrar acciones de la demo a persistencia con validación de servidor.
- **Aceptación:** un flujo de prueba persiste tras recargar; pruebas con distintos usuarios demuestran que no pueden leer ni modificar información ajena; documentos y secretos no quedan públicos. Se verifica respaldo y recuperación.

### M2. Inicio de sesión con Google

- Configurar Google como proveedor de Supabase Auth con credenciales gestionadas como secretos y URIs de redirección autorizadas para cada entorno; implementar inicio, callback, sesión, cierre y recuperación ante errores.
- Crear o vincular el perfil tras autenticación y definir un proceso controlado de asignación de roles. Mantener el acceso a la demo separado de cuentas reales.
- **Aceptación:** un usuario inicia sesión y regresa a la aplicación en desarrollo y entorno desplegado, mantiene y cierra su sesión; un usuario sin sesión no accede a recursos privados y no puede autoasignarse administrador.

### M3. Despliegue en Vercel

- Verificar compatibilidad de TanStack Start y Nitro con el runtime de Vercel; ajustar el adaptador o preset soportado sin romper la integración de Lovable.
- Configurar proyecto, variables y secretos por entorno, dominios y URLs de callback; habilitar despliegues de vista previa y producción con controles de acceso adecuados.
- **Aceptación:** build y despliegue reproducibles, navegación y SSR operativos, OAuth y operaciones autorizadas verificados en el entorno desplegado, sin secretos en el cliente; documentar rollback y monitoreo.

### M4. Piloto transaccional controlado

- Incorporar participantes reales en una zona y bajo términos, soporte y responsabilidades previamente acordados. Validar el flujo completo de oferta a entrega, notificaciones y reportes.
- Establecer línea base, instrumentar métricas y recopilar retroalimentación; revisar calidad y requisitos legales con los responsables correspondientes.
- **Aceptación:** participantes autorizados completan y registran una operación de prueba de punta a punta; se puede auditar su historial y atender incidencias sin exponer información privada.

### M5. Nueva funcionalidad: transparencia de precios e ingreso neto

- Mostrar al productor referencias agregadas de precios por zona, periodo y tipo de leche, indicando fuente, fecha, unidad, condiciones y cobertura. Cuando no exista información suficiente o confiable, indicar que no hay referencia disponible.
- Comparar propuestas por precio y costo de transporte o comisiones asumidas por el productor, destacando el ingreso neto estimado y sus supuestos. No inferir el precio justo ni prometer una mejora.
- **Aceptación:** con datos de prueba, el productor compara al menos dos propuestas y ve el cálculo desglosado; referencias insuficientes o desactualizadas no se presentan como precio de mercado vigente. Validar privacidad y cantidad mínima de observaciones antes de publicar agregados.
- **Dependencias:** fuentes autorizadas, metodología y frecuencia acordadas, datos persistentes y revisión de privacidad.

### M6. Nueva funcionalidad: compras competitivas y contraofertas

- Permitir al productor recibir y comparar propuestas de compradores habilitados con precio, volumen, ventana, transporte y condiciones de pago; permitir contraofertar y aceptar explícitamente una propuesta.
- Evitar que el volumen comprometido se venda dos veces y preservar un historial de propuestas. Definir visibilidad de ofertas y condiciones de cancelación antes del piloto.
- **Aceptación:** dos compradores pueden proponer condiciones; el productor compara y contraoferta, y la aceptación registra un único compromiso consistente incluso ante solicitudes simultáneas. Ninguna propuesta privada se revela a otros compradores sin autorización.
- **Dependencias:** identidad, permisos, reglas de concurrencia y operaciones persistentes de M1-M2.

### M7. Nueva funcionalidad: agrupación comercial y logística entre productores

- Permitir que productores o asociaciones propongan consolidar volúmenes y coordinar una recogida compartida con consentimiento explícito de cada productor, sin perder identidad ni condiciones de cada lote.
- Mostrar costos de transporte estimados y su reparto propuesto, volumen, horarios, capacidad y responsables; confirmar condiciones antes de cerrar el acuerdo.
- **Aceptación:** al menos dos productores autorizan su participación, pueden revisar o rechazar su parte y conservan trazabilidad individual; el total no supera la capacidad y el reparto de costos es visible. No se presenta la estimación como cotización o ruta garantizada.
- **Dependencias:** reglas de representación de asociaciones, participación, costos y responsabilidad acordadas con usuarios; persistencia, permisos y logística de M1-M4.

## 9. Riesgos y decisiones pendientes

- **Liquidez del mercado:** validar suficientes compradores y productores en una misma zona y ventana antes de ampliar cobertura.
- **Precio y rentabilidad:** identificar fuentes de datos y costos reales; una referencia incompleta puede inducir decisiones equivocadas.
- **Seguridad y confianza:** validar RLS, acceso a archivos y administración; el selector de demo no es un control de seguridad.
- **Perecibilidad y calidad:** definir responsabilidades, verificación y manejo de incidencias; la plataforma no sustituye controles sanitarios.
- **Operación:** definir responsables de soporte, moderación, cancelaciones, disputas y recuperación de datos.
- **Modelo de negocio:** validar con usuarios posibles planes o comisiones y quién paga el transporte; no asumir cobros existentes.
- **Alcance del piloto:** acordar zona, perfiles elegibles, metas numéricas, criterios de entrada y salida, y responsables de cada milestone.