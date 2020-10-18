export type Page = {
    frontmatter: {
        tags: string[] | null;
        date: string | null;
        title: string | null;
        emoji: string | null;
        coverImage: string | null;
    };
    slug: string;
};
