import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Comments from './index';

const MOCK_URL = 'https://www.dev.to/blah';
const COMMENTS_URL = `${MOCK_URL}#comments`;

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({ comments_count: 5, url: MOCK_URL }),
        }),
    );
});

describe('Comments component', () => {
    test('should display nothing if article ID is not passed in', async () => {
        render(<Comments />);

        // Since our component renders async, we need to wait to make sure it doesn't pop in
        await waitFor(() => {}, { timeout: 100 });

        await waitFor(() => {
            const submitButton = screen.queryByRole('link');
            expect(submitButton).toBeNull();
        });
    });

    test('should display nothing if DEV API fails to return data', async () => {
        fetch.mockImplementation(() => Promise.reject('API is down'));
        render(<Comments devArticleId={123} />);

        // Since our component renders async, we need to wait to make sure it doesn't pop in
        await waitFor(() => {}, { timeout: 100 });

        await waitFor(() => {
            const submitButton = screen.queryByRole('link');
            expect(submitButton).toBeNull();
        });
    });

    test('should display number of comments with link to article', async () => {
        render(<Comments devArticleId={123} />);

        await waitFor(() => {
            const link = screen.getByRole('link');
            expect(link).toHaveTextContent('5 comments');
            expect(link.href).toBe(COMMENTS_URL);
        });
    });

    test('should display prompt to leave a comment if there are no comments', async () => {
        fetch.mockImplementation(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        comments_count: 0,
                        url: MOCK_URL,
                    }),
            }),
        );
        render(<Comments devArticleId={123} />);

        await waitFor(() => {
            const link = screen.getByRole('link');
            expect(link).toHaveTextContent('Comment on DEV');
            expect(link.href).toBe(COMMENTS_URL);
        });
    });
});
