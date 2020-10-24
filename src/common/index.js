import { createGlobalStyle } from 'styled-components';

// https://github.com/voronianski/oceanic-next-color-scheme
export const yellow = '#FAC863';
export const green = '#99C794';
export const darkGreen = '#5FB3B3';
export const blue = '#6699CC';
export const purple = '#C594C5';
export const white = '#D8DEE9';
export const offWhite = '#b9cbf0';
export const lightGrey = '#2c3947';

// From https://cocopon.github.io/iceberg.vim/
export const grey = '#26293A';
export const darkGrey = '#1F2233';
export const black = '#161822';

export default {
    yellow,
    green,
    darkGreen,
    blue,
    purple,
    white,
    offWhite,
    lightGrey,
    grey,
    darkGrey,
    black,
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --headerHeight: 112px;
  }

  body {
    background-color: ${darkGrey};
    color: ${white};
    margin: 0px;
    font-family: 'Open Sans', sans-serif;
    line-height: 1.6;
    text-rendering: optimizeLegibility;
    font-size: 1.1rem;
  }

  a {
    text-decoration: none;
    color: ${blue};
  }

  a:hover {
    color: ${white};
  }

  h2 a{
    color: inherit;
  }

  h2 a:hover{
    color: inherit;
  }

  b, strong {
    color:  ${purple};
  }

  i, em {
    color: ${offWhite}
  }

  h1 {
    margin-top: -4px;
    margin-bottom: 8px;
    font-weight: normal;
    letter-spacing: 1px;
  }

  h2 {
    font-weight: normal;
    margin-top: calc(var(headerHeight) - 24px);
    padding-top: var(headerHeight);
    margin-bottom: 8px;
    color: ${green};
    letter-spacing: 1px;
  }

  h3 {
    font-weight: normal;
    margin-bottom: 8px;
    letter-spacing: 1px;
    color: ${darkGreen};
  }

  blockquote {
    border-left: 2px solid ${darkGreen};
    padding-left: 8px;
  }

  .gatsby-resp-image-image {
    border-radius: 8px;
    box-shadow: none !important;
  }

  figcaption {
    text-align: center;
    padding-top: 4px;
    font-size: 14px;
  }

  h2 {
    &:hover > .anchor.after > svg {
      visibility: visible;
      fill: ${offWhite};
      margin-left: 8px;
    }

    .anchor.after > svg {
      visibility: hidden;
    }
  }

  .gatsby-remark-code-title {
    color: ${black};
    background: -webkit-linear-gradient(top,#ebebeb,#d5d5d5);
    font-size: 12px;
    padding: 2px 14px;
    margin-top: 24px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    font-family: "Fira Code", Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace !important;
  }

  .gatsby-remark-code-title + .gatsby-highlight > pre {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    margin-top: 0 !important;
  }

  .gatsby-highlight-code-line {
    margin: 0 -14px;
    padding: 0 14px;
  }

  .gatsby-resp-image-background-image {
    border-radius: 8px;
  }

  hr {
    color: ${lightGrey};
  }
`;
