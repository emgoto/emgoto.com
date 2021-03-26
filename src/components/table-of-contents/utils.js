import { useEffect, useState, useRef, useCallback } from 'react';

export const useIntersectionObserver = (
    getIndexFromId,
    setActiveIndex,
) => {
    const headingElementsRef = useRef({});
    useEffect(() => {
        const callback = (headings) => {
            // Store all headings on the page in headingElementsRef
            headingElementsRef.current = headings.reduce(
                (map, headingElement) => {
                    map[headingElement.target.id] = headingElement;
                    return map;
                },
                headingElementsRef.current,
            );

            // Get all headings that are currently visible on the page
            const visibleHeadings = [];
            Object.keys(headingElementsRef.current).forEach((key) => {
                const headingElement =
                    headingElementsRef.current[key];
                if (headingElement.isIntersecting)
                    visibleHeadings.push(headingElement);
            });

            // If there is only one visible heading, this is our "active" heading
            if (visibleHeadings.length === 1) {
                setActiveIndex(
                    getIndexFromId(visibleHeadings[0].target.id),
                );
                // If there is more than one visible heading,
                // choose the one that is closest to the top of the page
            } else if (visibleHeadings.length > 1) {
                const sortedVisibleHeadings = visibleHeadings.sort(
                    (a, b) =>
                        getIndexFromId(a.target.id) >
                        getIndexFromId(b.target.id),
                );

                setActiveIndex(
                    getIndexFromId(
                        sortedVisibleHeadings[0].target.id,
                    ),
                );
            }
        };

        // The IntersectionObserver will notify us when headings appear/disappear
        // -110px top margin: this accounts for my sticky navigation
        // -40% bottom margin: I don't make headings "active" if they are still
        // in the bottom 40% of the page.
        const observer = new IntersectionObserver(callback, {
            rootMargin: '-110px 0px -40% 0px',
        });

        const headingElements = Array.from(
            document.querySelectorAll('h2, h3'),
        );

        headingElements.forEach((element) =>
            observer.observe(element),
        );

        return () => observer.disconnect();
    }, [getIndexFromId, setActiveIndex]);
};

export const useHeadingsData = () => {
    const [headings, setHeadings] = useState([]);
    const [nestedHeadings, setNestedHeadings] = useState([]);

    useEffect(() => {
        const headingElements = Array.from(
            document.querySelectorAll('h2, h3'),
        );

        setHeadings(headingElements.map((heading) => heading.id));

        // Created a list of H2 and H3 headings, with H3s nested
        const newNestedHeadings = [];
        headingElements.forEach((heading, index) => {
            const { innerText: title, id } = heading;
            const depth = Number(heading.nodeName[1]);
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
    }, []);

    const getIndexFromId = useCallback(
        (id) => {
            if (headings.length === 0) return undefined;
            return headings.findIndex((heading) => heading === id);
        },
        [headings],
    );

    return { getIndexFromId, nestedHeadings };
};
