import type { GatsbyConfig } from "gatsby"

const plugins: GatsbyConfig['plugins'] = [
  `gatsby-plugin-typescript`,
  `gatsby-plugin-typegen`,
  `gatsby-plugin-sass`,
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/blog`,
      name: `blog`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 630,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        `gatsby-remark-code-titles`,
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            offsetY: `30`,
            icon: false,
            className: `custom-class`,
            maintainCase: false,
          },
        },
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            showLineNumbers: true,
          },
        },
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`,
        {
        resolve: `gatsby-remark-emojis`,
        options: {
          active: true,
          class  : 'emoji-icon',
            size   : 64,
            styles : {
              display      : 'inline',
              margin       : '0',
              'margin-top' : '0',
              position     : 'relative',
              top          : '0.125rem',
              width        : '1.4rem',
              border       : 'none'
            }
        }

        }
      ],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: `UA-177277170-2`,
    },
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.nodes.map(node => {
              return Object.assign({}, node.frontmatter, {
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ "content:encoded": node.html }],
              })
            })
          },
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          `,
          output: "/rss.xml",
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `鳥に生まれることができなかった人へ`,
      short_name: `鳥に生まれることができなかった人へ`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    },
  },
  `gatsby-plugin-offline`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-gatsby-cloud`,
]

const siteMetadata: GatsbyConfig['siteMetadata'] = {
  title: `鳥に生まれることができなかった人へ`,
  description: `ITと趣味`,
  lang: `ja`,
  siteUrl: `https://blog.toriwatari.work/page/1/`,
  locale: `ja_JP`,
  author: {
    name: `Kento Yoshizu`,
  },
  //description: `A starter blog demonstrating what Gatsby can do.`,
  social: {
    //twitter: `kylemathews`,
  },
}

const config: GatsbyConfig = {
  siteMetadata,
  plugins,
}

export default config