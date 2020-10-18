import styled from 'styled-components';

import colors from '../../common';

export const Title = styled.div`
    margin-bottom: -4px;
`;

export const Emoji = styled.div`
    margin: auto 0;
    padding: 8px 16px;
    font-size: 20px;
`;

export const Button = styled.div`
    margin: 8px 0px;
    padding: 8px 0;
    display: flex;
    align-items: center
    height: 32px;
    color: ${colors.white};
    border-radius: 4px;
 
	&:hover {
        cursor: pointer;
        opacity: 0.9;
        background-color: ${colors.darkGrey};
    }

    li {
        list-style: none;
    }
}
`;

export const Date = styled.div`
    color: ${colors.darkGreen};
    font-size: 12px;
`;
