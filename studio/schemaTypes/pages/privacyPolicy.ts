const textListSection = {
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

export default {
  name: 'privacyPolicy',
  title: 'Datenschutzerklärung',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Datenschutzerklärung',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      of: [textListSection],
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
