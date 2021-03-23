import React, { useEffect, useState } from 'react';
import { Container, Spacer, Link } from './styled';

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const useHeadingsData = () => {
    const [headingOffsets, setHeadingOffsets] = React.useState([]);
    const [nestedHeadings, setNestedHeadings] = React.useState([]);

    React.useEffect(() => {
        const headingElements = Array.from(
            document.querySelectorAll('h2, h3'),
        ).filter((el) => el.textContent !== 'Table of contents');

        // Created a list of headings, with H3s nested
        const newNestedHeadings = [];
        headingElements.forEach((heading, index) => {
            const { innerText: title, id } = heading;
            const depth = Number(heading.nodeName[1]); // "depth" will be either 2 or 3 (H2 or H3)
            if (depth === 3 && newNestedHeadings.length > 0) {
                newNestedHeadings[
                    newNestedHeadings.length - 1
                ].items.push({
                    url: `#${id}`,
                    title,
                    index,
                });
            } else if (depth === 2) {
                newNestedHeadings.push({
                    url: `#${id}`,
                    title,
                    index,
                    items: [],
                });
            }
        });

        setNestedHeadings(newNestedHeadings);
        setHeadingOffsets(
            headingElements.map((heading) => heading.offsetTop),
        );
    }, []);

    return { headingOffsets, nestedHeadings };
};

const HeadingLink = ({
    heading,
    activeIndex,
    children,
    setActiveIndex,
}) => (
    <li>
        <Link
            href={heading.url}
            onClick={(e) => {
                e.preventDefault();
                setActiveIndex(heading.index);
                document.querySelector(heading.url).scrollIntoView({
                    behavior: 'smooth',
                });
            }}
            isActive={heading.index === activeIndex}
        >
            {heading.title}
        </Link>
        {children}
    </li>
);

const HeadingsList = ({ headings, activeIndex, setActiveIndex }) => (
    <ul>
        {headings.map((heading) => (
            <HeadingLink
                heading={heading}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                key={heading.url}
            >
                {heading.items && heading.items.length > 0 && (
                    <ul>
                        {heading.items.map((child) => (
                            <HeadingLink
                                heading={child}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                                key={child.url}
                            />
                        ))}
                    </ul>
                )}
            </HeadingLink>
        ))}
    </ul>
);

const getMostRecentIndex = (headings) => {
    const STICKY_NAV_HEIGHT = 110;

    let mostRecentIndex = 0;
    for (let index = 0; index < headings.length; index++) {
        const headingIsScrolledPast =
            window.scrollY + STICKY_NAV_HEIGHT > headings[index];
        if (!headingIsScrolledPast && index === 0) return 0;
        if (!headingIsScrolledPast) break;
        mostRecentIndex = index;
    }

    // If the next header is in the top third of the page, make this the "active" header instead
    const nextHeadingInTopThird =
        mostRecentIndex < headings.length - 1 &&
        window.scrollY +
            STICKY_NAV_HEIGHT +
            0.3 * window.innerHeight >
            headings[mostRecentIndex + 1];
    if (nextHeadingInTopThird) mostRecentIndex++;

    return mostRecentIndex;
};

const TableOfContents = ({ tableOfContents }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { headingOffsets, nestedHeadings } = useHeadingsData();

    useEffect(() => {
        const updateActiveIndex = () =>
            setActiveIndex(getMostRecentIndex(headingOffsets));

        updateActiveIndex();

        const onScrollDebounce = debounce(updateActiveIndex, 250);
        window.addEventListener(`scroll`, onScrollDebounce);

        return () =>
            window.removeEventListener(`scroll`, onScrollDebounce);
    }, [headingOffsets]);

    return (
        <>
            <Spacer />
            <Container>
                <h2>Table of contents</h2>
                <HeadingsList
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
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
