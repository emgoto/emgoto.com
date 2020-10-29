import styled from 'styled-components';

import colors from '../../common';
import { Card } from '../../common/styled';

export const Title = styled.div`
    margin-bottom: -4px;
`;

export const Emoji = styled.div`
    margin: auto 0;
    padding: 0px 16px;
    font-size: 20px;
`;

export const Button = styled(Card)`
    padding-left: 8px;
    display: flex;
    align-items: center
 
    li {
        list-style: none;
    }
}
`;

export const Date = styled.div`
    color: ${colors.darkGreen};
    font-size: 12px;
`;
