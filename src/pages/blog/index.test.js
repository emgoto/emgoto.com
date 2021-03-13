import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getPageQueryData } from 'gatsby-plugin-testing';
import BlogPage from './index';

describe('Index page', () => {
    let data;

    beforeAll(async () => {
        data = await getPageQueryData('blog');
    });

    beforeEach(() => {
        render(<BlogPage data={data} />);
    });

    test('should render posts and tags', () => {
        const posts = screen.getAllByTestId('summary');

        expect(posts.length).toBeGreaterThan(1);

        const tags = screen.getAllByTestId('tagButton');

        expect(tags.length).toEqual(5);
    });

    test('should reset tag filter when search hides tag', () => {
        const totalPostsCount = screen.getAllByTestId('summary')
            .length;

        // Filter by first tag
        const firstTag = screen.getAllByTestId('tagButton')[0];
        fireEvent.click(firstTag);

        // We should still see some posts (but not all)
        const posts = screen.getAllByTestId('summary');
        expect(posts.length).toBeGreaterThan(1);
        expect(posts.length).toBeLessThan(totalPostsCount);

        // Type nonsense into search bar - no tags, no posts
        const searchBar = screen.getByRole('textbox');
        userEvent.type(searchBar, 'asdfhjkl');

        expect(screen.queryByTestId('tagButton')).toBe(null);
        expect(screen.queryByTestId('summary')).toBe(null);

        // Reset filter - all tags, all posts
        searchBar.setSelectionRange(0, 8);
        userEvent.type(searchBar, '{backspace}');

        expect(screen.getAllByTestId('summary').length).toEqual(
            totalPostsCount,
        );
    });
});
