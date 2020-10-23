import styled from 'styled-components';
import colors from '../../common';

export const Form = styled.form`
    display: flex;
    margin-bottom: 8px;

    &:focus-within {
        outline: auto;
    }
`;

export const Input = styled.input`
    width: 100%;
    height: 40px;
    font-size: 16px;
    border-radius: 0 8px 8px 0;
    color: ${colors.white};
    background-color: ${colors.darkGrey};
    padding: 8px;
    padding-left: 0px;
    box-sizing: border-box;
    border: none;
    box-shadow: none;

    outline: 0;
`;

export const Icon = styled.div`
    width: 40px;
    height: 40px;
    padding: 8px 12px;
    box-sizing: border-box;
    border-radius: 8px 0 0 8px;
    border: none;
    color: ${colors.white};
    background-color: ${colors.darkGrey};
`;
