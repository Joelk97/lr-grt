import supportedLanguages from './supportedLanguages'

export default {
  name: 'localeSlug',
  type: 'object',
  fieldsets: [
    {
      title: 'Übersetzungen',
      name: 'translations',
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'slug',
    fieldset: lang.isDefault ? null : 'translations',
    options: {
      source: `title.${lang.id}`,
      maxLength: 200,
    },
  })),
}
