import React from 'react';
import { Container } from './styled';

const Footer = () => (
    <Container>
        <a
            href="https://emgoto.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span role="img" aria-label="Owl emoji">
                🦉
            </span>{' '}
            Subscribe to my monthly newsletter
        </a>{' '}
        for updates on my latest posts and projects.
    </Container>
);

export default Footer;
