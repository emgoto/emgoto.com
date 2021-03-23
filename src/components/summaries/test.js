import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockBlogPost } from '../../common/mocks';
import Summaries, { CURRENT_YEAR } from './index';

const createPost = (date) => {
    const post = mockBlogPost;
    post.frontmatter.date = date;
    return post;
};

describe('Summaries component', () => {
    test('should not render year if post was written in current year', async () => {
        render(
            <Summaries
                posts={[createPost(`16 Sept ${CURRENT_YEAR}`)]}
            />,
        );
        expect(
            screen.queryByText(`16 Sept ${CURRENT_YEAR}`),
        ).toBeNull();
        expect(screen.getByText('16 Sept')).toBeTruthy();
    });

    test('should render year if post was not written in current year', () => {
        render(<Summaries posts={[createPost('16 Sept 2019')]} />);
        expect(screen.getByText('16 Sept 2019')).toBeTruthy();
    });
});
