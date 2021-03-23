import React from 'react';
import styled from 'styled-components';

import colors from '../../common';

const TopBar = styled.div`
    height: ${(props) => props.scale * 22}px;
    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
    border-radius: ${(props) => props.scale * 4}px
        ${(props) => props.scale * 4}px 0 0;
    width: 100%;
`;

const CirclesContainer = styled.div`
    display: flex;
    padding-left: ${(props) => props.scale * 3}px;
`;

const Circle = styled.div`
    border-radius: ${(props) => props.scale * 50}px;
    background-color: ${(props) => props.bgColor};
    width: ${(props) => props.scale * 12}px;
    height: ${(props) => props.scale * 12}px;
    margin: ${(props) => props.scale * 5}px
        ${(props) => props.scale * 4}px;
`;

const TerminalBar = ({ scale }) => (
    <TopBar scale={scale}>
        <CirclesContainer scale={scale}>
            <Circle scale={scale} bgColor={colors.darkGreen} />
            <Circle scale={scale} bgColor={colors.blue} />
            <Circle scale={scale} bgColor={colors.purple} />
        </CirclesContainer>
    </TopBar>
);

TerminalBar.defaultProps = {
    scale: 1,
};

export default TerminalBar;
