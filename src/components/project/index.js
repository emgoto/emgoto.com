import React from 'react';
import { Link } from 'gatsby';
import { Button, Text, Description, MinWidth, Title } from './styled';

const MaybeLink = ({ slug, url, children }) => {
    if (slug) {
        return <Link to={slug}>{children}</Link>;
    }
    if (url) {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }

    return { children };
};

export default ({ image, slug, url, children, title, data }) => (
    <MaybeLink slug={slug} url={url}>
        <Button>
            <MinWidth>
                <img width="48" height="48" src={image} alt="" />
            </MinWidth>
            <Text>
                <Title>{title}</Title>
                <Description>{children}</Description>
            </Text>
        </Button>
    </MaybeLink>
);
