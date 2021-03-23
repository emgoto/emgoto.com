import styled from 'styled-components';
import colors from '../../common';

export const Container = styled.div`
    align-self: flex-start;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 104px;

    background-color: ${colors.black};
    border-radius: 8px;
    font-size: 16px;
    padding: 16px;

    h2 {
        margin: 0;
        padding-left: 8px;
    }

    ul {
        padding: 0 12px;
        margin: 0;
        list-style-type: none;
    }

    li {
        padding: 8px 0;
        color: ${colors.white};
    }
`;

export const Spacer = styled.div`
    height: 228px;
`;

export const Link = styled.a`
    font-weight: ${(props) => (props.isActive ? 'bold' : 'inherit')};
`;
