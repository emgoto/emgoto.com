import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import favicon from '../../images/favicon.png';

const SEO = ({ description, title, slug }) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        siteUrl
                    }
                }
            }
        `,
    );

    const slugWithoutSlashes = () => slug.replace(/\//g, '');

    const socialCard = slug
        ? `${
              site.siteMetadata.siteUrl
          }/${slugWithoutSlashes()}-twitter.png`
        : `${site.siteMetadata.siteUrl}/square-social-card.png`;

    const twitterCard = slug ? 'summary_large_image' : 'summary';

    return (
        <Helmet
            htmlAttributes={{
                lang: 'en',
            }}
            title={title}
            titleTemplate={`%s · ${site.siteMetadata.title}`}
            defaultTitle={site.siteMetadata.title}
            meta={[
                {
                    name: 'description',
                    content: description || site.siteMetadata.description,
                },
                {
                    property: `og:title`,
                    content: title ? title : 'Emma Goto',
                },
                {
                    property: 'og:description',
                    content: description || site.siteMetadata.description,
                },
                {
                    name: 'twitter:card',
                    content: twitterCard,
                },
                {
                    property: 'og:image',
                    content: socialCard,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:creator`,
                    content: '@emma_goto',
                },
                {
                    name: `twitter:site`,
                    content: '@emma_goto',
                },
                {
                    name: `monetization`,
                    content: '$ilp.uphold.com/yhXKK7rBEAyw',
                },
            ]}
            link={[
                {
                    rel: 'shortcut icon',
                    type: 'image/png',
                    href: `${favicon}`,
                },
            ]}
        />
    );
};

SEO.defaultProps = {
    description: ``,
};

SEO.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};

export default SEO;
