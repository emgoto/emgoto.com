import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import Summaries from '../components/summaries';
import Project from '../components/project';
import Seo from '../components/seo';

import CometImage from '../images/comet.png';
import HourglassImage from '../images/hourglass.png';
import GamingImage from '../images/gaming.png';
import TwilioImage from '../images/twilio.png';
import GftwImage from '../images/gftw.png';

const ViewMore = styled.div`
    font-size: 12px;
`;

const IndexPage = ({ data }) => (
    <>
        <Seo />
        <h1>Hello world!</h1>
        <p>
            I'm Emma, a front-end developer at Atlassian. In my free
            time, I study Japanese, create Trello Power-Ups like{' '}
            <a
                href="https://trello.com/power-ups/5c02759abbb4b58f5d5d2526/streak-habit-tracker"
                target="_blank"
                rel="noopener noreferrer"
            >
                Streak
            </a>
            , and try to learn as much as I can about the front-end.
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
        <Project
            image={HourglassImage}
            slug="sla"
            title="SLAs for Trello"
        >
            See at a glance whether your Trello cards are meeting
            their SLAs. Installed on <b>600+</b> Trello boards.
        </Project>
        <Project
            image={GamingImage}
            slug="gaming-backlog"
            title="Gaming Backlog"
        >
            Integrate with Steam to add your games as cards to Trello.
        </Project>
        <Project
            image={GftwImage}
            url="https://dev.to/emma/discover-content-creators-using-monetized-rss-40n1"
            title="Discover content creators using monetized-rss"
        >
            Runner up in the DEV x Grant For The Web hackathon.
        </Project>

        <h2>Recent posts</h2>
        <Summaries posts={data.allMdx.nodes} />

        <Link to="blog">
            <ViewMore>View all posts</ViewMore>
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
            filter: { frontmatter: { category: { eq: "blog" } } }
            limit: 3
        ) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "DD MMMM YYYY")
                    tags
                    category
                    emoji
                }
                slug
            }
        }
    }
`;

export default IndexPage;
