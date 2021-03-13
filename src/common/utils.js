// FlexSearch returns data in a "flat" state but we need to return it
// in the shape expected by the summaries component
export const unFlattenData = (data) =>
    data.map((post) => {
        const { date, emoji, slug, tags, title } = post;
        return { slug, frontmatter: { title, emoji, date, tags } };
    });
