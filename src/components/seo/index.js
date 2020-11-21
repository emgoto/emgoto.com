import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import favicon from '../../images/favicon.png';

const SEO = ({ description, title, slug, isPost = false }) => {
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

    const slugWithoutSlashes = () =>
        isPost ? slug.replace(/\//g, '') : slug;

    const socialCard = isPost
        ? `${
              site.siteMetadata.siteUrl
          }/${slugWithoutSlashes()}-twitter.png`
        : `${site.siteMetadata.siteUrl}/square-social-card.png`;

    const twitterCard = isPost ? 'summary_large_image' : 'summary';

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
                    content:
                        description || site.siteMetadata.description,
                },
                {
                    property: `og:title`,
                    content: title || site.siteMetadata.title,
                },
                {
                    property: 'og:description',
                    content:
                        description || site.siteMetadata.description,
                },
                {
                    property: 'og:url',
                    content: slug
                        ? `${
                              site.siteMetadata.siteUrl
                          }/${slugWithoutSlashes()}/`
                        : site.siteMetadata.siteUrl,
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
