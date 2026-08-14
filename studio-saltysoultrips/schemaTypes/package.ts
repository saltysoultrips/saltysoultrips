import { defineField, defineType } from 'sanity'

export const packageSchema = defineType({
  name: 'package',
  title: 'Packages',
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
      name: 'continent',
      title: 'Continent',
      type: 'string',
      options: {
        list: [
          { title: 'Europa', value: 'europa' },
          { title: 'América', value: 'america' },
          { title: 'Asia', value: 'asia' },
          { title: 'África', value: 'africa' },
          { title: 'Oceanía', value: 'oceania' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Verano', value: 'verano' },
          { title: 'Invierno', value: 'invierno' },
          { title: 'Aventura', value: 'aventura' },
          { title: 'Relax', value: 'relax' },
          { title: 'Luna de Miel', value: 'luna-de-miel' },
          { title: 'Cultural', value: 'cultural' },
          { title: 'Familia', value: 'familia' },
          { title: 'Parques Temáticos', value: 'parques' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (ES)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription_en',
      title: 'Short Description (EN)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description (ES)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription_en',
      title: 'Long Description (EN)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceInfo',
      title: 'Price Info (ES)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceInfo_en',
      title: 'Price Info (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'flyerImage',
      title: 'Flyer Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
