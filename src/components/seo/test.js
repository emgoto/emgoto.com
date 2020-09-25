import React from 'react';
import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';

import SEO from './index';

const siteTitle = 'Emma Goto';
const siteDescription = 'Front-end development and side projects.';
const siteUrl = 'https://www.emgoto.com';

describe('SEO component', () => {
    beforeAll(() => {
        useStaticQuery.mockReturnValue({
            site: {
                siteMetadata: {
                    title: siteTitle,
                    description: siteDescription,
                    author: siteTitle,
                    siteUrl: siteUrl,
                },
            },
        });
    });

    const nonBlogPostMetaTags = [
        {
            name: 'description',
            content: siteDescription,
        },
        {
            property: 'og:description',
            content: siteDescription,
        },
        {
            name: 'twitter:card',
            content: 'summary',
        },
        {
            property: 'og:image',
            content: `${siteUrl}/square-social-card.png`,
        },
    ];

    test('should render correct meta data for home page', () => {
        render(<SEO />);
        const helmet = Helmet.peek();

        expect(helmet.title).toBe(siteTitle);

        expect(helmet.metaTags).toEqual(
            expect.arrayContaining([
                {
                    property: 'og:title',
                    content: siteTitle,
                },
                ...nonBlogPostMetaTags,
            ]),
        );
    });

    test('should render correct meta data for tags page', () => {
        const postTitle = 'Posts tagged #gatsby';

        render(<SEO title={postTitle} />);
        const helmet = Helmet.peek();

        expect(helmet.title).toBe(`${postTitle} · ${siteTitle}`);

        expect(helmet.metaTags).toEqual(
            expect.arrayContaining([
                {
                    property: 'og:title',
                    content: postTitle,
                },
                ...nonBlogPostMetaTags,
            ]),
        );
    });

    test('should render correct meta data for blog post', () => {
        const postTitle = 'Post title';
        const description = 'Beginning sentence of a blog post.';
        const slug = 'post-slug/';

        render(
            <SEO
                title={postTitle}
                description={description}
                slug={slug}
            />,
        );
        const helmet = Helmet.peek();

        expect(helmet.title).toBe(`${postTitle} · ${siteTitle}`);

        expect(helmet.metaTags).toEqual(
            expect.arrayContaining([
                {
                    name: 'description',
                    content: description,
                },
                {
                    property: 'og:title',
                    content: postTitle,
                },
                {
                    property: 'og:description',
                    content: description,
                },
                {
                    name: 'twitter:card',
                    content: 'summary_large_image',
                },
                {
                    property: 'og:image',
                    content: `${siteUrl}/post-slug-twitter.png`,
                },
            ]),
        );
    });
});
