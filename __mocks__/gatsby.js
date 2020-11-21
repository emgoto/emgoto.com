const React = require('react');
const gatsby = jest.requireActual('gatsby');
export * from 'gatsby-plugin-testing/__mocks__/gatsby';

const siteTitle = 'Emma Goto';
const siteDescription =
    "I'm Emma, a front-end developer. Welcome to my corner of the internet!";
const siteUrl = 'https://www.emgoto.com';

module.exports = {
    ...gatsby,
    graphql: jest.fn(),
    Link: jest.fn().mockImplementation(
        // these props are invalid for an `a` tag
        ({
            activeClassName,
            activeStyle,
            getProps,
            innerRef,
            partiallyActive,
            ref,
            replace,
            to,
            ...rest
        }) =>
            React.createElement('a', {
                ...rest,
                href: to,
            }),
    ),
    StaticQuery: jest.fn(),
    useStaticQuery: jest.fn().mockReturnValue({
        site: {
            siteMetadata: {
                title: siteTitle,
                description: siteDescription,
                author: siteTitle,
                siteUrl: siteUrl,
            },
        },
    }),
};
