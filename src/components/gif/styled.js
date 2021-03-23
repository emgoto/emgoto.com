import styled from 'styled-components';

export const Container = styled.div`
    text-align: center;
    margin-bottom: 8px;

    @media screen and (min-width: 520px) {
        height: ${(props) => props.height};
    }

    img {
        border-radius: 8px;
        max-width: 100%;
    }
`;
