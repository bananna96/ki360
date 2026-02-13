const chaptersQuery = `*[_type == "chapter"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  intro
}`

export { chaptersQuery }

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
