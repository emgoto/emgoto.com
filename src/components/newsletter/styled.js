import styled from 'styled-components';
import colors from '../../common';

export const Container = styled.div`
    background-color: ${colors.darkGrey};
    padding: 16px;
    border-left: 8px solid ${colors.blue};
    border-radius: 0 4px 4px 0;
    font-size: 14px;
    max-width: 400px;
    margin: 0 auto;
    margin-top: 32px;
    margin-bottom: 16px;

    h4 {
        margin-top: 0;
        margin-bottom: 16px;
    }

    form {
        margin-top: 16px;
    }

    label {
        display: none;
    }

    input[type='email'] {
        color: ${colors.white};
        background: ${colors.grey};
        border: 1px solid ${colors.darkGrey};
        padding: 8px;
        font-size: 14px;
        border-radius: 4px;
        margin-right: 8px;
        margin-bottom: 4px;
    }

    input[type='submit'] {
        color: ${colors.white};
        padding: 8px;
        border-radius: 4px;
        font-size: 14px;
        background-color: ${colors.grey};
        border: none;

        &:hover {
            color: ${colors.lightGrey};
            background-color: ${colors.blue};
            cursor: pointer;
        }
    }
`;
