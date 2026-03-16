import textListSection from '../components/testListSection'

export default {
  name: 'imprint',
  title: 'Impressum',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Impressum',
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
