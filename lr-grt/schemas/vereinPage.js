import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'vereinPage',
  title: 'Verein Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'localeString',
    }),
    defineField({
      name: 'intro',
      title: 'Einführungstext',
      type: 'localeText',
    }),
    defineField({
      name: 'bkgImageIntro',
      title: 'Hintergrund Bild Intro',
      type: 'image',
      description: 'maximal 1MB, am besten 1280x600 als format',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'unterEinf',
      title: 'Untereinführungen',
      type: 'array',
      of: [
        {
          type: 'subEinfuerung',
          title: 'Untereinführungen',
        },
      ],
    }),
    defineField({
      name: 'underKatVer',
      title: 'Unterkategorien Verein',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'vereinUnterKat',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: `title`,
      subtitle: `intro`,
      media: 'bkgImageIntro',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title.de_CH,
        subtitle: subtitle.de_CH,
        media: media,
      }
    },
  },
})
