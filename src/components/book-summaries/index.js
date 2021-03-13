import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
    BookContainer,
    InfoContainer,
    ImageContainer,
    BookAndAuthor,
} from './styled';

const BookSummary = ({
    book: {
        slug,
        frontmatter: {
            title: postTitle,
            bookInfo: { title, author, coverImage },
        },
    },
}) => {
    return (
        <Link to={`/${slug}`}>
            <BookContainer>
                <ImageContainer>
                    <GatsbyImage
                        image={
                            coverImage.childImageSharp.gatsbyImageData
                        }
                        alt={title}
                    />
                </ImageContainer>
                <InfoContainer>
                    <div>{postTitle} </div>
                    <BookAndAuthor>
                        {title} <span>by {author}</span>
                    </BookAndAuthor>
                </InfoContainer>
            </BookContainer>
        </Link>
    );
};

const BookSummaries = ({ books }) => {
    return (
        <>
            {books.map((book) => (
                <BookSummary book={book} key={book.slug} />
            ))}
        </>
    );
};

export default BookSummaries;
