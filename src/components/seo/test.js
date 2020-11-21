import React from 'react';
import { render } from '@testing-library/react';
import Helmet from 'react-helmet';

import SEO from './index';

const siteTitle = 'Emma Goto';
const siteDescription =
    "I'm Emma, a front-end developer. Welcome to my corner of the internet!";
const siteUrl = 'https://www.emgoto.com';

describe('SEO component', () => {
    const nonBlogPostMetaTags = [
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
                    name: 'description',
                    content: siteDescription,
                },
                {
                    property: 'og:description',
                    content: siteDescription,
                },
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
        const description = `All posts written about Gatsby by Emma Goto.`;

        render(
            <SEO
                title={postTitle}
                slug={`tags/gatsby`}
                description={`All posts written about Gatsby by Emma Goto.`}
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
                    property: 'og:url',
                    content: 'https://www.emgoto.com/tags/gatsby/',
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
                isPost
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
                    property: 'og:url',
                    content: 'https://www.emgoto.com/post-slug/',
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
