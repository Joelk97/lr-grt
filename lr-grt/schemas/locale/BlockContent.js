import supportedLanguages from './supportedLanguages'

export default {
  name: 'localeBlockContent',
  type: 'object',
  fieldsets: [
    {
      title: 'Übersetzungen',
      name: 'translations',
      options: {collapsible: true},
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'blockContent',
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
