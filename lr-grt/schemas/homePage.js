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
    defineField({
      name: 'acutality',
      title: 'Aktualität',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'medienMitteilungen'}],
        },
      ],
    }),
    defineField({
      name: 'becomeAsso',
      title: 'Text Mitglied werden',
      type: 'localeText',
    }),
    defineField({
      name: 'contactForm',
      title: 'Text Kontaktformular',
      type: 'localeText',
    }),
    defineField({
      name: 'sloganTitle',
      title: 'Slogan Titel',
      type: 'localeString',
    }),
    defineField({
      name: 'sloganText',
      title: 'Slogan Text',
      type: 'localeText',
    }),
    defineField({
      name: 'sloganButton',
      title: 'Slogan Button',
      type: 'localeString',
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
