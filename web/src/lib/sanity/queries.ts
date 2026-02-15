const chaptersQuery = `*[_type == "chapter"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  intro
}`

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
export { chaptersQuery, navQuery }

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
