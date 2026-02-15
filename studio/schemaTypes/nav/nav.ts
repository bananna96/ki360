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
      of: [link],
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
