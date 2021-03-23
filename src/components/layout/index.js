import React from 'react';
import { GlobalStyle } from '../../common';
import {
    Container,
    ContainerWithSidebar,
    MainContent,
    SquareContainer,
    TextContainer,
    Sidebar,
} from './styled';
import Header from './header';
import Footer from './footer';
import TableOfContents from '../../components/table-of-contents';
import './styles.css';
import './theme.css';
import './fonts.css';

const Main = ({ children }) => (
    <>
        <Header />
        <SquareContainer>
            <TextContainer>{children}</TextContainer>
        </SquareContainer>
        <Footer />
    </>
);

const Layout = ({
    children,
    pageContext: { noLayout, tableOfContents },
}) => {
    if (noLayout) {
        return (
            <div>
                <GlobalStyle />
                {children}
            </div>
        );
    }

    if (tableOfContents) {
        return (
            <>
                <GlobalStyle />
                <ContainerWithSidebar>
                    <Sidebar>
                        <TableOfContents
                            tableOfContents={tableOfContents}
                        />
                    </Sidebar>
                    <MainContent>
                        <Main>{children}</Main>
                    </MainContent>
                </ContainerWithSidebar>
            </>
        );
    }

    return (
        <>
            <GlobalStyle />
            <Container>
                <Main>{children}</Main>
            </Container>
        </>
    );
};

export default Layout;
