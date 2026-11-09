# Auditoría SEO de SaltySoulTrips — 9 de noviembre de 2026

## Resumen ejecutivo

La base técnica ha mejorado mucho desde la auditoría del 29 de septiembre. Hoy **las 104 URLs del sitemap devuelven HTTP 200 con HTML prerenderizado propio**: título, descripción, canonical, `lang`, hreflang y H1 correctos. Las URLs inexistentes devuelven 404 real y las rutas antiguas, 410.

Lo que ahora limita el tráfico ya no es la indexación básica. Es esto:

1. **Google solo ve unas 200 palabras de cada paquete.** Las secciones del itinerario están en acordeones cerrados que no existen en el HTML.
2. **Los títulos y descripciones SEO que escribiste en Sanity no se usan.** 37 de 38 paquetes tienen `seoTitle`/`seoDescription`, pero la web genera una plantilla («Viaje a Japón semana santa»).
3. **Todas las páginas tienen dos H1.** El `<noscript>` de `index.html` añade el mismo H1 en todo el sitio.
4. **No hay páginas que capten búsquedas genéricas** como «viaje a Japón a medida» o «viaje a Jordania 8 días». Solo hay fichas de paquete y un listado.
5. **Falta autoridad y confianza (E-E-A-T):** no hay página de Ángela, el blog no enlaza a los paquetes, no hay migas de pan ni datos estructurados completos de la empresa.
6. **Rendimiento:** la web borra el HTML prerenderizado y muestra un spinner hasta recibir los datos de Sanity. Además, los JS/CSS con hash se sirven sin caché.

---

## 1. Inventario de páginas (rastreo en producción, 9-nov-2026)

**104 URLs en el sitemap. Todas responden 200, son indexables y tienen canonical autorreferente.**

| Tipo | ES | EN | Total |
|---|---|---|---|
| Portada | `/` | `/en` | 2 |
| Paquetes (listado) | `/paquetes` | `/packages` | 2 |
| Contacto + FAQ | `/contacto` | `/contact` | 2 |
| Experiencias / reseñas | `/experiencias` | `/experiences` | 2 |
| Descuentos / afiliados | `/descuentos` | `/discounts` | 2 |
| Blog (listado) | `/blog` | `/en/blog` | 2 |
| Fichas de paquete | 38 × `/paquetes/…` | 38 × `/packages/…` | 76 |
| Artículos de blog | 10 × `/blog/…` | 6 × `/en/blog/…` | 16 |
| **Total** | **56** | **48** | **104** |

**38 paquetes:** Dubái 5 días, Málaga diciembre 2026, Euskadi 8 días, El Salvador 11 días, Galicia Rías Baixas 8 días, Ruta 66, Jordania 8 días, Polinesia Francesa 11 días, Argentina 12 días, Vietnam 11 días, India 12 días, Cataluña 7 días, Japón Semana Santa 2027, París 7 días desde Madrid, Valencia-Barcelona 4 días, Vietnam + Bali 14 días, Atenas 5 días, Andalucía desde Canarias, Colombia 12 días, Riviera Mexicana en crucero, Brasil, Disneyland París, Dubái + Mauricio, Estambul, Este Canadiense, Estrasburgo/Alsacia, India & Safari, Japón + Bali, Laponia en familia, Madeira, Nueva York + Maldivas, Nueva York en Navidad, Nueva York & Disney, París, Praga, Praga + Viena, Shanghái, Tanzania + Zanzíbar.

**10 artículos ES** (6 con versión EN): seguro de viaje, Londres en 3 días, Cerdeña, crucero Disney, Nueva York en Navidad, Maldivas islas locales (todos con EN). Solo en español: alquiler de coche 2026, Tailandia vs Bali, lo que me hubiese gustado saber de Maldivas, curso de buceo en Koh Tao.

**Comportamiento de URLs fuera del sitemap:**

| URL | Resultado | Valoración |
|---|---|---|
| `/no-existe-xyz`, `/paquetes/no-existe`, `/blog/no-existe` | 404 + `noindex` | ✅ Correcto |
| `/destinos/japon`, `/servicios` | 410 + `noindex` | ⚠️ Ver punto 2.5 |
| `/paquetes/` (barra final) | 200, canonical a `/paquetes` | ⚠️ Mejor una redirección 308 |
| `https://saltysoultrips.com/paquetes` | **307** → www | ❌ Redirección temporal |
| `http://saltysoultrips.com/` | **308 → 307** (2 saltos) | ❌ Cadena con una temporal |

### Lo que ya funciona bien ✅

- Prerender de las 104 rutas: cada URL entrega su propio `<title>`, descripción, canonical y H1 sin ejecutar JavaScript.
- hreflang `es`/`en`/`x-default` recíproco en HTML y en el sitemap. Los artículos solo en español no declaran versión inglesa.
- `<html lang>` y `og:locale` correctos por idioma.
- 404 reales con `noindex` y `X-Robots-Tag`.
- Redirecciones 301 de slugs antiguos del blog en inglés.
- Precios numéricos correctos en el JSON-LD (Japón + Bali `2750`, Ruta 66 `3000`, Este Canadiense `1847.5`).
- Listado de paquetes con enlaces `<a href>` reales (43 enlaces internos).
- No hay títulos ni descripciones duplicados entre URLs del sitemap.
- La mayoría de enlaces de afiliado llevan `rel="sponsored"`.
- robots.txt correcto y sitemap declarado.

---

## 2. Problemas encontrados por prioridad

### 🔴 2.1 ALTA — Google no ve el itinerario de los paquetes

`PackageDetailPage.jsx` divide `longDescription` en acordeones. El componente `Accordion` solo monta su contenido cuando está abierto (`{isOpen && (...)}`), y solo el primero se abre por defecto.

**Resultado medido:** en Sanity las descripciones tienen entre 282 y 468 palabras. El HTML que recibe Google tiene entre 182 y 240 palabras **en total**, contando menú y pie. Ninguna ficha tiene H2: los títulos de sección son `<h3>` dentro de un `<button>`.

**Por qué importa:** las fichas de paquete son tus páginas comerciales. Con ~200 palabras visibles para Google, compiten como contenido escaso frente a agencias con itinerarios día a día.

**Solución:**
- Renderizar siempre el contenido de todos los acordeones y ocultarlo visualmente con CSS (`hidden`, `max-height: 0`, `<details>/<summary>`). Google indexa el contenido oculto en acordeones si está en el DOM.
- Usar `<h2>` para los títulos de sección («Itinerario», «Qué incluye», «Qué no incluye»…), con el `<button>` dentro del encabezado, no al revés.

### 🔴 2.2 ALTA — Los títulos y descripciones SEO del CMS se ignoran

`src/lib/packageSeo.js` genera siempre `Viaje a {título} | SaltySoulTrips` y una descripción de plantilla. Los campos `seoTitle`, `seoDescription`, `seoTitle_en` y `seoDescription_en` existen en Sanity y **37 de 38 paquetes los tienen rellenos**, pero no se leen.

Títulos actuales poco naturales:
- «Viaje a Japón semana santa» → en el CMS: «Japón Semana Santa 2027: 13 días»
- «Viaje a Ruta 66: de Chicago a Los Ángeles»
- «Viaje a Este Canadiense»
- «Viaje a París 7 dias» (sin tilde)
- «Trip to Japan holy week»
- «Viaje a Mercados de Alsacia»

Descripciones de más de 160 caracteres, que Google corta: Riviera Mexicana (188), Ruta 66 (180 ES / 175 EN), Polinesia (169), Valencia-Barcelona (168), El Salvador (165), Vietnam + Bali (165) y varias más entre 161 y 163.

**⚠️ Atención antes de activarlos:** algunos campos del CMS siguen con los errores de la auditoría anterior:
- Este Canadiense: «desde 847,50 €» (el precio real es 1.847,50 €)
- Japón + Bali: «6 noches» (son 14 días)
- `new-york-and-disney`: sin `seoTitle`

**Solución:** revisar los 38 `seoTitle`/`seoDescription` en Sanity (máximo unos 60 y 155 caracteres) y usarlos en `packageSeo()`, dejando la plantilla solo como alternativa. Añadir validación de longitud en el esquema de Sanity.

### 🔴 2.3 ALTA — Dos H1 en todas las páginas

El `<noscript>` de `index.html` contiene `<h1>SaltySoulTrips — Viajes Personalizados a Medida</h1>`. Como el prerender parte de esa plantilla, **las 104 páginas tienen dos H1**, y el segundo es igual en todo el sitio.

**Solución:** cambiar ese `<h1>` por `<p>` o eliminar el bloque `<noscript>`, que ya no hace falta porque el HTML está prerenderizado.

### 🔴 2.4 ALTA — Redirecciones del dominio sin www temporales

`saltysoultrips.com` redirige a `www` con **307 (temporal)**. HTTP hace dos saltos: 308 a `https://saltysoultrips.com` y después 307 a `www`.

**Solución (en Vercel → Settings → Domains):** configurar `saltysoultrips.com` como redirección **308 permanente** a `www.saltysoultrips.com`. Comprobar después que `http://saltysoultrips.com/x` llega en un solo salto o en dos permanentes.

### 🟠 2.5 MEDIA-ALTA — Las antiguas URLs de destinos devuelven 410

`/destinos/*`, `/destinations/*`, `/servicios` y `/como-funciona` devuelven 410. Eso las elimina rápido del índice y **pierde cualquier enlace externo o autoridad** que tuvieran.

**Solución:**
1. En Search Console → Páginas, filtrar `/destinos/` y comprobar cuáles tenían clics, impresiones o enlaces externos.
2. Redirigir con 301 las que tengan equivalente real: `/destinos/japon` → futura landing de Japón (ver 3.1) o `/paquetes/japon-bali`; `/servicios` → `/contacto` o una página de servicio.
3. Mejor todavía: **recuperar `/destinos/{pais}` como páginas por destino** (punto 3.1). Esas URLs ya tienen historia en Google.

### 🟠 2.6 MEDIA-ALTA — La web borra el HTML prerenderizado al cargar

`main.jsx` usa `createRoot().render()` y no `hydrateRoot`. Al cargar, React desecha el HTML prerenderizado, monta la página vacía y, en paquetes y blog, **muestra «Cargando detalles del paquete…» hasta que responde Sanity**. Después pinta todo otra vez.

Para Google (que ya recibe el HTML) no es grave. **Para los usuarios reales sí lo es:** empeora el LCP y el CLS, que son las métricas de Core Web Vitals que Google usa como señal de clasificación.

**Solución:**
- Incrustar los datos de la página en el HTML durante el prerender (por ejemplo, `<script id="__DATA__" type="application/json">`), usarlos como estado inicial y cambiar a `hydrateRoot`.
- Si eso es demasiado trabajo de momento, al menos no reemplazar el contenido por el spinner: mantener el HTML existente hasta que lleguen los datos.

### 🟠 2.7 MEDIA — Rendimiento y caché

| Hallazgo | Detalle | Solución |
|---|---|---|
| Sin caché en JS/CSS con hash | `/assets/*.js` se sirve con `Cache-Control: max-age=0, must-revalidate` | Añadir en `vercel.json` una cabecera `public, max-age=31536000, immutable` para `/assets/(.*)` |
| Bundle principal pesado | `index.js`: 483 KB (158 KB con Brotli) + framer-motion 124 KB en todas las páginas | Mover el cliente de Sanity y el locale no usado a carga diferida; valorar `LazyMotion` de framer-motion |
| Google Fonts con `@import` en CSS | Cadena bloqueante: HTML → CSS → CSS de fuentes → fuente | Usar `<link rel="stylesheet">` en el `<head>` (ya hay preconnect) o alojar las fuentes en el propio dominio |
| Imagen principal de paquete a 2400 px, calidad 90 | Es el elemento LCP de 76 páginas; sin `srcset` ni `fetchpriority` | `srcset` con 800/1200/1600/2400, `sizes="100vw"`, `fetchpriority="high"`, calidad 75–80 |
| Flyer a 2400 px | Se carga de forma diferida, pero sigue siendo enorme | `srcset` con un máximo de ~1000 px en la vista y 2400 solo en el modal |
| Dos imágenes con `fetchPriority="high"` en la portada | El logo PNG y el fondo compiten | Dejar alta prioridad solo en la imagen LCP; el logo debería ser SVG o WebP |
| Imagen social por defecto | `logoGoogle.png` pesa 140 KB | Crear una imagen OG de 1200×630 en JPG/WebP con una foto de viaje y el logo |

No se ha podido medir Lighthouse porque la API de PageSpeed sin clave había agotado su cuota diaria. **Ejecuta https://pagespeed.web.dev/ en la portada, en `/paquetes` y en una ficha**, y revisa el informe de Core Web Vitals en Search Console.

### 🟠 2.8 MEDIA — Blog: títulos, descripciones y autoría

| Problema | Artículos |
|---|---|
| Título SEO demasiado largo (Google corta a unos 60 caracteres) | Seguro de viaje ES (119) y EN (102), crucero Disney ES (106) y EN (91), alquiler de coche (96, con emojis 🚗💨), Maldivas «lo que me hubiese gustado saber» (80, «MALDIVAS» en mayúsculas) |
| Sin extracto: la descripción es la plantilla «X - Blog de viajes de SaltySoulTrips.» | Tailandia vs Bali (61 caracteres), Curso de buceo en Koh Tao (69) |
| Fecha mostrada en formato crudo | `2026-03-22` → «22 de marzo de 2026» |
| El autor del JSON-LD apunta a la portada | `author.url` debería llevar a una página de Ángela |
| Sin enlaces contextuales a paquetes | Ejemplo: el artículo de Nueva York en Navidad no enlaza `/paquetes/nueva-york-navidad` en el texto |
| Sin artículos relacionados ni migas de pan | Ningún artículo enlaza a otros del blog |

**Solución:** rellenar en Sanity `seoTitle` (≤ 60) y `excerpt`/`seoDescription` (≤ 155) de cada artículo. Añadir un bloque «Viaje relacionado» que enlace al paquete del mismo destino y otro de «Artículos relacionados».

### 🟠 2.9 MEDIA — Datos estructurados incompletos

| Página | Actual | Recomendado |
|---|---|---|
| Portada | `TravelAgency` mínimo: nombre, teléfono, imagen y sameAs | Añadir `logo`, `description`, `email`, `address` (solo si hay dirección real), `areaServed`, `founder` (Person: Ángela), `contactPoint` y `knowsLanguage`. Añadir también `WebSite` con `inLanguage` |
| Fichas de paquete | `Product` con una descripción de plantilla | Mejor `TouristTrip` con `itinerary`, `touristType` y una `offers` con `priceSpecification` (por persona). `Product` sin reseñas ni política de devoluciones genera avisos en Search Console. En ofertas con fecha (Málaga dic 2026, Japón SS 2027), añadir `priceValidUntil` o `availabilityEnds` |
| Todas salvo la portada | Sin migas de pan | `BreadcrumbList` (Inicio › Paquetes › Japón + Bali; Inicio › Blog › artículo), además de migas visibles |
| Contacto | Sin datos | `FAQPage` para la sección de preguntas frecuentes. Desde 2023 ya no da resultado enriquecido a agencias, pero ayuda a la comprensión del contenido y a las respuestas de IA |
| Blog | `BlogPosting` correcto | `author` → `Person` con `url` a la página «Sobre mí» y `sameAs` a Instagram/TikTok; `mainEntityOfPage`; `inLanguage` |

Valida cada cambio con https://search.google.com/test/rich-results y https://validator.schema.org/.

### 🟡 2.10 MEDIA-BAJA — Enlaces de afiliado sin `sponsored`

- **Pie de página (en todas las páginas):** GetYourGuide (`partner_id=…`), Expedia y SiteMinder llevan solo `noopener noreferrer`.
- **`/descuentos`:** el primer bloque de tarjetas (Heymondo, Holafly, GetYourGuide, AirHelp, CJ, Awin, Agoda, Expedia) no lleva `sponsored`. `Discounts.jsx:260`.

**Solución:** `rel="sponsored noopener noreferrer"` en todos los enlaces con identificador de afiliado. Google lo exige para enlaces remunerados.

### 🟡 2.11 BAJA — Otros detalles

- **Barra final:** `/paquetes/` devuelve 200. Añadir en `vercel.json` una regla que redirija con 308 cualquier `/(.+)/` a la versión sin barra.
- **Imágenes sin `alt`:** 1 en la portada y 3 en `/descuentos` (logos de partners).
- **El botón «Volver a Paquetes»** de la ficha es un `<button>` con `navigate()`. Mejor un `<Link>`: es navegación y suma un enlace interno.
- **Paquetes con fecha:** `malaga-diciembre-2026` caduca el mes que viene y `japon-semana-santa-2027`, en abril. Decide ya qué harás cuando pasen: actualizar a la siguiente edición manteniendo la URL, o 301 a un paquete equivalente. Nunca 404.
- **Datos de la portada en `index.html`:** el `<title>`, la descripción y la imagen OG de la plantilla dicen «⭐ 5 estrellas». Si la valoración no es verificable en la página, quítalo.
- **Twitter `@saltysoultrips`:** confirma que la cuenta existe. Si no, elimina `twitter:site` y `twitter:creator`.
- **Sitemap:** está bien. Opcionalmente, añadir `<image:image>` con la portada de cada paquete y artículo para Google Imágenes.

---

## 3. Estrategia para aumentar el tráfico

Lo técnico ya está casi resuelto. **El crecimiento vendrá de cubrir más búsquedas, con más profundidad, y de ganar autoridad.**

### 3.1 Crear páginas por destino (la mayor oportunidad)

Ahora solo hay fichas de un paquete concreto. Nadie busca «Japón + Bali SaltySoulTrips»; se busca «**viaje a Japón a medida**», «**viaje a Jordania 8 días**», «**cuánto cuesta un viaje a Tanzania**» o «**viaje organizado a Vietnam**».

Propuesta: recuperar `/destinos/{pais}` (URLs con historial en Google) como **páginas por destino**, por ejemplo:
- `/destinos/japon`: introducción propia, mejor época, presupuesto orientativo, rutas tipo de 10/14 días y FAQ. Enlaza los paquetes de Japón (Semana Santa 2027, Japón + Bali) y los artículos relacionados.
- Empieza por los destinos con más paquetes y demanda: **Japón, India, Nueva York, Vietnam, Maldivas, París, Dubái, Tanzania**.
- Ya tienes el mapa de países (`countryMap.js`) y el filtro, así que la estructura de datos existe.
- Versión EN: `/en/destinations/japan` con hreflang.

### 3.2 Enlazado interno (esfuerzo bajo, impacto alto)

Cada ficha de paquete tiene ahora solo 13 enlaces internos (menú y pie). Añade:
- **«Paquetes similares»:** 3 del mismo país o continente.
- **«Lee antes de viajar»:** artículos del mismo destino.
- **Migas de pan:** Inicio › Paquetes › Asia › Japón + Bali.
- En cada artículo, **un enlace contextual en el texto** al paquete o destino relacionado y una llamada a la acción específica («¿Quieres este viaje? Pide tu propuesta»).

### 3.3 Calendario de contenido vinculado a lo que vendes

Cada artículo debería apoyar un paquete o un destino. Ideas concretas:

| Artículo | Apoya a |
|---|---|
| Qué ver en Jordania en 8 días (Petra, Wadi Rum, Mar Muerto) | Jordania 8 días |
| Japón en Semana Santa: ¿merece la pena? Clima, sakura y precios | Japón SS 2027 |
| Laponia con niños: cuándo ir, qué incluye y cuánto cuesta | Laponia en familia |
| Safari en Tanzania: mejor época y presupuesto real | Tanzania + Zanzíbar |
| Ruta 66 en coche: etapas, presupuesto y consejos | Ruta 66 |
| Vietnam en 2 semanas: itinerario | Vietnam 11 días / Vietnam + Bali |
| Dubái en 5 días: qué ver y cuánto cuesta | Dubái 5 días / Dubái + Mauricio |

**Estacionalidad:** publica 2–3 meses antes de la temporada. Ahora (noviembre) toca Semana Santa, Japón con sakura y escapadas de primavera. Navidad en Nueva York y Laponia ya van tarde: actualízalos y destácalos esta semana.

Traduce al inglés los artículos solo en español con más tráfico (Tailandia vs Bali, buceo en Koh Tao). Son experiencias propias con mucho valor.

### 3.4 E-E-A-T: demostrar experiencia y confianza

- **Página «Sobre mí / Quién es Ángela»:** historia, viajes hechos, fotos propias, formación y, si aplica, registro de agencia de viajes. Enlázala desde el autor de cada artículo y desde el JSON-LD.
- **Fotos propias** en lugar de imágenes de stock (el fondo de la portada es de Unsplash).
- **Reseñas verificables:** pedir reseñas en Google a cada cliente y enlazar a ellas. Las de la propia web no generan estrellas en Google.
- **Página clara de cómo trabajas y cuánto cuesta el servicio.** Sigue pendiente la incoherencia entre «gestionamos tus reservas» y «tú reservas» señalada en la auditoría de septiembre.

### 3.5 Autoridad externa (enlaces y marca)

- **Perfil de Empresa en Google**, solo si hay dirección o zona de servicio real. Es clave para búsquedas de marca y reseñas.
- Biografía de Instagram y TikTok enlazando a páginas concretas (destinos, paquetes de temporada), no solo a la portada.
- Colaboraciones: artículos invitados en blogs de viajes, entrevistas en podcasts y medios locales, y proveedores con los que trabajas (Heymondo, Holafly…), que a veces enlazan a sus partners.
- Directorios de calidad del sector y asociaciones, si perteneces a alguna.
- **No compres enlaces.**

### 3.6 Medición

- **Search Console:** enviar el sitemap de nuevo después de los cambios; revisar *Páginas → No indexadas*; inspeccionar una ficha de paquete y comprobar en «Ver página rastreada» que aparece todo el itinerario.
- **Bing Webmaster Tools:** importar desde Search Console (2 minutos). Bing alimenta ChatGPT y Copilot.
- **GA4:** marcar como conversión el envío confirmado del formulario y los clics a WhatsApp, teléfono y email (los eventos ya existen en `Analytics.jsx`).
- **Seguimiento mensual:** clics sin marca, páginas de paquete con impresiones, CTR por título y solicitudes recibidas.

---

## 4. Plan de acción priorizado

| # | Acción | Impacto | Esfuerzo | Dónde |
|---|---|---|---|---|
| 1 | Renderizar el contenido de los acordeones en el DOM + H2 | 🔴 Alto | Bajo | `PackageDetailPage.jsx` |
| 2 | Quitar el H1 del `<noscript>` | 🔴 Alto | Muy bajo | `index.html` |
| 3 | Redirección 308 de no-www a www | 🔴 Alto | Muy bajo | Panel de Vercel |
| 4 | Revisar `seoTitle`/`seoDescription` en Sanity y usarlos | 🔴 Alto | Medio | Sanity + `packageSeo.js` |
| 5 | Caché inmutable para `/assets/*` | 🟠 Medio | Muy bajo | `vercel.json` |
| 6 | `sponsored` en todos los afiliados + `alt` en logos | 🟠 Medio | Muy bajo | `Footer.jsx`, `Discounts.jsx` |
| 7 | Títulos y extractos de los artículos del blog | 🟠 Medio | Bajo | Sanity |
| 8 | BreadcrumbList + TravelAgency completo + TouristTrip | 🟠 Medio | Medio | `SEOHead`, páginas |
| 9 | Paquetes y artículos relacionados (enlazado interno) | 🟠 Medio-alto | Medio | Paquete y BlogPost |
| 10 | Revisar las URLs 410 en Search Console y redirigir las útiles | 🟠 Medio | Bajo | `vercel.json` |
| 11 | Hidratación con datos incrustados (sin spinner) | 🟠 Medio | Alto | `main.jsx`, prerender |
| 12 | Imágenes responsive en la ficha + fuentes sin `@import` | 🟡 Medio | Bajo | `PackageDetailPage.jsx`, `index.css` |
| 13 | Página «Sobre Ángela» | 🟠 Medio | Bajo | Nueva página |
| 14 | Páginas por destino `/destinos/{pais}` | 🔴 Alto | Alto | Nuevo tipo en Sanity + página |
| 15 | Calendario de contenido vinculado a paquetes | 🔴 Alto (a medio plazo) | Continuo | Blog |
| 16 | Perfil de Empresa en Google + reseñas + enlaces | 🟠 Medio-alto | Continuo | Externo |

**Los puntos 1, 2, 3, 5 y 6 se pueden hacer en una tarde** y corrigen señales que afectan a las 104 páginas.

No hay garantía de posiciones ni de plazos. Los cambios técnicos suelen notarse en Search Console entre 2 y 6 semanas después de que Google vuelva a rastrear; el contenido nuevo y la autoridad, en meses.

---

## Anexo: método

- Rastreo HTTP (user-agent de Googlebot) de las 104 URLs del sitemap publicado y de 8 URLs de control. Se extrajeron estado, título, descripción, canonical, hreflang, `lang`, robots, H1/H2, palabras, imágenes, JSON-LD y enlaces. Los datos están en el scratchpad de la sesión.
- Consulta de la API pública de Sanity para comparar las descripciones y los campos SEO de los 38 paquetes con lo publicado.
- Lectura del código: `App.jsx`, `main.jsx`, `SEOHead.jsx`, `packageSeo.js`, `routes.js`, `route-manifest.js`, `generate-sitemap.js`, `prerender.js`, páginas y secciones, `vercel.json`, `index.html` y esquemas de Sanity.
- Sin acceso a Search Console, Analytics, datos de enlaces externos ni Core Web Vitals reales. La API de PageSpeed no estaba disponible (cuota agotada).
