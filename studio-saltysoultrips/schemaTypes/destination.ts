import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Destination guide pages: /destinos/{slug} (ES) and /destinations/{slug_en} (EN).
 * Compatible with the destination documents imported in early 2026
 * (title, intro, about, bestTime, highlights, heroImage…).
 * A page only goes live when "Publicar en la web" is on and the required
 * fields are filled; the English page only when the English fields exist.
 */
const groups = [
  {name: 'main', title: 'Principal', default: true},
  {name: 'content', title: 'Contenido'},
  {name: 'practical', title: 'Época y presupuesto'},
  {name: 'routes', title: 'Rutas y FAQ'},
  {name: 'english', title: 'English'},
  {name: 'seo', title: 'SEO'},
]

const maxLen = (max: number) => (Rule: any) =>
  Rule.max(max).warning(`Mejor ${max} caracteres o menos para que Google no lo corte.`)

export const destination = defineType({
  name: 'destination',
  title: 'Destinos',
  type: 'document',
  groups,
  fields: [
    defineField({
      name: 'showOnWeb',
      title: 'Publicar en la web',
      type: 'boolean',
      group: 'main',
      initialValue: false,
      description:
        'Actívalo solo cuando el destino tenga el contenido completo. Mientras esté apagado la página no existe en la web ni en el sitemap.',
    }),
    defineField({
      name: 'name',
      title: 'Nombre del destino (ES)',
      type: 'string',
      group: 'main',
      description: 'Tal como lo busca la gente: «Japón», «Nueva York», «Maldivas». Se usa en el H1: «Viajes a Japón».',
      validation: (Rule) =>
        Rule.custom((value, ctx: any) =>
          ctx.document?.showOnWeb && !value ? 'Obligatorio para publicar en la web' : true,
        ),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL en español)',
      type: 'slug',
      group: 'main',
      description: 'URL: /destinos/{slug}. Recomendado: viajes-a-japon. No lo cambies en destinos ya publicados.',
      options: {source: (doc: any) => `viajes-a-${doc.name || doc.title || ''}`, maxLength: 80},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Lema / subtítulo (ES)',
      type: 'string',
      group: 'main',
      description: 'Frase corta bajo el nombre. Ej.: «La isla de los dioses».',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen principal',
      type: 'image',
      group: 'main',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Texto alternativo', type: 'string'})],
    }),
    defineField({
      name: 'matchTerms',
      title: 'Palabras para enlazar paquetes y artículos',
      type: 'array',
      group: 'main',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      description:
        'Países, ciudades o zonas que identifican este destino en los paquetes y en los títulos del blog. Ej.: Japón, Tokio, Kioto, Japan.',
    }),
    defineField({
      name: 'continent',
      title: 'Continente',
      type: 'string',
      group: 'main',
      description: 'Para el filtro de /destinos. Usa el mismo que en los paquetes de este destino.',
      options: {
        list: [
          {title: 'Europa', value: 'europa'},
          {title: 'América', value: 'america'},
          {title: 'Asia', value: 'asia'},
          {title: 'África', value: 'africa'},
          {title: 'Oceanía', value: 'oceania'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) =>
        Rule.custom((value, ctx: any) =>
          ctx.document?.showOnWeb && !value ? 'Obligatorio para publicar en la web' : true,
        ),
    }),
    defineField({
      name: 'region',
      title: 'País / región',
      type: 'string',
      group: 'main',
      description: 'Ej.: «Asia», «Estados Unidos».',
    }),

    // --- Content (ES) ---
    defineField({
      name: 'intro',
      title: 'Introducción (ES)',
      type: 'text',
      rows: 3,
      group: 'content',
      description: '2-3 frases con tu opinión personal sobre el destino. Es lo primero que se lee.',
      validation: (Rule) =>
        Rule.custom((value, ctx: any) =>
          ctx.document?.showOnWeb && !value ? 'Obligatoria para publicar en la web' : true,
        ),
    }),
    defineField({
      name: 'about',
      title: 'Sobre el destino (ES)',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'text', rows: 4})],
      description: 'Un párrafo por bloque. Qué lo hace especial, zonas, qué no perderse, tu experiencia.',
    }),
    defineField({
      name: 'highlights',
      title: 'Imprescindibles',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Emoji', type: 'string'}),
            defineField({name: 'title', title: 'Título (ES)', type: 'string'}),
            defineField({name: 'desc', title: 'Descripción (ES)', type: 'string'}),
            defineField({name: 'title_en', title: 'Title (EN)', type: 'string'}),
            defineField({name: 'desc_en', title: 'Description (EN)', type: 'string'}),
          ],
          preview: {select: {title: 'title', subtitle: 'desc'}},
        }),
      ],
    }),
    defineField({
      name: 'tips',
      title: 'Consejos de Ángela (ES)',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'text', rows: 2})],
    }),

    // --- Practical ---
    defineField({
      name: 'bestTime',
      title: 'Mejor época',
      type: 'object',
      group: 'practical',
      fields: [
        defineField({name: 'months', title: 'Meses (ES)', type: 'string', description: 'Ej.: «Marzo-mayo y octubre-noviembre»'}),
        defineField({name: 'reason', title: 'Por qué (ES)', type: 'text', rows: 3}),
        defineField({name: 'months_en', title: 'Months (EN)', type: 'string'}),
        defineField({name: 'reason_en', title: 'Why (EN)', type: 'text', rows: 3}),
      ],
    }),
    defineField({
      name: 'idealDays',
      title: 'Días recomendados (ES)',
      type: 'string',
      group: 'practical',
      description: 'Ej.: «12-15 días para una primera vez»',
    }),
    defineField({name: 'idealDays_en', title: 'Recommended days (EN)', type: 'string', group: 'practical'}),
    defineField({
      name: 'budget',
      title: 'Presupuesto orientativo (ES)',
      type: 'text',
      rows: 4,
      group: 'practical',
      description: 'Qué cuesta un viaje típico: vuelos, alojamiento, gasto diario. Con cifras reales que conozcas.',
    }),
    defineField({name: 'budget_en', title: 'Budget (EN)', type: 'text', rows: 4, group: 'practical'}),

    // --- Routes & FAQ ---
    defineField({
      name: 'routes',
      title: 'Rutas de ejemplo',
      type: 'array',
      group: 'routes',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Título (ES)', type: 'string', description: 'Ej.: «Japón esencial en 12 días»'}),
            defineField({name: 'description', title: 'Itinerario (ES)', type: 'text', rows: 6, description: 'Una línea por etapa. Ej.: «Días 1-4: Tokio…»'}),
            defineField({name: 'title_en', title: 'Title (EN)', type: 'string'}),
            defineField({name: 'description_en', title: 'Itinerary (EN)', type: 'text', rows: 6}),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Preguntas frecuentes',
      type: 'array',
      group: 'routes',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Pregunta (ES)', type: 'string'}),
            defineField({name: 'answer', title: 'Respuesta (ES)', type: 'text', rows: 3}),
            defineField({name: 'question_en', title: 'Question (EN)', type: 'string'}),
            defineField({name: 'answer_en', title: 'Answer (EN)', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),

    // --- English ---
    defineField({name: 'name_en', title: 'Destination name (EN)', type: 'string', group: 'english'}),
    defineField({
      name: 'slug_en',
      title: 'Slug (EN URL)',
      type: 'slug',
      group: 'english',
      description: 'URL: /destinations/{slug}. Recommended: travel-to-japan. The English page is only published when name, intro and about (EN) are filled.',
      options: {source: (doc: any) => `travel-to-${doc.name_en || ''}`, maxLength: 80},
    }),
    defineField({name: 'title_en', title: 'Tagline (EN)', type: 'string', group: 'english'}),
    defineField({name: 'intro_en', title: 'Introduction (EN)', type: 'text', rows: 3, group: 'english'}),
    defineField({
      name: 'about_en',
      title: 'About (EN)',
      type: 'array',
      group: 'english',
      of: [defineArrayMember({type: 'text', rows: 4})],
    }),
    defineField({
      name: 'tips_en',
      title: 'Tips (EN)',
      type: 'array',
      group: 'english',
      of: [defineArrayMember({type: 'text', rows: 2})],
    }),

    // --- SEO ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (ES)',
      type: 'string',
      group: 'seo',
      description: 'Si lo dejas vacío: «Viajes a {nombre} a medida | SaltySoulTrips».',
      validation: maxLen(65),
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description (ES)',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: maxLen(158),
    }),
    defineField({name: 'seoTitle_en', title: 'SEO Title (EN)', type: 'string', group: 'seo', validation: maxLen(65)}),
    defineField({
      name: 'metaDescription_en',
      title: 'SEO Description (EN)',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: maxLen(158),
    }),

    // --- Legacy fields from the 2026 import (kept so old content stays visible) ---
    defineField({name: 'heroSubtitle', title: '(Antiguo) Subtítulo hero', type: 'string', group: 'main', hidden: ({value}) => !value}),
    defineField({name: 'heroTagline', title: '(Antiguo) Tagline hero', type: 'string', group: 'main', hidden: ({value}) => !value}),
    defineField({name: 'country', title: '(Antiguo) País', type: 'string', group: 'main', hidden: ({value}) => !value}),
    defineField({name: 'description_larga', title: '(Antiguo) Descripción corta', type: 'string', group: 'main', hidden: ({value}) => !value}),
    defineField({name: 'color', title: '(Antiguo) Color', type: 'string', group: 'main', hidden: true}),
    defineField({name: 'heroSubtitle_en', type: 'string', hidden: true}),
    defineField({name: 'heroTagline_en', type: 'string', hidden: true}),
    defineField({name: 'description_larga_en', type: 'string', hidden: true}),
  ],
  preview: {
    select: {name: 'name', legacy: 'heroSubtitle', title: 'title', live: 'showOnWeb', media: 'heroImage'},
    prepare: ({name, legacy, title, live, media}) => ({
      title: `${live ? '🟢' : '⚪️'} ${name || legacy || title || 'Sin nombre'}`,
      subtitle: title,
      media,
    }),
  },
})
