import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Preguntas Frecuentes (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Número para ordenar las preguntas (menor = aparece primero)',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'order',
    },
    prepare({title, subtitle}) {
      return {
        title: title,
        subtitle: subtitle ? `Orden: ${subtitle}` : 'Sin orden',
      }
    },
  },
})
