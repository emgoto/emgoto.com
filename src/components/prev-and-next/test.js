import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockPage, mockBlogPost } from '../../common/mocks';
import PrevAndNext from './index';

describe('PrevAndNext component', () => {
    test('should not render anything if no blog posts available', () => {
        render(<PrevAndNext />);
        const link = screen.queryByRole('link');

        expect(link).toBe(null);
    });

    test('should only render next post link if available', () => {
        render(<PrevAndNext prev={mockPage} next={mockBlogPost} />);
        const link = screen.queryByRole('link');

        expect(link.textContent).toEqual(
            mockBlogPost.frontmatter.title,
        );
    });

    test('should only render previous post link if available', () => {
        render(<PrevAndNext prev={mockBlogPost} next={mockPage} />);
        const link = screen.queryByRole('link');

        expect(link.textContent).toEqual(
            mockBlogPost.frontmatter.title,
        );
    });

    test('should render both links if posts are available', () => {
        render(
            <PrevAndNext prev={mockBlogPost} next={mockBlogPost} />,
        );
        const links = screen.queryAllByRole('link');

        expect(links).toHaveLength(2);
    });
});
