import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Verfasser',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'telephone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title,
        media: media ? media : 'img',
      }
    },
  },
})
