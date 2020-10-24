import React from 'react';
import { GlobalStyle } from '../../common';
import { Container, SquareContainer, TextContainer } from './styled';
import Header from './header';
import Footer from './footer';
import './theme.css';

require('typeface-open-sans');

const Layout = ({ children, pageContext }) => {
    if (pageContext.noLayout) {
        return (
            <div>
                <GlobalStyle />
                {children}
            </div>
        );
    }

    return (
        <>
            <GlobalStyle />
            <Container>
                <Header />
                <SquareContainer>
                    <TextContainer>{children}</TextContainer>
                </SquareContainer>
                <Footer />
            </Container>
        </>
    );
};

export default Layout;
