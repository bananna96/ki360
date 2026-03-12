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
      url,
      subitems[]{
        text,
        url
      }
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
    intro{
      title,
      description
    },
    slides[]{
      tip{
        title,
        description
      },
      bullets[],
      example,
      image{
        asset->{
          _id,
          url,
          metadata{
            lqip,
            dimensions{
              width,
              height,
              aspectRatio
            }
          }
        },
        alt
      }
    },
    btnLink{
      text,
      url
    }
  }
`

const whatIsAiQuery = `
  *[_type == "whatIsAi"][0]{
    section1{
      title,
      description,
      image{${imageFields}}
    },
    section2{
      text,
      url
    },
    section3{
      title,
      items[]{
        itemTitle,
        subtitle,
        link,
        image{${imageFields}}
      }
    },
    section4{
      title,
      items[]{
        title,
        description,
        image{${imageFields}}
      }
    },
    section5{
      title,
      items[]{
        itemTitle,
        subtitle,
        link,
        image{${imageFields}}
      },
      overlayText[]{
        title,
        items[]{
          itemTitle,
          subtitle,
          link,
          image{${imageFields}}
        }
      }
    }
  }
`

const techMethodsQuery = `
  *[_type == "whatIsAi"][0].section5.overlayText[-1]{
    title,
    items[]{
      itemTitle,
      subtitle,
      link,
      image{
        alt,
        asset->{
          _id,
          url,
          metadata{
            lqip,
            dimensions{
              width,
              height,
              aspectRatio
            }
          }
        }
      }
    }
  }
`

export {
	navQuery,
	landingpageQuery,
	basicsOverviewQuery,
	promptingQuery,
	whatIsAiQuery,
	techMethodsQuery,
}

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
