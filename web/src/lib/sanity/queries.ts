const imageFields = `
  asset->{
    _id,
    url,
    metadata {
      lqip, // The base64 placeholder string
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  alt,
  hotspot,
  crop
`

const navQuery = `
  *[_type == "navigation"][0]{
    navlogo{${imageFields}},
    navlogolink,
    items[]{
      text,
      url
    }
  }
`

const landingpageQuery = `
  *[_type == "landingpage"][0]{
    title,
    intro,
    subtitle,
    content,
    links[]{
      text,
      url
    }
  }
`
const basicsOverviewQuery = `
  *[_type == "basicsOverview"][0]{
    title,
    imgList[]{
      ${imageFields},
      link{
        text,
        url
      }
    }
  }
`

const promptingQuery = `
  *[_type == "prompting"][0]{
    intro,
    slides[]{
      tip,
      bullets[],
      example,
      image{${imageFields}}
    },
    btnLink{
      text,
      url
    }
  }
`

export { navQuery, landingpageQuery, basicsOverviewQuery, promptingQuery }

/* TODO
Ein großer Sanity Fetch pro Seite

e.g.
const data = await sanityClient.fetch(`
{
  "page": *[_type == "topic" && slug.current == $slug][0]{
    title,
    content,
    relatedTopics[]->{
      title,
      slug
    }
  },
  "settings": *[_type == "siteSettings"][0]{
    navigation
  }
}
`, { slug });
 */
