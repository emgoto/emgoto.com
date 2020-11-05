import React from 'react';
import { Container } from './styled';

// Gatsby doesn't render GIFs by default :(
const Gif = ({ src, height, alt }) => (
    <Container height={height}>
        <img src={src} alt={alt} />
    </Container>
);

export default Gif;
