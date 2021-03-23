export const MAX_TAGS = 5;

export const filterPostsByTag = (posts, tag) =>
    posts.filter((post) => post.frontmatter.tags.includes(tag));

export const getMostPopularTags = (nodes) => {
    const tagCount = {};
    nodes.forEach((node) => {
        const { tags } = node.frontmatter;
        tags.forEach((tag) => {
            if (!tagCount[tag]) {
                tagCount[tag] = 1;
            } else {
                tagCount[tag] += 1;
            }
        });
    });

    return Object.entries(tagCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, MAX_TAGS)
        .map((tag) => ({ name: tag[0], count: tag[1] }));
};
