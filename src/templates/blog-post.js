import React from 'react';
import { graphql } from 'gatsby';
import Content from '../components/content';
import Seo from '../components/seo';
import PrevAndNext from '../components/prev-and-next';

export default ({
    data: {
        mdx: {
            frontmatter: { title, date, tags, devArticleId },
            slug,
            body,
            excerpt,
        },
    },
    pageContext: { prev, next },
}) => (
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
        <PrevAndNext prev={prev} next={next} />
    </>
);

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
