import { defineField, defineType } from 'sanity'

export const destination = defineType({
  name: 'destination',
  title: 'Destinations',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
      title: 'Hero Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Description',
      type: 'text',
    }),
    defineField({
      name: 'description_larga',
      title: 'Card Description',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      type: 'text',
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
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'desc', title: 'Description', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'bestTime',
      title: 'Best Time to Visit',
      type: 'object',
      fields: [
        { name: 'months', title: 'Months', type: 'string' },
        { name: 'reason', title: 'Reason', type: 'string' },
      ],
    }),
    defineField({
      name: 'about',
      title: 'About (Paragraphs)',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'color',
      title: 'Theme Color (Tailwind class)',
      type: 'string',
      description: 'e.g. from-indigo-800/80',
    }),
  ],
})
