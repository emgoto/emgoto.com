import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { getMockBlogPost } from '../../common/mocks';
import PostsByTag from './index';

describe('PostsByTag component', () => {
    test('should only show posts tagged with react when react button is clicked', () => {
        const mockPosts = [
            getMockBlogPost('Blog about React', ['post', 'react']),
            getMockBlogPost('Blog about Preact', ['post', 'preact']),
        ];

        render(<PostsByTag posts={mockPosts} />);

        let summaries = screen.getAllByTestId('summary');
        expect(summaries.length).toEqual(2);

        const reactTagButton = screen.getByRole('button', {
            name: /^react.*/,
        });
        fireEvent.click(reactTagButton);

        summaries = screen.getAllByTestId('summary');
        expect(summaries.length).toEqual(1);
    });
});
