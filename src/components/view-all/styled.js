import styled from 'styled-components';
import colors from '../../common';

export const Container = styled.div`
    border-radius: 4px;
    padding: 8px;
    margin-top: 8px;
    font-size: 14px;
    display: inline-block;

    &:hover,
    &:active {
        background-color: ${colors.darkGrey};
        cursor: pointer;
    }
`;
