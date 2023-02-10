import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'infoPage',
  title: 'Info Page',
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
      name: 'title2',
      title: 'Titel 2',
      type: 'localeString',
    }),
    defineField({
      name: 'intro2',
      title: 'Einführungstext 2',
      type: 'localeText',
    }),
    defineField({
      name: 'imageSitWolf',
      title: 'Hintergrund Bild Situation Wolf',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imagePolitik',
      title: 'Hintergrund Bild Politik',
      type: 'image',
      validation: (rule) => rule.required(),
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
