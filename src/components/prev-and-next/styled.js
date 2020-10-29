import styled from 'styled-components';
import colors from '../../common';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;

    div:last-child {
        text-align: right;
        margin-left: 8px;
    }

    @media screen and (max-width: 500px) {
        flex-direction: column;

        div:last-child {
            margin-left: 0;
            margin-top: 8px;
        }
    }
`;

export const PostContainer = styled.div`
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 14px;
    border: 2px solid ${colors.darkGrey};
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;

    @media screen and (max-width: 500px) {
        max-width: 100%;
    }
`;
