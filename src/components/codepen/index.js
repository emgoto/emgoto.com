import React from 'react';

// Thanks to https://github.com/octahedroid/gatsby-remark-codepen/blob/master/index.js
const Codepen = ({ id }) => (
    <iframe
        height="400"
        scrolling="no"
        src={`//codepen.io/emgoto/embed/preview/${id}/?height=400&theme-id=dark&default-tab=js`}
        frameborder="no"
        title="codepen embed"
        allowtransparency="true"
        allowfullscreen="true"
        style={{ width: '100%' }}
    />
);

export default Codepen;
