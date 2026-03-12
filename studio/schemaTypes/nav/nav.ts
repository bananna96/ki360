import link from '../components/link'

export default {
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  fields: [
    {
      name: 'navlogo',
      title: 'Navigation Logo',
      type: 'image',
      validation: (Rule: any) => Rule.required(),
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt-Text',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'footerlogo',
      title: 'Footer Logo',
      type: 'image',
      options: {hotspot: true},
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
    {
      name: 'navlogolink',
      title: 'Navigation Logo Link',
      type: 'url',
      validation: (Rule: any) =>
        Rule.uri({
          allowRelative: true,
        }).required(),
    },
    {
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              type: 'string',
              title: 'URL',
            },
            {
              name: 'subitems',
              title: 'Unterseiten',
              type: 'array',
              of: [link],
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
