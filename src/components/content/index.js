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
    Socials,
} from './styled';
import Comments from './comments';

const getGithubUrl = slug =>
    `https://github.com/emgoto/emgoto.com/tree/master/posts/${slug}index.mdx`;

const Tag = ({ tag }) => (
    <Link to={`/tags/${kebabCase(tag)}/`}>
        <TagContainer>{tag}</TagContainer>
    </Link>
);

const GithubLink = ({ slug }) => (
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
);

const renderDate = (date, updated) =>
    updated ? `Updated ${updated}` : date;

const Content = ({
    title,
    date,
    updated,
    tags,
    body,
    slug,
    devArticleId,
}) => (
    <div>
        <h1>{title}</h1>
        <Container>
            <DateAndTags>
                {renderDate(date, updated)}
                <Interpunct>·</Interpunct>{' '}
                {tags.map(tag => (
                    <Tag tag={tag} key={tag} />
                ))}
            </DateAndTags>
            <Socials>
                <GithubLink slug={slug} />
                {devArticleId && <Interpunct>·</Interpunct>}
                <Comments devArticleId={devArticleId} />
            </Socials>
        </Container>
        <MDXRenderer>{body}</MDXRenderer>
    </div>
);

export default Content;
