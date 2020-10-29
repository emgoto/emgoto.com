import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
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
        <Link url to={`/${slug}`}>
            <BookContainer>
                <ImageContainer>
                    <Img fixed={coverImage.childImageSharp.fixed} />
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
            {books.map(book => (
                <BookSummary book={book} />
            ))}
        </>
    );
};

export default BookSummaries;
