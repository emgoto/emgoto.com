const config = {
    siteMetadata: {
        title: `Emma Goto`,
        description:
            "I'm Emma, a front-end developer. Welcome to my corner of the internet!",
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
                        serialize: ({ query: { site, allMdx } }) => {
                            return allMdx.nodes.map((node) => {
                                return Object.assign(
                                    {},
                                    node.frontmatter,
                                    {
                                        description: node.excerpt,
                                        date: node.frontmatter.date,
                                        url:
                                            site.siteMetadata
                                                .siteUrl +
                                            '/' +
                                            node.slug,
                                        guid:
                                            site.siteMetadata
                                                .siteUrl +
                                            '/' +
                                            node.slug,
                                        custom_elements: [
                                            {
                                                'content:encoded':
                                                    node.html,
                                            },
                                        ],
                                    },
                                );
                            });
                        },
                        query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { fields: { collection: { in: ["books", "posts"] } } }
                ) {
                  nodes {
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
            `,
                        output: '/rss.xml',
                        title: 'Emma Goto',
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
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/books`,
                name: 'books',
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
                            elements: ['h2', 'h3'],
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 800,
                            linkImagesToOriginal: false,
                            showCaptions: false,
                            wrapperStyle: 'margin: 16px 0;',
                            quality: 70,
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
                        resolve: 'gatsby-remark-external-links',
                        options: {
                            target: '_blank',
                            rel: 'noopener noreferrer',
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-remark-images`,
        'gatsby-transformer-sharp',
        'gatsby-plugin-styled-components',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-testing',
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Emma Goto`,
                short_name: `emgoto`,
                start_url: `/`,
                background_color: `#202933`,
                theme_color: `#202933`,
                display: `minimal-ui`,
                icon: 'src/images/favicon.png',
            },
        },
        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(
                    `./src/components/layout/index.js`,
                ),
            },
        },
        {
            resolve: 'gatsby-plugin-react-social-cards',
            options: {
                query: `
                {
                    allMdx(
                        limit: 2000
                        sort: { fields: [frontmatter___date], order: DESC }
                        filter: { fields: { collection: { eq: "posts" } } }
                    ) {
                        nodes {
                            frontmatter {
                                title
                                tags
                                emoji
                                date(formatString: "DD MMMM YYYY")
                                coverImage
                            }
                            slug
                        }
                    }
                }`,
                queryToPages: (result) =>
                    result.data.allMdx.nodes.map((node) => {
                        const slugWithoutSlashes = node.slug.replace(
                            /\//g,
                            '',
                        );
                        return {
                            slug: `/${slugWithoutSlashes}`,
                            pageContext: {
                                title: node.frontmatter.title,
                                coverImage:
                                    node.frontmatter.coverImage,
                                emoji: node.frontmatter.emoji,
                                slug: node.slug,
                                noLayout: true,
                            },
                        };
                    }),
                component: require.resolve(
                    './src/templates/social-card.js',
                ),
                dimensions: [
                    {
                        width: 800,
                        height: 418,
                        suffix: '-twitter',
                    },
                    {
                        width: 1000,
                        height: 420,
                        suffix: '-dev',
                    },
                ],
                // cardLimit: 0,
            },
        },
        {
            resolve: 'gatsby-plugin-local-search',
            options: {
                name: 'pages',
                engine: 'flexsearch',
                query: `
                {
                    allMdx(
                        limit: 2000
                        sort: { fields: [frontmatter___date], order: DESC }
                        filter: { fields: { collection: { eq: "posts" } } }
                    ) {
                        nodes {
                            frontmatter {
                                title
                                tags
                                emoji
                                date(formatString: "DD MMMM YYYY")
                            }
                            slug
                        }
                    }
                }
              `,
                ref: 'slug',
                index: ['title', 'tags', 'slug'],
                store: ['title', 'tags', 'emoji', 'date', 'slug'],

                normalizer: ({ data }) =>
                    data.allMdx.nodes.map((node) => ({
                        slug: node.slug,
                        title: node.frontmatter.title,
                        tags: node.frontmatter.tags,
                        emoji: node.frontmatter.emoji,
                        date: node.frontmatter.date,
                    })),
            },
        },
    ],
};

if (process.env.CONTEXT === 'production') {
    const googleAnalytics = {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
            trackingId: 'UA-138746648-1',
        },
    };
    config.plugins.push(googleAnalytics);
}

module.exports = config;
