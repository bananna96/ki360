import link from '../components/link'
import textDesc from '../components/textDesc'

export default {
  name: 'prompting',
  title: 'Prompting',
  type: 'document',
  fields: [
    {...textDesc, name: 'intro', title: 'Intro', validation: (Rule: any) => Rule.required()},
    {
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {...textDesc, name: 'tip', title: 'Promption Tip'},
            {
              name: 'bullets',
              title: 'Bullet Points',
              type: 'array',
              of: [{type: 'string'}],
            },
            {
              name: 'example',
              title: 'Example',
              type: 'text',
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
        },
      ],
      validation: (Rule: any) =>
        Rule.custom((slides: any) => {
          if (!slides || slides.length === 0) {
            return 'At least one slide is required.'
          }
          return true
        }).required(),
    },
    {
      ...link,
      name: 'btnLink',
      title: 'Button Link',
    },
  ],
}
