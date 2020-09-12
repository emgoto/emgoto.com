import React from 'react';
import { graphql } from 'gatsby';
import Content from '../components/content';
import Seo from '../components/seo';
import Newsletter from '../components/newsletter';

export default ({ data }) => {
    const {
        mdx: {
            frontmatter: { title, date, tags, devArticleId },
            slug,
            body,
            excerpt,
        },
    } = data;

    return (
        <>
            <Seo title={title} slug={slug} description={excerpt} />
            <Content
                title={title}
                body={body}
                date={date}
                tags={tags}
                slug={slug}
                devArticleId={devArticleId}
            />
            <Newsletter />
        </>
    );
};

export const pageQuery = graphql`
    query($slug: String!) {
        mdx(slug: { eq: $slug }) {
            frontmatter {
                tags
                category
                date(formatString: "DD MMMM YYYY")
                title
                emoji
                devArticleId
            }
            slug
            body
            excerpt
        }
    }
`;
