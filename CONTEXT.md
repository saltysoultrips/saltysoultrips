# SaltySoulTrips — Contexto del Proyecto

## ¿Qué es?

Web de viajes personalizados a medida. Diseñada por Angela. Ofrece itinerarios únicos sin comisiones ocultas. Los clientes reservan directamente siguiendo las guías proporcionadas.

## Stack Tecnológico

- **Frontend**: React + Vite (SPA con pre-rendering)
- **Styling**: Tailwind CSS
- **CMS**: Sanity (destinos, testimonios, FAQs)
- **Hosting**: Vercel
- **Routing**: react-router-dom v7
- **SEO**: react-helmet-async + pre-rendering con Puppeteer
- **Animaciones**: framer-motion

## Estructura Principal

```
src/
├── App.jsx                  # Rutas y layout principal
├── main.jsx                 # Entry point (BrowserRouter + HelmetProvider)
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── sections/            # Hero, About, Destinations, HowItWorks, Services,
│   │                        # Deliverables, Testimonials, ContactForm, FAQ, Discounts
│   ├── SEOHead.jsx          # Meta tags dinámicos con react-helmet-async
│   └── utils/               # LazySection (ya NO se usa), CookieBanner, etc.
├── pages/
│   ├── DestinationPage.jsx  # Página individual de destino (datos de Sanity)
│   ├── NotFound.jsx         # 404
│   └── blog/
│       ├── BlogList.jsx     # Lista de posts
│       └── BlogPost.jsx     # Post individual
├── data/
│   └── blogData.js          # Contenido estático de blog posts
└── lib/
    └── sanity.js             # Cliente Sanity + image URL builder

scripts/
├── generate-sitemap.js      # Genera sitemap.xml con destinos (Sanity) + blog posts
└── prerender.js             # Pre-rendering con Puppeteer (23 rutas)

public/
├── sitemap.xml              # Generado automáticamente en prebuild
└── robots.txt               # Permite todo, apunta al sitemap
```

## Datos en Sanity

- **`destination`**: slug, country, title, subtitle, heroImage, description, sections, highlights, tips
- **`testimonial`**: nombre, texto, rating, destino
- **`faq`**: question, answer, order

## Rutas (23 páginas)

| Ruta                    | Fuente de datos                                           |
| ----------------------- | --------------------------------------------------------- |
| `/`                     | Secciones estáticas + Sanity (destinos, testimonios, FAQ) |
| `/blog`                 | `blogData.js` (estático)                                  |
| `/blog/:slug` (x3)      | `blogData.js` (estático)                                  |
| `/destinos/:slug` (x18) | Sanity CMS                                                |

## Pipeline de Build

```
npm run build
  1. prebuild  → node scripts/generate-sitemap.js  (genera sitemap.xml)
  2. build     → vite build                        (compila la SPA)
  3. postbuild → node scripts/prerender.js         (genera HTML estático para 23 rutas)
```

## SEO — Cómo Funciona

### Pre-rendering (CRÍTICO)

El script `prerender.js` usa Puppeteer para:

1. Arrancar un servidor local con el `dist/` compilado
2. Visitar cada ruta con un navegador headless
3. Esperar a que React cargue los datos de Sanity y actualice los meta tags
4. Guardar el HTML completo renderizado como `dist/[ruta]/index.html`

**Resultado**: Google recibe HTML con contenido real, meta tags únicos y structured data.

### Meta Tags Dinámicos

- `SEOHead.jsx` usa `react-helmet-async` para inyectar title, description, canonical, OG tags
- Cada página (`DestinationPage`, `BlogPost`, `BlogList`) llama a `SEOHead` con datos únicos
- El pre-rendering captura estos tags en el HTML estático

### Sitemap

Generado automáticamente por `generate-sitemap.js`:

- Rutas estáticas: `/`, `/blog`
- Blog posts: 3 slugs hardcodeados de `blogData.js`
- Destinos: fetched dinámicamente de Sanity

## ⚠️ Cosas Importantes

1. **Si añades un nuevo destino en Sanity**: el pre-rendering y sitemap lo detectan automáticamente (no hace falta tocar código)
2. **Si añades un nuevo blog post**: hay que añadir el slug manualmente en `blogData.js` Y en `generate-sitemap.js` (array `blogPosts`) Y en `prerender.js` (array `blogSlugs`)
3. **Si cambias la estructura de rutas**: actualizar `App.jsx`, `generate-sitemap.js`, `prerender.js`, y el `<noscript>` de `index.html`
4. **El pre-rendering necesita `--disable-web-security` en Puppeteer** porque Sanity bloquea CORS desde `localhost`
5. **`LazySection` fue eliminado** de `App.jsx` porque impedía que los crawlers vieran el contenido

## Variables de Entorno (.env)

```
VITE_SANITY_PROJECT_ID=wzn5s2a9
VITE_SANITY_DATASET=production
```

## Contacto

- Web: https://www.saltysoultrips.com
- Email: saltysoultrips@gmail.com
- WhatsApp: +34 611 79 48 42
- Instagram: @saltysoultrips
