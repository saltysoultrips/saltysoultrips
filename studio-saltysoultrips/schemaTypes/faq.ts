import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Preguntas Frecuentes (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta (ES)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta (ES)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question_en',
      title: 'Question (EN)',
      type: 'string',
      description: 'English translation of the question',
    }),
    defineField({
      name: 'answer_en',
      title: 'Answer (EN)',
      type: 'text',
      description: 'English translation of the answer',
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
