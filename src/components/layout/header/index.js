import React from 'react';
import IconTwitter from '../../../images/icon-twitter';
import IconDev from '../../../images/icon-dev';
import TerminalBar from '../../terminal-bar';
import {
    StickyHeader,
    Container,
    LogoContainer,
    YellowContainer,
    Icons,
    Margin,
} from './styled';
import { Link } from 'gatsby';

const Header = () => (
    <StickyHeader>
        <Container>
            <LogoContainer>
                <Link to="/">
                    emma <YellowContainer>goto</YellowContainer>
                </Link>
            </LogoContainer>
            <Icons>
                <Margin>
                    <a
                        href="https://dev.to/emma"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="DEV"
                    >
                        <IconDev />
                    </a>
                </Margin>
                <div>
                    <a
                        href="https://twitter.com/emma_goto"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                    >
                        <IconTwitter />
                    </a>
                </div>
            </Icons>
        </Container>
        <TerminalBar />{' '}
    </StickyHeader>
);

export default Header;
