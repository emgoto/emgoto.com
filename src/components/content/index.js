import React from 'react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import kebabCase from 'lodash/kebabCase';
import { Link } from 'gatsby';
import GithubIcon from '../../images/icon-github';
import {
    Container,
    TagContainer,
    Interpunct,
    DateAndTags,
    IconContainer,
} from './styled';
import Comments from './comments';

const getGithubUrl = slug =>
    `https://github.com/emgoto/emgoto.com/tree/master/posts/${slug}index.mdx`;

const Tag = ({ tag }) => (
    <Link to={`/tags/${kebabCase(tag)}`}>
        <TagContainer>{tag}</TagContainer>
    </Link>
);

const GithubLink = ({ slug }) => (
    <>
        <Interpunct>·</Interpunct>{' '}
        <IconContainer>
            <a
                href={getGithubUrl(slug)}
                aria-labelledby="Edit this post"
                target="_blank"
                rel="noopener noreferrer"
            >
                <div>
                    <GithubIcon />
                    <div>Edit this post</div>
                </div>
            </a>
        </IconContainer>
    </>
);

const Content = ({ title, date, tags, body, slug, devArticleId }) => (
    <div>
        <h1>{title}</h1>
        <Container>
            <DateAndTags>
                {date}
                <Interpunct>·</Interpunct>{' '}
                {tags.map(tag => (
                    <Tag tag={tag} key={tag} />
                ))}
                <GithubLink slug={slug} />
                <Comments devArticleId={devArticleId} />
            </DateAndTags>
        </Container>
        <MDXRenderer>{body}</MDXRenderer>
    </div>
);

export default Content;
