import textListSection from '../components/testListSection'

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
