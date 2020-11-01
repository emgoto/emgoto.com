import React from 'react';
import { graphql } from 'gatsby';

import Summaries from '../components/summaries';
import Projects from '../components/projects';
import Seo from '../components/seo';
import ViewAll from '../components/view-all';

const IndexPage = ({
    data: {
        posts: { nodes: postNodes, totalCount: totalCountPosts },
        books: { nodes: bookNodes, totalCount: totalCountBooks },
    },
}) => (
    <>
        <Seo />
        <h1>Hello world!</h1>
        <p>
            I'm Emma, a front-end developer at Atlassian. I'm on a
            journey to improve myself as a developer and writer.
            Welcome to my corner of the internet!{' '}
            <span role="img" aria-label="sparkle emoji">
                ✨
            </span>
        </p>
        <h2>Projects</h2>
        <Projects limit />
        <ViewAll slug={'projects/'}>View all projects</ViewAll>

        <h2>Posts</h2>
        <Summaries posts={postNodes} />
        <ViewAll slug="blog/">
            View all {totalCountPosts} posts
        </ViewAll>

        <h2>Book Notes</h2>
        <Summaries posts={bookNodes} />
        <ViewAll slug="books/">
            View all {totalCountBooks} book notes
        </ViewAll>
    </>
);

export const pageQuery = graphql`
    query {
        posts: allMdx(
            sort: {
                fields: [frontmatter___date, frontmatter___title]
                order: [DESC, DESC]
            }
            filter: { fields: { collection: { eq: "posts" } } }
            limit: 3
        ) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "DD MMMM YYYY")
                    tags
                    emoji
                }
                slug
            }
            totalCount
        }

        books: allMdx(
            sort: {
                fields: [frontmatter___date, frontmatter___title]
                order: [DESC, DESC]
            }
            filter: { fields: { collection: { eq: "books" } } }
            limit: 3
        ) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "DD MMMM YYYY")
                    tags
                    emoji
                }
                slug
            }
            totalCount
        }
    }
`;

export default IndexPage;
