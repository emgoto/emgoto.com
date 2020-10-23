import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import Summaries from '../components/summaries';
import Project from '../components/project';
import Seo from '../components/seo';

import CometImage from '../images/comet.png';
import TwilioImage from '../images/twilio.png';

const ViewMore = styled.div`
    font-size: 12px;
`;

const IndexPage = ({
    data: {
        allMdx: { nodes, totalCount },
    },
}) => (
    <>
        <Seo />
        <h1>Hello world!</h1>
        <p>
            I'm Emma, a front-end developer at Atlassian. I'm on a
            journey to improve myself as a developer and writer.
            Welcome to my corner of the internet!{' '}
            <span role="img" aria-label="sparkle emoji">
                ✨
            </span>
        </p>
        <h2>Projects</h2>
        <p />
        <Project
            image={TwilioImage}
            url="https://dev.to/emma/trello-twilio-simplify-conversations-with-your-customers-32dg"
            title="Customer Conversations using Trello + Twilio"
        >
            Grand prize winner in the DEV x Twilio hackathon.
        </Project>
        <Project
            image={CometImage}
            slug="streak"
            title="Streak - habit tracker"
        >
            Track your habits using Trello cards. Installed on{' '}
            <b>12000+</b> Trello boards.
        </Project>
        <Link to="projects">
            <ViewMore>View all projects</ViewMore>
        </Link>

        <h2>Posts</h2>
        <Summaries posts={nodes} />

        <Link to="blog">
            <ViewMore>View all {totalCount} posts</ViewMore>
        </Link>
    </>
);

export const pageQuery = graphql`
    query {
        allMdx(
            sort: {
                fields: [frontmatter___date, frontmatter___title]
                order: [DESC, DESC]
            }
            filter: { fields: { collection: { eq: "posts" } } }
            limit: 3
        ) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "DD MMMM YYYY")
                    tags
                    emoji
                }
                slug
            }
            totalCount
        }
    }
`;

export default IndexPage;
