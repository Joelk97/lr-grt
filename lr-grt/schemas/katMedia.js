import {defineField, defineType, prefixPath} from 'sanity'

export default defineType({
  name: 'katMedia',
  title: 'Kategorie Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kategorie',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: `title`,
      },
    }),
  ],
  preview: {
    select: {
      title: `title`,
    },
    prepare({title}) {
      return {
        title: title,
      }
    },
  },
})
