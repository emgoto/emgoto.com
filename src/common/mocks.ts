import { Page } from './types';

export const mockBlogPost: Page = {
    frontmatter: {
        category: 'blog',
        coverImage: 'url',
        date: '2020-09-16T00:00:00.000Z',
        emoji: '💬',
        tags: ['blog', 'dev'],
        title:
            'Using the DEV API to add DEV.to comment counts to my blog',
    },
    slug: 'gatsby-dev-api/',
};

export const mockPage: Page = {
    frontmatter: {
        category: null,
        coverImage: null,
        date: null,
        emoji: null,
        tags: null,
        title: '',
    },
    slug: 'gaming-backlog/',
};
