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
      name: 'title2',
      title: 'Titel 2',
      type: 'localeString',
    }),
    defineField({
      name: 'intro2',
      title: 'Einführungstext 2',
      type: 'localeString',
    }),
    defineField({
      name: 'cardWhatWeDoTitle',
      title: 'Titel Leitbild',
      type: 'localeString',
    }),
    defineField({
      name: 'cardWhatWeDoSlug',
      title: 'Leitbild Slug',
      type: 'localeSlug',
    }),
    defineField({
      name: 'cardWhatWeDoText',
      title: 'Leitbild Text',
      type: 'localeText',
    }),
    defineField({
      name: 'statutesDate',
      title: 'Datum Aktualisierung der Statuten',
      type: 'datetime',
    }),
    defineField({
      name: 'statutesTitle',
      title: 'Titel Statuten',
      type: 'localeString',
    }),
    defineField({
      name: 'statutesSlug',
      title: 'Statuten Slug',
      type: 'localeSlug',
    }),
    defineField({
      name: 'statutesIntro',
      title: 'Intro Statuten',
      type: 'localeText',
    }),
    defineField({
      name: 'statutesContent',
      title: 'Statuten',
      type: 'localeBlockContent',
    }),
    defineField({
      name: 'statutesFile',
      title: 'PDF Statuten',
      type: 'file',
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
