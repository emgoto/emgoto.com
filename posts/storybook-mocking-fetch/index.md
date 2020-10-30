---
title: "Mocking fetch requests in Storybook"
date: 2020-06-01
tags: ["storybook", "react"]
emoji: 🐕
coverImage: ''
--- 

Install [fetch-mock](https://www.npmjs.com/package/fetch-mock):
```bash
npm i --save-dev fetch-mock
```
And then mock your endpoint in your storybook file:
```js
import React from 'react';
import fetchMock from 'fetch-mock';

import App from './index';

const mockTask = {
    name: 'Hello world',
}

export const Example = () => {
    fetchMock.restore().mock('/tasks', [mockTask]);
    return <App />;
}

export default { title: 'App' };
```
If you are on a version of Storybook older than 5.2, you will need to make use of the `storiesOf` API instead:
```js
import { storiesOf } from '@storybook/react';

storiesOf('App', module).add('example', () => {
    fetchMock.restore().mock('/tasks', [mockTask]);
    return <App />;
});

```
