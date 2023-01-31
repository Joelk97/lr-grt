import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'vereinUnterKat',
  title: 'Verein Unterkategorien',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
    }),
    defineField({
      name: 'abstract',
      title: 'Introtext',
      type: 'localeText',
    }),
    defineField({
      name: 'bkgImage',
      title: 'Abbildung',
      type: 'image',
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'localeBlockContent',
    }),
    defineField({
      name: 'images',
      title: 'Abbildungen oder Graphiken (als Bilddatei)',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Abbildung',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Beschriftung',
              validation: (rule) => rule.required(),
            },
            {name: 'title', type: 'string', title: 'Titel Abbildung'},
          ],
        },
      ],
    }),
    defineField({
      name: 'files',
      title: 'Dateien (PDF, Excel,...)',
      type: 'array',
      of: [
        {
          type: 'file',
          title: 'Datei',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Beschriftung',
              validation: (rule) => rule.required(),
            },
            {name: 'title', type: 'localeString', title: 'Titel File'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: `title`,
      subtitle: `abstract`,
      media: 'bkgImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title.de_CH,
        media: media,
      }
    },
  },
})
