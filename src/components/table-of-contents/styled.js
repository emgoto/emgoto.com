import styled from 'styled-components';
import colors from '../../common';

const SIDEBAR_WIDTH = 400;
const SIDEBAR_BREAKPOINT = 1000;

export const Container = styled.nav`
    @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
        display: none;
    }

    max-width: ${SIDEBAR_WIDTH}px;
    min-width: 300px;

    align-self: flex-start;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 104px;

    max-height: calc(100vh - 144px);
    overflow: auto;

    font-size: 16px;
    padding: 16px;

    h2 {
        margin: 0;
        padding-left: 8px;
    }

    ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }

    li {
        padding: 8px 0;
    }

    li > a {
        color: colors.lightGrey;
    }

    li > a:hover {
        color: ${colors.white};
    }

    li li {
        margin-left: 16px;
    }
    li li:first-child {
        margin-top: 8px;
    }
`;

export const Spacer = styled.div`
    height: 228px;
`;

export const Bullet = styled.div`
    width: 8px;
    min-width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid
        ${(props) => (props.isActive ? `${colors.blue}` : '')};
    background-color: ${(props) =>
        props.isActive ? `${colors.blue}` : ''};
    margin: 8px;
`;

export const Item = styled.li`
    > div > a {
        color: ${(props) =>
            props.isActive ? colors.white : colors.lightGrey};
    }

    > div {
        display: flex;
    }
`;
