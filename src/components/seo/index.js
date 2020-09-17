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

    const metaDescription =
        description || site.siteMetadata.description;

    const slugWithoutSlashes = () => slug.replace(/\//g, '');

    const socialCard = slug
        ? `${
              site.siteMetadata.siteUrl
          }/${slugWithoutSlashes()}-twitter.png`
        : `${site.siteMetadata.siteUrl}/square-social-card.png`;

    const twitterCard = slug ? 'summary_large_image' : 'summary';

    const mDescription = slug
        ? {}
        : {
              name: `description`,
              content: metaDescription,
          };

    const ogDescription = slug
        ? {}
        : {
              property: `og:description`,
              content: metaDescription,
          };

    const ogTitle = title ? title : 'Emma Goto';

    return (
        <Helmet
            htmlAttributes={{
                lang: 'en',
            }}
            title={title}
            titleTemplate={`%s · ${site.siteMetadata.title}`}
            defaultTitle={site.siteMetadata.title}
            meta={[
                mDescription,
                ogDescription,
                {
                    name: `twitter:description`,
                    content: description
                        ? description
                        : metaDescription,
                },
                {
                    property: `og:title`,
                    content: ogTitle,
                },
                {
                    property: `og:type`,
                    content: `website`,
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
                    name: 'twitter:image',
                    content: socialCard,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: ogTitle,
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
}

SEO.defaultProps = {
    description: ``,
};

SEO.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};

export default SEO;
