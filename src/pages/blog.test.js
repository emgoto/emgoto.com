import React from 'react';
import { render, screen } from '@testing-library/react';
import { getPageQueryData } from 'gatsby-plugin-testing';
import BlogPage from './blog';

describe('Index page', () => {
    test('should render at least one post', async () => {
        const data = await getPageQueryData('blog');
        render(<BlogPage data={data} />);
        const posts = screen.getAllByTestId('summary');
        expect(posts.length).toBeGreaterThan(0);
    });
});
