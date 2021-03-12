import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Comments from './index';

const MOCK_URL = 'https://www.dev.to/blah';
const COMMENTS_URL = `${MOCK_URL}#comments`;

global.fetch = jest.fn();
const json = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockReturnValue(
        Promise.resolve({
            json,
        }),
    );
    json.mockReturnValue(
        Promise.resolve({ comments_count: 5, url: MOCK_URL }),
    );
});

describe('Comments component', () => {
    test('should display nothing if article ID is not passed in', async () => {
        render(<Comments />);

        // Since our component renders async, we need to wait to make sure it doesn't pop in
        await waitFor(() => {}, { timeout: 100 });

        const commentsLink = screen.queryByRole('link');
        expect(commentsLink).toBeNull();
    });

    test('should display nothing if DEV API fails to return data', async () => {
        fetch.mockReturnValue(Promise.reject('API is down'));
        render(<Comments devArticleId={123} />);

        // Since our component renders async, we need to wait to make sure it doesn't pop in
        await waitFor(() => {}, { timeout: 100 });

        const commentsLink = screen.queryByRole('link');
        expect(commentsLink).toBeNull();
    });

    test('should display nothing if DEV API returns error due to wrong ID', async () => {
        json.mockReturnValue(
            Promise.resolve({ error: 'not found', status: 404 }),
        );

        render(<Comments devArticleId={123} />);

        // Since our component renders async, we need to wait to make sure it doesn't pop in
        await waitFor(() => {}, { timeout: 100 });

        const commentsLink = screen.queryByRole('link');
        expect(commentsLink).toBeNull();
    });

    test('should display number of comments with link to article', async () => {
        render(<Comments devArticleId={123} />);

        await waitFor(() => {
            expect(json).toHaveBeenCalledTimes(1);
        });

        const commentsLink = await screen.findByRole('link');
        expect(commentsLink).toHaveTextContent('5 comments');
        expect(commentsLink.href).toBe(COMMENTS_URL);
    });

    test('should display prompt to leave a comment if there are no comments', async () => {
        json.mockReturnValue(
            Promise.resolve({ comments_count: 0, url: MOCK_URL }),
        );

        render(<Comments devArticleId={123} />);

        await waitFor(() => {
            expect(json).toHaveBeenCalledTimes(1);
        });

        const commentsLink = await screen.findByRole('link');
        expect(commentsLink).toHaveTextContent('Comment on DEV');
        expect(commentsLink.href).toBe(COMMENTS_URL);
    });
});
