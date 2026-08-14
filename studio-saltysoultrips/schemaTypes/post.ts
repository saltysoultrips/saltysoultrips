import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO & Metadata',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título (ES)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
      description: 'English title of the blog post',
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
      description: 'English URL slug',
      options: {
        source: 'title_en',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'date',
      title: 'Fecha de publicación',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (SEO)',
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Resumen (ES)',
      type: 'text',
      description: 'Short summary shown in listing pages (Spanish)',
      rows: 3,
    }),
    defineField({
      name: 'excerpt_en',
      title: 'Excerpt / Summary (EN)',
      type: 'text',
      description: 'Short summary shown in listing pages (English)',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Contenido (ES)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            }
          ],
        },
      ],
    }),
    defineField({
      name: 'content_en',
      title: 'Content (EN)',
      description: 'English version of the blog post content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (ES)',
      type: 'string',
      fieldset: 'seo',
      description: 'Ideal length: 50-60 characters',
    }),
    defineField({
      name: 'seoTitle_en',
      title: 'SEO Title (EN)',
      type: 'string',
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (ES)',
      type: 'text',
      fieldset: 'seo',
      description: 'Ideal length: 150-160 characters',
    }),
    defineField({
      name: 'seoDescription_en',
      title: 'SEO Description (EN)',
      type: 'text',
      fieldset: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
})
