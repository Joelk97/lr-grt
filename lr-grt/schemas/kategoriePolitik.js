import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'catPolitics',
  title: 'Kategorie Politik',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      title: 'slug',
      type: 'localeSlug',
      options: {
        source: `category.de_CH`,
      },
    }),
  ],
  preview: {
    select: {
      title: 'category.de_CH',
    },
    prepare({title}) {
      return {
        title: title,
      }
    },
  },
})
