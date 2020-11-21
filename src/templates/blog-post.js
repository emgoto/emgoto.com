import React from 'react';
import { graphql } from 'gatsby';
import Content from '../components/content';
import Seo from '../components/seo';
import PrevAndNext from '../components/prev-and-next';
import ReadMore from '../components/read-more';

export default ({
    data: {
        mdx: {
            frontmatter: { title, date, updated, tags, devArticleId },
            slug,
            body,
            excerpt,
        },
    },
    pageContext: { prev, next, relatedPosts },
}) => (
    <>
        <Seo title={title} slug={slug} description={excerpt} isPost />
        <Content
            title={title}
            body={body}
            date={date}
            updated={updated}
            tags={tags}
            slug={slug}
            devArticleId={devArticleId}
        />
        <PrevAndNext prev={prev} next={next} />
        <ReadMore tag={tags[0]} posts={relatedPosts} />
    </>
);

export const pageQuery = graphql`
    query($slug: String!) {
        mdx(slug: { eq: $slug }) {
            frontmatter {
                tags
                date(formatString: "DD MMMM YYYY")
                updated(formatString: "DD MMMM YYYY")
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
