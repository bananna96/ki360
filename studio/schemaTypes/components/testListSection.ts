export default {
  name: 'textListSection',
  title: 'Text-/Listen-Abschnitt',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'paragraphs',
      title: 'Absätze',
      type: 'array',
      of: [{type: 'text'}],
    },
    {
      name: 'listTitle',
      title: 'Listentitel',
      type: 'string',
    },
    {
      name: 'listItems',
      title: 'Liste',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}
