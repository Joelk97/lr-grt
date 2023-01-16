import supportedLanguages from './supportedLanguages'

export default {
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Übersetzung',
      name: 'translations',
      options: {collapsible: true},
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'string',
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
