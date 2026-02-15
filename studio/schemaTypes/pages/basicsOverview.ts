import link from '../components/link'
export default {
  name: 'basicsOverview',
  title: 'Basics Overview',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imgList',
      title: 'Image List',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt-Text',
              description: 'Alternativtext für Barrierefreiheit und SEO',
              validation: (Rule: any) => Rule.required(),
            },
            link,
          ],
        },
      ],
      validation: (Rule: any) =>
        Rule.custom((items: any) => {
          if (!items || items.length === 0) {
            return 'At least one list item is required.'
          }
          return true
        }).required(),
    },
  ],
}
