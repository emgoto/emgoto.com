import styled from 'styled-components';

import colors from '../../common';

export const Button = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    color: ${colors.white};
    border-radius: 4px;
    padding: 8px;

    &:hover {
        cursor: pointer;
        opacity: 0.9;
        background-color: ${colors.darkGrey};
    }
`;

export const Text = styled.div`
    padding-left: 8px;
    padding-bottom: 4px;
`;

export const Description = styled.div`
    font-size: 14px;
    color: ${colors.offWhite};
`;

export const MinWidth = styled.div`
    min-width: 48px;
    padding-top: 8px;
    padding-left: 8px;
`;

export const Title = styled.div`
  a {
    color: ${colors.white};
  }
  
  a:hover {
        cursor: pointer;
        color: white;
    }
  }
`;
