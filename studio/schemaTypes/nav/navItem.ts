import link from '../components/link'

export default {
  name: 'navItem',
  type: 'object',
  title: 'Navigation Item',
  fields: [
    {
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [link],
      validation: (Rule: any) =>
        Rule.custom((items: any) => {
          if (!items || items.length === 0) {
            return 'At least one navigation item is required.'
          }
          return true
        }),
    },
  ],
}
