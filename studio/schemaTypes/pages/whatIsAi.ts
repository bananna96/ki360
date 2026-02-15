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
          of: [titleList],
        },
      ],
    },
  ],
}
