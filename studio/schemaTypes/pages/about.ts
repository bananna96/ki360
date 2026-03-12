const textListSection = {
  name: 'textListSection',
  title: 'Text-/Listen-Abschnitt',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'paragraphs',
      title: 'Absätze',
      type: 'array',
      of: [{type: 'text'}],
    },
    {
      name: 'listTitle',
      title: 'Listentitel',
      type: 'string',
    },
    {
      name: 'listItems',
      title: 'Liste',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'listTitle',
    },
  },
}

export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Untertitel',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
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
      name: 'content',
      title: 'About-Inhalt',
      type: 'array',
      of: [textListSection],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}
