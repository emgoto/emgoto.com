import React from 'react';
import { Link } from 'gatsby';
import { Button, Emoji, Title, Date } from './styled';

export const CURRENT_YEAR = '2020';

const renderDateWithoutCurrentYear = dateWithYear =>
    dateWithYear.split(` ${CURRENT_YEAR}`)[0];

const Summary = ({
    isCompact,
    slug,
    frontmatter: { title, emoji, date },
}) => (
    <Link data-testid="summary" to={`/${slug}`}>
        <Button>
            <Emoji>{emoji}</Emoji>
            <div>
                <Title>{title}</Title>
                {!isCompact && (
                    <Date>{renderDateWithoutCurrentYear(date)}</Date>
                )}
            </div>
        </Button>
    </Link>
);

export default ({ posts, isCompact }) =>
    posts.map((post, i) => {
        const { frontmatter, slug } = post;
        return (
            <Summary
                slug={slug}
                key={i}
                frontmatter={frontmatter}
                isCompact={isCompact}
            />
        );
    });
