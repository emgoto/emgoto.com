import React from 'react';
import { graphql } from 'gatsby';
import Summaries from '../components/summaries';
import Seo from '../components/seo';

export default ({ data }) => (
    <>
        <h1>Blog</h1>
        <Seo />
        <Summaries posts={data.allMdx.nodes} />
    </>
);

export const pageQuery = graphql`
    query {
        allMdx(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { fields: { collection: { eq: "posts" } } }
        ) {
            totalCount
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
`;
