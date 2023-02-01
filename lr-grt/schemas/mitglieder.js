import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mitglieder',
  title: 'Mitglieder',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
    }),
    defineField({
      name: 'role',
      title: 'Rolle',
      type: 'localeString',
    }),
    defineField({
      name: 'zone',
      title: 'Zone / Kanton',
      type: 'string',
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
  ],
})
