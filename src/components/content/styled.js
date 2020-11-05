import styled from 'styled-components';
import colors from '../../common';

export const Container = styled.div`
    font-size: 0.9rem;
    display: flex;
    flex-wrap: wrap;
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
    color: ${colors.darkGreen};
    margin-right: 16px;
    margin-bottom: 8px;
`;

export const Interpunct = styled.div`
    padding: 0 8px;
`;

export const Socials = styled.div`
    display: flex;
`;

export const IconContainer = styled.div`
    svg {
        display: inline-block;
        margin-right: 8px;
        width: 22px;
        height: 22px;
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
