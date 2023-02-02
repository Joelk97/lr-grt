import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'introCantSect',
  title: 'Intro Kantonale Sektionen',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'localeString',
    }),
    defineField({
      name: 'abstract',
      title: 'Einführungstext',
      type: 'localeText',
    }),
  ],
  preview: {
    select: {
      title: `title`,
    },
    prepare({title}) {
      return {
        title: title.de_CH,
      }
    },
  },
})
