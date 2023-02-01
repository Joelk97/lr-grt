import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'cantonalSections',
  title: 'Kantonale Sektionen',
  type: 'document',
  fields: [
    defineField({
      name: 'zone',
      title: 'Zone / Kanton',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'image',
      title: 'Abbildung/Wappen',
      type: 'image',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['mailto'],
        }),
    }),
    defineField({
      name: 'website',
      title: 'Webseite',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'mitglieder',
      title: 'Mitglieder/ Verantwortlicher',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'mitglieder'}],
        },
      ],
    }),
  ],
})
