import styled from 'styled-components';

import colors from '../../../common';

export const Container = styled.div`
    display: flex;
    height: 80px;
    align-items: center;
`;

export const StickyHeader = styled.div`
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    z-index: 1; // To make sure sticky header sits on top of images/headers
    background-color: ${colors.darkGrey};
`;

export const LogoContainer = styled.div`
    font-size: 2em;
    padding-bottom: 8px;
    color: ${colors.purple};
    letter-spacing: 2px;
    flex-grow: 1;
    a,
    a:hover {
        color: inherit;
    }
`;

export const YellowContainer = styled.span`
    color: ${colors.yellow};
`;

export const Icons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 8px 4px;
    margin-bottom: 8px;
    margin-top: 8px;

    .svg-inline--fa:hover > * {
        fill: ${colors.white};
    }

    font-size: 12px;
`;

export const Margin = styled.div`
    margin-right: 16px;
`;
