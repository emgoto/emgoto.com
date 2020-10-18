---
title: "Setting up Storybook for Preact with TypeScript"
date: 2020-03-29
tags: ["preact"]
emoji: 📖
coverImage: 'https://images.unsplash.com/photo-1517770413964-df8ca61194a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
devArticleId: 294275
--- 

[Storybook](https://storybook.js.org/) is a useful tool for visualising what your app's front-end components will look like across different scenarios. 

This guide will cover how you can add Storybook to your TypeScript Preact app. 

## Creating a Preact app using TypeScript

If you don't already have a Preact app using TypeScript, you can easily create one using the [preact-cli](https://github.com/preactjs/preact-cli) tool:

```bash
npm install -g preact-cli
preact create typescript app-name-here
```

Remember to `cd` into your app's folder after you've created it!

## Installing and setting up Storybook
Install Storybook for Preact:

```bash
npm install @storybook/preact --save-dev
```

Then create a `.storybook/main.js` file, and add the following:

```js
module.exports = {
    stories: ['../src/**/story.tsx'],
    webpackFinal: async config => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [{
                loader: require.resolve('ts-loader'),
            }],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
    },
};
```

> Note that you will have to modify the above code if you are not using `ts-loader`

Then you can add a new script to your `package.json` file:

```json
"scripts": {
    "storybook": "start-storybook"
}
```

## (Optional) delete the declaration.d.ts file

If you created your app using the preact-cli tool, I found that deleting the `declaration.d.ts` file in your `src` folder was required to get Storybook working. I'm not too sure why, but give it a go if things are breaking for you.

## Write your first story

Create a file called `story.tsx` and import in one of your components:

```jsx
import { h } from 'preact';
import Component from './index';

export default { title: 'Component' }

export const coolComponent = () => <Component/>;
```

Now if you run the command:

```bash
npm run storybook
```

You will be able to see your storybooks in action.

Happy coding!

## References

[Storybook for Preact](https://storybook.js.org/docs/guides/guide-preact/)
