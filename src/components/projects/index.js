import React from 'react';
import { Link } from 'gatsby';

import CometImage from '../../images/comet.png';
import HourglassImage from '../../images/hourglass.png';
import GamingImage from '../../images/gaming.png';
import TwilioImage from '../../images/twilio.png';
import GftwImage from '../../images/gftw.png';

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

const Project = ({ image, slug, url, children, title, data }) => (
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

const Projects = ({ limit }) => (
    <>
        <Project
            image={TwilioImage}
            url="https://dev.to/emma/trello-twilio-simplify-conversations-with-your-customers-32dg"
            title="Customer Conversations using Trello + Twilio"
        >
            Grand prize winner in the DEV x Twilio hackathon.
        </Project>
        <Project
            image={CometImage}
            slug="/streak"
            title="Streak - habit tracker"
        >
            Track your habits using Trello cards. Installed on{' '}
            <b>21000+</b> Trello boards.
        </Project>
        {!limit && (
            <Project
                image={HourglassImage}
                slug="/sla"
                title="SLAs for Trello"
            >
                See at a glance whether your Trello cards are meeting
                their SLAs. Installed on <b>600+</b> Trello boards.
            </Project>
        )}
        {!limit && (
            <Project
                image={GamingImage}
                slug="/gaming-backlog"
                title="Gaming Backlog"
            >
                Integrate with Steam to add your games as cards to
                Trello.
            </Project>
        )}
        {!limit && (
            <Project
                image={GftwImage}
                url="https://dev.to/emma/discover-content-creators-using-monetized-rss-40n1"
                title="Discover content creators using monetized-rss"
            >
                Runner up in the DEV x Grant For The Web hackathon.
            </Project>
        )}
    </>
);

export default Projects;
