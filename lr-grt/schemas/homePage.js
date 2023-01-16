import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'localeString',
    }),
    defineField({
      name: 'slogan1',
      title: 'Slogan 1',
      type: 'localeString',
    }),
    defineField({
      name: 'slogan2',
      title: 'Slogan 2',
      type: 'localeString',
    }),
    defineField({
      name: 'button',
      title: 'Button',
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
      subtitle: `slogan1`,
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
