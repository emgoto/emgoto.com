import styled from 'styled-components';
import colors from './index';

export const Card = styled.div`
    padding: 16px;
    border-radius: 8px;
    color: ${colors.white};

    &:hover {
        cursor: pointer;
        opacity: 0.9;
        background-color: ${colors.darkGrey};
    }
`;
