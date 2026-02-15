import textDescImg from './textDescImg'
export default {
  name: 'titleListSublist',
  title: 'Title + List of Items with Sublist',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required()},
    {
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [textDescImg],
      validation: (Rule: any) =>
        Rule.custom((items: any) => {
          if (!items || items.length === 0) {
            return 'At least one item is required.'
          }
          return true
        }),
    },
  ],
}
