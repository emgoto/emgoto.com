import styled from 'styled-components';
import colors from '../../common';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;

    div:last-child {
        text-align: right;
    }
`;

export const PostContainer = styled.div`
    border-radius: 4px;
    background-color: ${colors.darkGrey};
    padding: 8px;
    font-size: 14px;

    width: 100%;
    max-width: 300px;
`;
