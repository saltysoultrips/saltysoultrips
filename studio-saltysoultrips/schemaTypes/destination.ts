import { defineField, defineType } from 'sanity'

export const destination = defineType({
  name: 'destination',
  title: 'Destinations',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (ES)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
      description: 'English title for the destination card',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (ES)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug_en',
      title: 'Slug (EN) - For SEO',
      type: 'slug',
      description: 'English URL slug (e.g. japan instead of japon)',
      options: {
        source: 'title_en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Europa', value: 'Europa' },
          { title: 'Asia & Oriente', value: 'Asia & Oriente' },
          { title: 'Estados Unidos', value: 'Estados Unidos' },
          { title: 'Islas y Paraísos', value: 'Islas y Paraísos' },
          { title: 'Otros', value: 'Otros' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle (ES)',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle_en',
      title: 'Hero Subtitle (EN)',
      type: 'string',
      description: 'English version of the hero subtitle',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline (ES)',
      type: 'string',
    }),
    defineField({
      name: 'heroTagline_en',
      title: 'Hero Tagline (EN)',
      type: 'string',
      description: 'English version of the hero tagline',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Description (ES)',
      type: 'text',
    }),
    defineField({
      name: 'intro_en',
      title: 'Intro Description (EN)',
      type: 'text',
      description: 'English version of the intro description',
    }),
    defineField({
      name: 'description_larga',
      title: 'Card Description (ES)',
      type: 'string',
    }),
    defineField({
      name: 'description_larga_en',
      title: 'Card Description (EN)',
      type: 'string',
      description: 'English version of the card description',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description (ES)',
      type: 'text',
    }),
    defineField({
      name: 'metaDescription_en',
      title: 'SEO Description (EN)',
      type: 'text',
      description: 'English SEO description',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon (Emoji)', type: 'string' },
            { name: 'title', title: 'Title (ES)', type: 'string' },
            { name: 'title_en', title: 'Title (EN)', type: 'string' },
            { name: 'desc', title: 'Description (ES)', type: 'string' },
            { name: 'desc_en', title: 'Description (EN)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'bestTime',
      title: 'Best Time to Visit',
      type: 'object',
      fields: [
        { name: 'months', title: 'Months (ES)', type: 'string' },
        { name: 'months_en', title: 'Months (EN)', type: 'string' },
        { name: 'reason', title: 'Reason (ES)', type: 'string' },
        { name: 'reason_en', title: 'Reason (EN)', type: 'string' },
      ],
    }),
    defineField({
      name: 'about',
      title: 'About (ES) — Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'about_en',
      title: 'About (EN) — Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'English version of the about paragraphs',
    }),
    defineField({
      name: 'color',
      title: 'Theme Color (Tailwind class)',
      type: 'string',
      description: 'e.g. from-indigo-800/80',
    }),
  ],
})
