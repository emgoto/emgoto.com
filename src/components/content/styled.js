import styled from 'styled-components';
import colors from '../../common';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const TagContainer = styled.div`
    border-radius: 2px;
    background-color: ${colors.darkGrey};
    color: ${colors.white};
    margin: 0 2px;
    padding: 0 4px;

    &:hover {
        background-color: ${colors.yellow};
        color: ${colors.darkGrey};
    }
`;

export const DateAndTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    font-size: 0.9rem;
    color: ${colors.darkGreen};
`;

export const Interpunct = styled.div`
    padding: 0 8px;
`;

export const IconContainer = styled.div`
    svg {
        display: inline-block;
        margin-right: 8px;
    }

    a {
        color: ${colors.lightGrey};
    }

    div {
        display: flex;
    }

    &:hover {
        svg > * {
            fill: ${colors.white};
        }

        a {
            color: ${colors.green};
        }

        a.comment-link {
            color: ${colors.purple};
        }
    }
`;
