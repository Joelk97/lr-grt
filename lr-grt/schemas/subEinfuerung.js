import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subEinfuerung',
  title: 'Untereinführung',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'localeString',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'localeText',
    }),
  ],
  preview: {
    select: {
      title: 'title.de_CH',
    },
    prepare({title}) {
      return {
        title: title,
      }
    },
  },
})
