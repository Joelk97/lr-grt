export default {
  name: 'urlAndName',
  title: 'Link mit Name',
  type: 'object',
  fields: [
    {name: 'name', title: 'Name', type: 'localeString'},
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
  ],
}
