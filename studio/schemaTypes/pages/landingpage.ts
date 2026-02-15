import link from '../components/link'

export default {
  name: 'landingpage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required()},
    {name: 'intro', title: 'Intro', type: 'text'},
    {name: 'subtitle', title: 'Subtitle', type: 'text'},
    {name: 'content', title: 'Content', type: 'text'},
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [link],
    },
  ],
}
