import React from 'react';
import { Link } from 'gatsby';

import { Container } from './styled';

const ViewAll = ({ slug, children }) => (
    <Link to={slug}>
        <Container>{children}</Container>
    </Link>
);

export default ViewAll;
