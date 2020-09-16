const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `posts/`, trailingSlash: false });
    createNodeField({ node, name: `slug`, value: slug });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
  {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 2000
    ) {
      edges {
        node {
          frontmatter {
            tags
            category
            date
            title
            emoji
            coverImage
          }
          slug
        }
      }
    }
  }
  `).then(result => {
    const posts = result.data.allMdx.edges;
    // Blog pages
    posts.forEach(({ node }, index) => {
      // Only blogs have a category
      if (node.frontmatter && node.frontmatter.category) {
        createPage({
          path: node.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            slug: node.slug,
            prev: index === 0 ? null : posts[index - 1].node,
            next: index === (posts.length - 1) ? null : posts[index + 1].node
          },
        });
      }
      
      // Create the cover image for the blogpost - to be used by script to take screenshot of
      if (process.env.gatsby_executing_command.includes('develop')) {
        const { title, emoji, coverImage } = node.frontmatter;
        createPage({
          path: `${node.slug}image_tw`,
          component: require.resolve('./src/templates/social-card.js'),    
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
          component: require.resolve('./src/templates/social-card.js'),    
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

    // Make tag pages

    let tags = [];

    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        edge.node.frontmatter.tags.forEach((tag) => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      }
    });

    tags = _.uniq(tags)

    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: path.resolve(`./src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  });
};
