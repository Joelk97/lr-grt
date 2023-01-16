import supportedLanguages from './supportedLanguages'

export default {
  name: 'localeText',
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
    type: 'text',
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
