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
      type: 'localeText',
    }),
    defineField({
      name: 'slogan2',
      title: 'Slogan 2',
      type: 'localeText',
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
      name: 'acutalityDe',
      title: 'Aktualität DE',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'artikelMedia'}],
          options: {
            filter: 'defined(slug.de_CH.current)',
          },
        },
      ],
      validation: (Rule) => Rule.max(2).required(),
    }),
    defineField({
      name: 'acutalityFr',
      title: 'Aktualität FR',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'artikelMedia'}],
          options: {
            filter: 'defined(slug.fr_CH.current)',
          },
        },
      ],
      validation: (Rule) => Rule.max(2).required(),
    }),

    defineField({
      name: 'acutalityIt',
      title: 'Aktualität IT',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'artikelMedia'}],
          options: {
            filter: 'defined(slug.it_CH.current)',
          },
        },
      ],
      validation: (Rule) => Rule.max(2).required(),
    }),
    defineField({
      name: 'becomeAssoTit',
      title: 'Titel Mitglied werden',
      type: 'localeString',
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
    defineField({
      name: 'infoDe',
      title: 'Informationen DE',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'politik'}, {type: 'situationWolf'}],
          options: {
            filter: 'defined(slug.de_CH.current)',
          },
        },
      ],
      validation: (Rule) => Rule.max(2).required(),
    }),
    defineField({
      name: 'infoFr',
      title: 'Informationen FR',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'politik'}, {type: 'situationWolf'}],
          options: {
            filter: 'defined(slug.fr_CH.current)',
          },
        },
      ],
      validation: (Rule) => Rule.max(2).required(),
    }),
    defineField({
      name: 'infoIt',
      title: 'Informationen IT',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'politik'}, {type: 'situationWolf'}],
          options: {
            filter: 'defined(slug.it_CH.current)',
          },
        },
      ],
      validation: (Rule) => Rule.max(2).required(),
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
