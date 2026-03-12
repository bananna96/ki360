import textDescImg from '../components/textDescImg'
import titleListImgTitleSubtitle from '../components/titleListImgTitleSubtitle'
import link from '../components/link'
import titleListSublist from '../components/titleListSublist'
import titleList from '../components/titleList'

export default {
  name: 'whatIsAi',
  title: 'What is AI?',
  type: 'document',
  fields: [
    {
      ...textDescImg,
      name: 'section1',
      title: 'Section 1',
    },
    {
      ...link,
      name: 'section2',
      title: 'Section 2 - Video Link',
    },
    {
      ...titleListImgTitleSubtitle,
      name: 'section3',
      title: 'Section 3',
    },
    {
      ...titleListSublist,
      name: 'section4',
      title: 'Section 4',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titel',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'backgroundImage',
          title: 'Hintergrundbild',
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
          name: 'blocks',
          title: 'Blöcke',
          type: 'array',
          validation: (Rule: any) => Rule.max(2),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Titel',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Beschreibung',
                  type: 'text',
                },
                {
                  name: 'items',
                  title: 'Liste',
                  type: 'array',
                  of: [{type: 'string'}],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      ...titleListImgTitleSubtitle,
      name: 'section5',
      title: 'Section 5',
      fields: [
        ...(titleListImgTitleSubtitle.fields || []),
        {
          name: 'overlayText',
          title: 'Overlay Text',
          type: 'array',
          of: [titleListImgTitleSubtitle],
        },
      ],
    },
  ],
}
