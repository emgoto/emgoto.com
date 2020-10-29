import styled from 'styled-components';

import colors from '../../common';
import { Card } from '../../common/styled';

export const BookContainer = styled(Card)`
    display: flex;
`;

export const ImageContainer = styled.div`
    margin-right: 8px;
    margin-bottom: -8px;
    min-width: 96px;
`;

export const InfoContainer = styled.div`
    margin: auto 0;
    margin-left: 8px;
`;

export const BookAndAuthor = styled.div`
    margin-top: 8px;
    color: ${colors.darkGreen};
    font-size: 14px;

    span {
        color: ${colors.white};
    }
`;
