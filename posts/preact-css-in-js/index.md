---
title: "Using CSS-in-JS with Preact"
date: 2020-08-16
tags: ["preact"]
category: "snippets"
emoji: 👘
coverImage: 'https://images.unsplash.com/photo-1596206494156-2ef1898d58a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
devArticleId: 428993
---

The two most popular CSS-in-JS libraries, [styled-components](https://github.com/styled-components/styled-components) and [Emotion](https://github.com/emotion-js/emotion), don’t support Preact out of the box. However there is an easy workaround.

Add these aliases to your `webpack.config.js` file:

```js
module.exports = {
    resolve: {
        alias: {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
        },
    },
};
```

> Adding these aliases allows you to use other libraries intended for React too!

And if you’re using Storybook, you’ll need to add the same alias to your `.storybook/main.js` file:

```js
module.exports = {
	stories: ['../app/javascript/**/story.tsx'],
	webpackFinal: async config => {
		config.resolve.alias = Object.assign({}, config.resolve.alias, {
			react: "preact/compat",
			'react-dom': 'preact/compat'
		})
	    return config;
	  },
};
```

After this you can install your preferred package:
```bash
npm i @emotion/styled
# OR
npm i styled-components
```

And use either styled-components or Emotion without any problems:
```js
import styled from '@emotion/styled'; 
// OR
import styled from 'styled-components';

export const Container = styled.div`
  background-color: pink;
`;
```
