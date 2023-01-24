import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'politik',
  title: 'Politik Artikel',
  type: 'document',
  fields: [
    defineField({
      name: 'dateTime',
      title: 'Datum und Uhrzeit',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      options: {
        maxLenght: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      to: {type: 'catPolitics'},
    }),
    defineField({
      name: 'abstract',
      title: 'Abstract',
      type: 'localeText',
    }),
    defineField({
      name: 'author',
      title: 'Verfasser',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'BlockContent',
      title: 'Artikelinhalt - 1 Bild pro Block, und am Ende des Block',
      type: 'array',
      of: [{type: 'localeBlockContent', title: 'Artikelinhalt - Block'}],
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
            {name: 'title', type: 'localeString', title: 'Titel Abbildung'},
          ],
        },
      ],
    }),
    defineField({
      name: 'someLinks',
      title: 'Nützliche Links',
      type: 'array',
      of: [
        {
          type: 'urlAndName',
          title: 'Link',
        },
      ],
    }),
  ],
  preview: {
    select: {
      titleDe: 'title.de_CH',
      titleIt: 'title.it_CH',
      titleFr: 'title.fr_CH',
      slugDe: 'slug.de_CH.current',
      slugFr: 'slug.fr_CH.current',
      slugIt: 'slug.it_CH.current',
      subtitle: 'dateTime',
    },
    prepare({subtitle, titleDe, titleFr, titleIt, slugIt, slugDe, slugFr}) {
      return {
        title: titleDe != undefined ? titleDe : titleIt != undefined ? titleIt : titleFr,
        subtitle: subtitle,
      }
    },
  },
})
