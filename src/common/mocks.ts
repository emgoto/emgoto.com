import { Page } from './types';

export const getMockBlogPost = (title, tags) => ({
    ...mockBlogPost,
    frontmatter: {
        ...mockBlogPost.frontmatter,
        title,
        tags,
    },
});

export const mockBlogPost: Page = {
    frontmatter: {
        coverImage: 'url',
        date: '2020-09-16T00:00:00.000Z',
        emoji: '💬',
        tags: ['blog', 'dev'],
        title:
            'Using the DEV API to add DEV.to comment counts to my blog',
    },
    slug: 'gatsby-dev-api/',
};
