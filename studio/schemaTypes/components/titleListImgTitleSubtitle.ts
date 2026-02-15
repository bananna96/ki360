export default {
  name: 'titleListImgLinkTitleSubtitle',
  title: 'Title + List of Items with Image and/or Link, Title, and Subtitle',
  type: 'object',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required()},
    {
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [
        {
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            {name: 'image', title: 'Image', type: 'image'},
            {
              name: 'link',
              title: 'Link',
              type: 'url',
              validation: (Rule: any) => Rule.uri({allowRelative: true}),
            },
            {name: 'itemTitle', title: 'Item Title', type: 'string'},
            {name: 'subtitle', title: 'Subtitle', type: 'string'},
          ],
        },
      ],
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
