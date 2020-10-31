import styled from 'styled-components';
import colors from '../../common';

export const TagButton = styled.button`
    border: 2px solid ${colors.darkGrey};
    color: ${props =>
        props.isSelected ? `${colors.blue}` : `${colors.white}`};
    background-color: ${props =>
        props.isSelected ? `${colors.darkGrey}` : 'transparent'};
    padding: 6px 8px 8px 8px;
    border-radius: 4px;
    margin-right: 8px;
    font-size: 16px;

    &:hover {
        background-color: ${colors.darkGrey};
        cursor: pointer;
    }
`;

export const TagsContainer = styled.div`
    display: flex;

    &:last-child {
        margin: 0;
    }

    margin-bottom: 16px;
`;
