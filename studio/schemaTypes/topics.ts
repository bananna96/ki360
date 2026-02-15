export default {
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required()},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule: any) => Rule.required(),
    },
    {name: 'intro', title: 'Intro', type: 'text'},
  ],
}
