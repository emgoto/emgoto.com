import React, { useState } from 'react';
import { Container, Spacer, Bullet, Item } from './styled';
import { useIntersectionObserver, useHeadingsData } from './utils';

const HeadingLink = ({ heading, activeIndex, children }) => (
    <Item isActive={activeIndex === heading.index}>
        <div>
            <Bullet isActive={activeIndex === heading.index} />
            <a
                href={heading.url}
                onClick={(e) => {
                    e.preventDefault();
                    document
                        .querySelector(heading.url)
                        .scrollIntoView({
                            behavior: 'smooth',
                        });
                }}
            >
                {heading.title}
            </a>
        </div>
        {children}
    </Item>
);

const HeadingsList = ({ headings, activeIndex }) => (
    <ul>
        {headings.map((heading) => (
            <HeadingLink
                heading={heading}
                activeIndex={activeIndex}
                key={heading.url}
            >
                {heading.items && heading.items.length > 0 && (
                    <ul>
                        {heading.items.map((child) => (
                            <HeadingLink
                                heading={child}
                                activeIndex={activeIndex}
                                key={child.url}
                            />
                        ))}
                    </ul>
                )}
            </HeadingLink>
        ))}
    </ul>
);

const TableOfContents = ({ tableOfContents }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const { getIndexFromId, nestedHeadings } = useHeadingsData();
    useIntersectionObserver(getIndexFromId, setActiveIndex);

    return (
        <>
            <Spacer />
            <Container aria-label="Table of contents">
                <HeadingsList
                    activeIndex={activeIndex}
                    headings={
                        nestedHeadings.length > 0
                            ? nestedHeadings
                            : tableOfContents.items
                    }
                />
            </Container>
        </>
    );
};

export default TableOfContents;
