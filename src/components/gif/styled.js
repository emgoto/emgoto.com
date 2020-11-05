import styled from 'styled-components';

export const Container = styled.div`
    text-align: center;
    margin-bottom: 8px;

    @media screen and (min-width: 500px) {
        height: ${props => props.height};
    }

    img {
        border-radius: 8px;

        @media screen and (max-width: 499px) {
            width: 100%;
        }
    }
`;
