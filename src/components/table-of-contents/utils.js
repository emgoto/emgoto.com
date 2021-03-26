import { useEffect, useState, useRef, useCallback } from 'react';

export const useIntersectionObserver = (
    getIndexFromId,
    setActiveIndex,
) => {
    const intersectionsRef = useRef({});
    useEffect(() => {
        const callback = (entries) => {
            intersectionsRef.current = entries.reduce(
                (map, entry) => {
                    map[entry.target.id] = entry;
                    return map;
                },
                intersectionsRef.current,
            );

            const visibleEntries = [];
            Object.keys(intersectionsRef.current).forEach((key) => {
                const entry = intersectionsRef.current[key];
                if (entry.isIntersecting) visibleEntries.push(entry);
            });

            if (visibleEntries.length > 0) {
                if (visibleEntries.length === 1) {
                    setActiveIndex(
                        getIndexFromId(visibleEntries[0].target.id),
                    );
                } else {
                    const sortedVisibleEntries = visibleEntries.sort(
                        (a, b) =>
                            getIndexFromId(a.target.id) >
                            getIndexFromId(b.target.id),
                    );

                    setActiveIndex(
                        getIndexFromId(
                            sortedVisibleEntries[0].target.id,
                        ),
                    );
                }
            }
        };

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
        setHeadings(headingElements.map((heading) => heading.id));
    }, []);

    const getIndexFromId = useCallback(
        (id) => {
            if (headings.length > 0)
                return headings.findIndex(
                    (heading) => heading === id,
                );
            return undefined;
        },
        [headings],
    );

    return { getIndexFromId, nestedHeadings };
};
