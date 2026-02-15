export default {
  name: 'titleList',
  title: 'Title + List of Items',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule: any) =>
        Rule.custom((items: any) => {
          if (!items || items.length === 0) {
            return 'At least one list item is required.'
          }
          return true
        }),
    },
  ],
}
