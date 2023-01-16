import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mediaPage',
  title: 'Media Page',
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
      type: 'localeString',
    }),
    defineField({
      name: 'bkgImageIntro',
      title: 'Hintergrund Bild Intro',
      type: 'image',
      description: 'maximal 1MB, am besten 1280x600 als format',
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
