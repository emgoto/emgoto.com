import React from 'react';
import { render, screen } from '@testing-library/react';
import { getPageQueryData } from 'gatsby-plugin-testing';
import BlogPage, { unFlattenData } from './index';

describe('Index page', () => {
    test('should render more than one post', async () => {
        const data = await getPageQueryData('blog');
        render(<BlogPage data={data} />);
        const posts = screen.getAllByTestId('summary');
        expect(posts.length).toBeGreaterThan(1);
    });
});

describe('unFlattenData', () => {
    test('should return list of posts in post format', () => {
        const frontmatter = {
            date: '15 Feb 2020',
            emoji: '🐣',
            tags: ['blog'],
            title: 'Blog post title',
        };
        const searchResultPost = { slug: 'sluggy', ...frontmatter };
        const post = { slug: 'sluggy', frontmatter };

        expect(
            unFlattenData([searchResultPost, searchResultPost]),
        ).toEqual([post, post]);
    });
});
