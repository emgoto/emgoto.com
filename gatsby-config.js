const config = {
  siteMetadata: {
    title: `Emma Goto`,
    description: `Front-end development and side projects.`,
    author: `Emma Goto`,
    siteUrl: `https://www.emgoto.com`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://www.emgoto.com`,
      },
    },
    { resolve: `gatsby-plugin-feed`,
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
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { category: { ne: null } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      slug
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Emma Goto's RSS feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'posts',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-code-titles',
            options: {
              className: 'gatsby-remark-code-title',
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              isIconAfterHeader: true,
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: true,
              wrapperStyle: 'margin: 16px 0;',
              quality: 70
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          }
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Emma Goto`,
        short_name: `emgoto`,
        start_url: `/`,
        background_color: `#202933`,
        theme_color: `#202933`,
        display: `minimal-ui`,
        icon: 'src/images/favicon.png'
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout/index.js`),
      },
    }
  ],
};

if (process.env.CONTEXT === "production") {
  const googleAnalytics = {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-138746648-1",
    },
  };
  config.plugins.push(googleAnalytics);
}

module.exports = config;