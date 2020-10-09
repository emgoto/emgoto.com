import React from 'react';
import { render, screen } from '@testing-library/react';
import { getPageQueryData } from 'gatsby-plugin-testing';
import IndexPage from './index';

describe('Index page', () => {
    test('should render three most recent posts', async () => {
        const data = await getPageQueryData('index');
        render(<IndexPage data={data} />);
        const posts = screen.getAllByTestId('summary');
        expect(posts.length).toEqual(3);
    });
});
