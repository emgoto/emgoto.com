import React from 'react';
import { graphql } from 'gatsby';
import Summaries from '../components/summaries';
import Seo from '../components/seo';

export default ({ pageContext, data }) => {
    const { tag } = pageContext || {};
    return (
        <>
            <h1>{`#${tag}`}</h1>
            <Seo title={`Posts tagged #${tag}`} />
            <Summaries posts={data.allMdx.nodes} />
        </>
    );
};

export const pageQuery = graphql`
    query($tag: String) {
        allMdx(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
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
