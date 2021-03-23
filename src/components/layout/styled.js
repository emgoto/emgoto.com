import styled, { css } from 'styled-components';

import colors from '../../common';

const CONTENT_WIDTH = 800;
const SIDEBAR_WIDTH = 400;

const SIDEBAR_BREAKPOINT = 900;

const containerStyles = css`
    margin: 0 auto;
    padding: 0 16px;
    margin-bottom: 16px;
`;

export const ContainerWithSidebar = styled.div`
    display: flex;
    flex-direction: row-reverse;
    max-width: ${CONTENT_WIDTH + SIDEBAR_WIDTH + 16}px;

    ${containerStyles};
`;

export const Container = styled.div`
    max-width: ${CONTENT_WIDTH}px;

    ${containerStyles};
`;

export const MainContent = styled.div`
    max-width: ${CONTENT_WIDTH}px;
    min-width: 0;

    @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
        max-width: 100%;
    }
`;

export const SquareContainer = styled.div`
    box-sizing: border-box;
    background-color: ${colors.black};
    border-radius: 4px;
`;

export const TextContainer = styled.div`
    padding: 16px;
`;

export const Sidebar = styled.aside`
    @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
        display: none;
    }

    width: ${SIDEBAR_WIDTH}px;
    min-width: ${SIDEBAR_WIDTH}px;
    margin-left: 16px;
`;
