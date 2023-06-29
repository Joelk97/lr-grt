import supportedLanguages from './supportedLanguages'

export default {
  name: 'localeFile',
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
    type: 'array',
    of: [
      {
        type: 'file',
        title: 'Datei',
        fields: [
          {
            name: 'caption',
            type: 'string',
            title: 'Beschriftung',
            validation: (rule) => rule.required(),
          },
        ],
      },
    ],
    fieldset: lang.isDefault ? null : 'translations',
  })),
}
