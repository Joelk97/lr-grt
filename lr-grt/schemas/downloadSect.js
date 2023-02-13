import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'downloadSect',
  title: 'Download Bereich',
  type: 'document',
  fields: [
    defineField({
      name: 'files',
      title: 'Files',
      type: 'array',
      of: [
        {
          type: 'file',
          title: 'Datei',
          fields: [
            {
              name: 'title',
              type: 'localeString',
              title: 'Titel',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'files',
    },
    prepare({title}) {
      return {
        title: 'Downloads',
      }
    },
  },
})
