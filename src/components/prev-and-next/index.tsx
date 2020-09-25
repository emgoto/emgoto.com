import React from 'react';
import { Link } from 'gatsby';
import { Page } from '../../common/types';

import { Container, PostContainer } from './styled';

type Props = {
    prev?: Page;
    next?: Page;
};

const Post = ({ title, post }) => {
    if (!post || !post.frontmatter.category) {
        return <div />;
    }

    return (
        <PostContainer>
            <div>{title}</div>
            <Link to={`/${post.slug}`}>{post.frontmatter.title}</Link>
        </PostContainer>
    );
};

const PrevAndNext = ({ prev, next }: Props) => (
    <Container>
        <Post title="⇠ Next post" post={prev} />
        <Post title="Previous post ⇢" post={next} />
    </Container>
);

export default PrevAndNext;
