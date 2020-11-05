import React from 'react';
import { Container } from './styled';

// Gatsby doesn't render GIFs by default :(
const Gif = ({ src, alt }) => (
    <Container>
        <img alt="alt" src={src} />
    </Container>
);

export default Gif;
