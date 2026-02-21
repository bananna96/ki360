export default {
  name: 'textDescImg',
  title: 'Text Description Image',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Slide Image',
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
      ],
    },
  ],
}
