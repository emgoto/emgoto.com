const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require('lodash');

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({
            node,
            getNode,
            basePath: `posts/`,
            trailingSlash: false,
        });
        createNodeField({ node, name: `slug`, value: slug });

        // Creates collections out of folders i.e. posts folder
        const parent = getNode(node.parent);
        let collection = parent.sourceInstanceName;
        createNodeField({
            node,
            name: 'collection',
            value: collection,
        });
    }
};

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return graphql(`
        {
            allMdx(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: { fields: { collection: { eq: "posts" } } }
                limit: 2000
            ) {
                nodes {
                    frontmatter {
                        tags
                        date
                        title
                        emoji
                        coverImage
                    }
                    slug
                }
            }
        }
    `).then(result => {
        const posts = result.data.allMdx.nodes;
        let tags = [];
        posts.forEach((node, index) => {
            createPage({
                path: node.slug,
                component: path.resolve(
                    `./src/templates/blog-post.js`,
                ),
                context: {
                    slug: node.slug,
                    prev:
                        index === 0
                            ? undefined
                            : posts[index - 1].node,
                    next:
                        index === posts.length - 1
                            ? undefined
                            : posts[index + 1].node,
                },
            });

            if (node.frontmatter && node.frontmatter.tags) {
                node.frontmatter.tags.forEach(tag => {
                    if (!tags.includes(tag)) {
                        tags.push(tag);
                    }
                });
            }

            // Create the cover image for the blogpost - to be used by script to take screenshot of
            if (
                process.env.gatsby_executing_command.includes(
                    'develop',
                )
            ) {
                const { title, emoji, coverImage } = node.frontmatter;
                createPage({
                    path: `${node.slug}image_tw`,
                    component: require.resolve(
                        './src/templates/social-card.js',
                    ),
                    context: {
                        slug: node.slug,
                        isTwitter: true,
                        title,
                        emoji,
                        coverImage,
                        noLayout: true,
                    },
                });

                createPage({
                    path: `${node.slug}image_dev`,
                    component: require.resolve(
                        './src/templates/social-card.js',
                    ),
                    context: {
                        slug: node.slug,
                        isTwitter: false,
                        title,
                        emoji,
                        coverImage,
                        noLayout: true,
                    },
                });
            }
        });

        tags = _.uniq(tags);

        tags.forEach(tag => {
            createPage({
                path: `/tags/${_.kebabCase(tag)}/`,
                component: path.resolve(`./src/templates/tags.js`),
                context: {
                    tag,
                },
            });
        });
    });
};
