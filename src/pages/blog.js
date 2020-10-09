import React from 'react';
import { graphql } from 'gatsby';
import Summaries from '../components/summaries';
import Seo from '../components/seo';

export default ({ data }) => (
    <>
        <h1>blog</h1>
        <Seo />
        <Summaries posts={data.allMdx.nodes} />
    </>
);

export const pageQuery = graphql`
    query {
        allMdx(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { category: { ne: null } } }
        ) {
            totalCount
            nodes {
                frontmatter {
                    title
                    category
                    tags
                    emoji
                    date(formatString: "DD MMMM YYYY")
                }
                slug
            }
        }
    }
`;
