# Auditoría SEO de SaltySoulTrips — 29 de septiembre de 2026

## Conclusión

Hay problemas técnicos y comerciales verificables que conviene corregir antes de ampliar el blog. El más importante es que varias páginas principales entregan inicialmente la portada, con su título y canonical, y solo pasan a tener su contenido correcto después de ejecutar JavaScript. También hay versiones inglesas en español, pérdida de antiguas rutas sin redirecciones y errores en precios y descripciones.

Estos problemas pueden limitar la captación orgánica. No prueban que hayan causado el descenso concreto de los últimos 28 días: falta comparar posiciones, impresiones y clics por consulta y URL en Search Console. Las capturas muestran que aproximadamente 12 de los 22 clics perdidos proceden de dos búsquedas de marca.

## Alcance y evidencia

- Lectura de configuración, rutas, preparación de HTML, etiquetas SEO, idiomas, componentes comerciales, blog, formulario, medición y textos del proyecto.
- Consulta de las 62 URLs del sitemap publicado: portada, diez rutas estáticas adicionales, blog, 40 variantes de 20 paquetes y diez variantes de siete artículos.
- Cuatro comprobaciones adicionales: una URL inexistente, `/destinos/japon`, dominio sin www y HTTP.
- Navegador con JavaScript y pantalla de 390 × 844 para seis rutas: servicios, paquetes, contacto, paquete inglés, antiguo destino y URL inexistente.
- Revisión del historial de rutas. El cambio local del 11 de agosto de 2026 eliminó destinos y cómo funciona. La fecha del commit no acredita la fecha de publicación.
- Evidencia reproducible: `crawl-live.json`, `browser-live.json`, `sitemap-live.xml` y capturas móviles, en esta carpeta.
- No se han modificado ni publicado archivos funcionales de la web. Se ha conservado la modificación previa en ContactForm.jsx. No se han enviado formularios reales.

No se ha accedido a Search Console, Analytics, historial de despliegues, perfil de empresa, datos de enlaces externos ni datos reales de Core Web Vitals. No se ha realizado una auditoría jurídica, de seguridad ni una revisión factual exhaustiva de todos los consejos de viaje. La extracción HTTP y las seis comprobaciones de navegador no equivalen a inspeccionar todas las páginas en todas las pantallas.

## Hallazgos prioritarios

### 1. Alta: HTML inicial incorrecto en páginas principales

En 13 URLs del sitemap distintas de la portada aparece inicialmente el mismo título, H1 y canonical de la portada: las diez rutas estáticas ES/EN y tres URLs inglesas del blog. Ejemplos: `/servicios`, `/contacto`, `/paquetes`, `/experiencias` y `/descuentos`.

El navegador confirma que servicios, contacto y paquetes corrigen título, contenido y canonical al ejecutar JavaScript. Por tanto, no es correcto decir que Google no puede verlas o que todas están necesariamente desindexadas. Sí existe una dependencia evitable del renderizado y señales iniciales contradictorias.

Causa localizada: `scripts/prerender.js` prepara `/`, `/blog`, paquetes y artículos españoles, pero omite las páginas estáticas y slugs ingleses de artículos. `vercel.json` sirve `/index.html` como alternativa. Los paquetes y los artículos españoles comprobados sí entregan contenido propio inicialmente; no está roto todo el prerenderizado.

Acción: generar HTML por cada ruta indexable, validar contenido y canonical antes de publicar y reservar el tratamiento 404 para rutas desconocidas. Google recomienda mantener claras las señales canonical en sitios JavaScript: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

### 2. Alta: antiguas páginas eliminadas sin migración

El historial local muestra que el 11 de agosto se quitaron `/destinos`, `/destinations`, sus detalles y `/como-funciona` y `/how-it-works`. No hay mapa de redirecciones en la configuración actual.

Prueba pública: `/destinos/japon` responde HTTP 200 con la portada inicialmente y muestra una página de error al ejecutar JavaScript. La URL inexistente de control hace lo mismo. Esto es un comportamiento de soft 404; falta Search Console para saber si Google lo ha clasificado así y cuánto tráfico tenían las URLs antiguas.

Acción: recuperar las URLs históricas de Search Console y del sitemap antiguo. Restaurar páginas útiles o redirigir permanentemente a equivalentes reales, una por una. Las que no tengan sustituto deben responder 404/410. No redirigir todos los destinos a la portada ni asumir que un paquete combinado sustituye una guía completa de un país.

Referencia: https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors

### 3. Alta: inglés anunciado pero servido en español

Las 20 URLs `/packages/...` entregan HTML español y canonical a `/paquetes/...`, pese a que el sitemap las presenta como variantes inglesas. El navegador confirma que una entrada directa a `/packages/disneyland-paris` sigue en español después de ejecutar JavaScript.

`src/i18n.js` arranca siempre en español. El selector cambia el estado en memoria y solo traduce rutas estáticas; no establece correctamente el idioma a partir de una entrada directa a un paquete. Inicio y listado del blog usan la misma URL para ambos idiomas. La URL inglesa del artículo Disney contiene espacios y un signo `?`, que introduce una consulta en lugar de formar parte normal de la ruta; requiere corregir el slug y migrarlo si ha sido utilizado.

Acción: definir URLs estables por idioma, derivar el idioma de la URL, prerenderizar cada versión con su traducción y usar canonical propio y hreflang recíproco. Anunciar solo traducciones reales. Si se prioriza español, retirar del sitemap las variantes inglesas incompletas mientras se corrigen, con el tratamiento correspondiente de sus URLs.

Referencia: https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites

### 4. Alta: precios incorrectos en los datos para buscadores

En 13 de los 20 paquetes españoles, el precio estructurado queda numéricamente por debajo de 10 porque el código trata el separador de miles como separador decimal. Ejemplos comprobados:

| Oferta | Precio visible | Valor estructurado actual | Valor numérico correcto |
|---|---|---|---|
| Ruta 66 | 3.000 € | `3.000` | `3000` |
| Tanzania | 4.800 € | `4.800` | `4800` |
| Este Canadiense | 1.847,50 € | `1.847` | `1847.50` |

No se ha verificado que Google muestre estos precios en resultados. El dato publicado sí es incorrecto. El origen está en `PackageDetailPage.jsx`: extrae una parte de un texto comercial con una expresión regular.

Además, la portada declara un Paquete Explora por 50 €, que no aparece en el contenido visible de la portada; servicios lo anuncia a 70 €. Se incluyen datos de envío físico y devoluciones que requieren revisar su adecuación al servicio real.

Acción: guardar precio numérico, moneda y base del precio —persona o grupo— como campos independientes. Omitir ofertas sin precio válido en vez de declarar cero. Alinear datos estructurados con información visible y vigente.

Referencia sobre formato numérico: https://developers.google.com/search/docs/appearance/structured-data/product-snippet

### 5. Alta: descripciones SEO y ofertas no coinciden

Datos publicados, sin depender de una interpretación de posicionamiento:

| Página | Descripción SEO | Contenido visible |
|---|---|---|
| Este Canadiense | Desde 847,50 € | Desde 1.847,50 € |
| India & Safari | Desde 847,50 € | Desde 1.847,50 € |
| Nueva York & Disney | Desde 747,50 € | Desde 2.747,50 € |
| Japón + Bali | 6 noches | 14 días; enumera 6 noches Tokio y 4 Ubud |
| Nueva York & Maldivas | 5 noches | 14 días; enumera 5 noches NYC y 5 Maldivas |
| Laponia | Desde 3.999 € por persona | 3.999 € total para 5 personas |

También hay sumas de noches que requieren aclaración: Tanzania anuncia 11 noches pero enumera 3 de safari, 3 en Arusha y 7 en Zanzíbar; Nueva York & Disney anuncia 10 noches y enumera 5 + 4. No conviene corregir a ojo: contrastar con el programa real.

Los scripts de generación SEO usan extracciones de texto que no son fiables para precios con miles o itinerarios por etapas. Acción: revisar las 20 ofertas con su información comercial original y generar metadatos desde datos estructurados validados. No copiar indiscriminadamente un nuevo texto a todas las páginas.

### 6. Alta comercial: dos modelos de servicio contradictorios

La portada promete gestionar vuelos, hotel y actividades. Servicios dice «Tú solo reservas, yo te lo diseño todo». Los términos del proyecto afirman que no se realizan reservas en nombre del cliente. El formulario ofrece un complemento de orientación de 100 €, mientras servicios presenta packs de 70/100/150 €.

Esto puede confundir al cliente sobre lo que compra y quién reserva. No demuestra una penalización. Acción: confirmar el modelo actual y armonizar portada, servicios, formulario, FAQ, metadatos y términos. Si existen ambos servicios, explicarlos por separado, con su alcance y precio. Revisar las condiciones con quien corresponda antes de hacer afirmaciones definitivas.

### 7. Media-alta: enlaces comerciales y servicios poco accesibles

El listado de paquetes abre sus fichas mediante `onClick` en tarjetas, sin enlaces `<a href>` en su contenido principal; lo confirman el código y el navegador. El pie ofrece enlaces reales a ocho paquetes, pero no sustituye un catálogo enlazado completo. El menú principal tampoco incluye servicios.

Acción: usar enlaces reales para cada ficha y botones solo para acciones como filtros. Ofrecer una ruta clara hacia el servicio a medida. Google explica que no extrae de forma fiable las URLs de elementos que navegan únicamente mediante eventos: https://developers.google.com/search/docs/crawling-indexing/links-crawlable

### 8. Media: contenido comercial poco desarrollado

Los 20 paquetes ya aportan precio e inclusiones: es una base útil. Muchas fichas son breves y títulos como «Brasil» o «París» apenas explican la oferta. La portada muestra Hero y Filosofía; testimonios, proceso de trabajo y preguntas frecuentes no forman parte de su contenido principal actual.

Acción: enriquecer primero dos o tres ofertas rentables con impresiones existentes. Incluir itinerario coherente, salidas, fechas o temporada, base del precio, exclusiones, personalización, para quién es y ejemplos reales. Propuestas orientativas de título: «Viaje a Japón y Bali a medida | SaltySoulTrips» y «Viaje a Nueva York y Maldivas | SaltySoulTrips». No son palabras clave con demanda validada.

Las páginas de servicios, contacto y listado de paquetes no tienen H1 en el contenido de React comprobado. Corregir la jerarquía ayuda a describirlas, pero no es el principal problema ni una garantía de mejora.

### 9. Media: blog desconectado de la solicitud comercial

Se revisaron siete artículos españoles. Hay material de experiencia propia que merece conservarse: buceo, comparativa Tailandia/Bali y Maldivas. En varios artículos los enlaces internos son esencialmente menú, vuelta al blog y pie común, sin conexión contextual a un viaje relacionado ni llamada específica a solicitarlo.

Acción: añadir enlaces pertinentes dentro del artículo, autor visible con experiencia verificable y un siguiente paso útil. Mantener la diferencia entre experiencia personal y análisis de una oferta no probada. Revisar afirmaciones absolutas no respaldadas; por ejemplo, el artículo de Maldivas afirma que ciertos tiburones son «totalmente inofensivos». No conservar garantías de seguridad como recurso persuasivo. Esta auditoría no ha validado zoología, precios ni recomendaciones turísticas.

No hace falta alcanzar una cantidad arbitraria de palabras. La aportación propia y la fiabilidad importan más que publicar por publicar: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

### 10. Alta comercial: formulario puede confirmar solicitudes fallidas

En el código local, `ContactForm.jsx` no comprueba `response.ok` y también activa el estado de éxito dentro de `catch`. Un error de red o un HTTP 500 podría parecer un envío correcto. El archivo tenía cambios previos del usuario; no se ha alterado. No se ha probado el envío real ni acreditado pérdida efectiva de solicitudes.

Acción: mostrar éxito solo tras confirmación, mantener los datos si falla, permitir reintentar y comprobar el circuito de recepción con una prueba acordada. Conservar el paquete elegido al pasar al formulario: actualmente la navegación no lo transmite.

### 11. Media: medición y preferencias de cookies no conectadas

El código carga Analytics desde `index.html`, antes de decidir preferencias. El banner guarda elecciones en localStorage pero no las aplica a Analytics. En una sesión nueva de servicios se observó una petición a Google Analytics sin haber aceptado.

No se encontraron eventos explícitos de solicitud confirmada, WhatsApp o teléfono en el código revisado. Podrían existir configuraciones adicionales en Analytics no accesibles en esta auditoría.

Acción: conectar preferencias con el comportamiento real de medición y registrar solicitudes confirmadas y contactos con su origen. Este punto afecta medición y experiencia; no explica la caída de clics de Search Console. No se emite una conclusión legal.

### 12. Media-baja: rendimiento y móvil

Las seis páginas comprobadas no presentaron desbordamiento horizontal a 390 px. En contacto el formulario es largo y el aviso de cookies ocupa parte relevante de la primera pantalla; revisar la facilidad para pedir un primer presupuesto. La captura completa contiene zonas no animadas todavía al estar fuera de pantalla: no se consideran contenido roto.

La respuesta inicial incorrecta carga imágenes de la portada incluso al entrar en servicios. El navegador observó una imagen de aproximadamente 277 KB y otra de 115 KB de la portada en esa visita. Corregir el HTML elimina trabajo innecesario. Las imágenes de cabecera de paquetes y blog usan URLs de Sanity sin limitar dimensiones en esos componentes; conviene servir tamaños adecuados y formatos optimizados.

El proyecto ya divide páginas en cargas diferidas. El chat se monta desde el inicio, aunque su archivo sea diferido; valorar cargarlo cuando se necesite. No se ha medido una puntuación Lighthouse ni Core Web Vitals de usuarios reales y no se atribuye la pérdida de tráfico a velocidad.

### 13. Secundaria: ubicación, fechas y afiliación

- El marcado de empresa declara Barcelona, coordenadas del centro y horario continuo todos los días. Confirmar que describe el negocio real. Una consulta «agencia de viajes vendrell» no prueba que la empresa esté allí: no crear ubicación ni perfil local ficticios.
- El sitemap cambia `lastmod` de páginas estáticas cada vez que se genera, aunque no cambie su contenido. Usar fechas reales o prescindir de ese campo cuando no sean fiables.
- El artículo usa `updatedAt` y no `_updatedAt` de Sanity para fecha de modificación; revisar su correspondencia.
- Varios enlaces con identificadores de afiliado no declaran `sponsored`; revisar y etiquetar los comerciales según corresponda.
- Las dimensiones declaradas de la imagen social son inconsistentes entre plantilla y componente; validar la imagen real. Es una mejora secundaria de presentación, no una explicación del descenso.

## Aspectos que funcionan

- Hay sitemap accesible y robots permite rastreo; no se ha encontrado un bloqueo general.
- Los 20 paquetes españoles y los siete artículos españoles entregan inicialmente contenido y canonical propios.
- HTTP y el dominio sin www terminan en HTTPS con www.
- La navegación principal usa enlaces reales; el fallo de enlaces se concentra en tarjetas y determinadas acciones.
- Existen precios, inclusiones, testimonios, contacto y material de experiencia personal aprovechables.

## Plan de corrección

1. Primera tanda técnica: HTML correcto en todas las rutas, 404 reales, mapa de antiguas URLs, idioma por URL y enlaces reales del catálogo. Comprobar HTML inicial y renderizado después de desplegar.
2. En paralelo comercial: verificar los 20 programas, precios numéricos y descripciones; unificar alcance del servicio y eliminar datos estructurados desactualizados. Corregir confirmación del formulario.
3. Después: mejorar portada y dos o tres páginas comerciales prioritarias; conectar artículos relacionados, testimonios y solicitud contextual.
4. Medición: conectar preferencias y eventos confirmados; registrar fecha exacta de cada cambio. Comparar ventanas completas de 28 días y seguir también consultas sin marca y solicitudes cualificadas.

No se fija una promesa de posiciones, clics ni plazos de recuperación. No priorizar compra de enlaces, rediseño completo ni producción masiva de artículos antes de resolver estos hallazgos.

## Datos necesarios para explicar la caída histórica

- Search Console: últimos 28 días frente a los anteriores, con clics, impresiones, CTR y posición; pestañas Consultas y Páginas.
- Análisis separado de variantes de marca y resto; filtrar portada y antiguas URLs de destinos.
- Indexación y una inspección de `/servicios`, un paquete español, un paquete inglés y una antigua URL. Comparar canonical declarado con el elegido por Google.
- Serie de al menos tres meses y, si está disponible, comparación anual; fechas reales de despliegue alrededor de agosto y septiembre.
- Solicitudes recibidas y su origen. Para búsquedas y ventas son métricas diferentes.

Las capturas aportadas no acreditan penalización, caída global de posiciones, causa estacional ni ausencia de demanda. La conclusión defendible es que existen fallos corregibles y que el tráfico actual depende mucho de búsquedas de marca.
