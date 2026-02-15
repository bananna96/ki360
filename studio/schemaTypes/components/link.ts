export default {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Display Text',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule: any) =>
        Rule.uri({
          allowRelative: true,
        }).required(),
    },
  ],
}
