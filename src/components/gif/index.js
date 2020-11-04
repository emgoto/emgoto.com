import React from 'react';
import { Container } from './styled';

// Gatsby doesn't render GIFs by default :(
const Gif = ({ src }) => (
    <Container>
        <img src={src} />
    </Container>
);

export default Gif;
