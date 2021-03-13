import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../../components/seo';
import BookSummaries from '../../components/book-summaries';

const BooksPage = ({
    data: {
        allMdx: { nodes },
    },
}) => {
    return (
        <>
            <h1>Book Notes</h1>
            <Seo
                title="Book Notes"
                slug="books"
                description="My summaries and notes about some of the books I've read."
            />
            <BookSummaries books={nodes} />
        </>
    );
};

export default BooksPage;

export const pageQuery = graphql`
    {
        allMdx(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { fields: { collection: { eq: "books" } } }
        ) {
            nodes {
                frontmatter {
                    title
                    tags
                    emoji
                    date(formatString: "DD MMMM YYYY")
                    bookInfo {
                        title
                        author
                        coverImage {
                            childImageSharp {
                                gatsbyImageData(width: 96)
                            }
                        }
                    }
                }
                slug
            }
        }
    }
`;
