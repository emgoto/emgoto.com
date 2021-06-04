import styled from 'styled-components';

export const Container = styled.div`
    text-align: center;
    margin-bottom: 8px;

    // Need to do this to prevent jank as GIF loads into page
    @media screen and (min-width: 700px) {
        height: ${(props) => props.height};
    }

    img {
        border-radius: 8px;
        max-width: 100%;
    }
`;
