---
title: "Getting started with state management using react-sweet-state"
date: 2020-07-03
tags: ["react"]
emoji: 🍭
coverImage: 'https://images.unsplash.com/photo-1563262924-641a8b3d397f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
devArticleId: 380451
--- 

Compared to other state management libraries, [react-sweet-state](https://github.com/atlassian/react-sweet-state) is a relatively obscure one. However it is what I use day-to-day in my job at Atlassian - and I think it's pretty cool! Similar to my previous posts in this series, I will be covering some of the basics you need to get started with state management using sweet-state.

If you want to see a full code example, I have created a repository for the to-do list app we refer to in this post at [react-state-comparison](https://github.com/emgoto/react-state-comparison/tree/master/src/react-sweet-state).

> This post assumes a knowledge of how to render components in React, as well as a general understanding of how hooks work. There will be some comparisons made to Redux, but knowledge of Redux is not required to read this post.

## Why sweet-state?

sweet-state was originally created to meet the state management needs of Jira (one of Atlassian’s products). I’d recommend checking out Alberto’s post on the [creation of react-sweet-state](https://medium.com/@albertogasparin/react-sweet-state-redux-and-context-the-yummy-parts-f55f49503635) for more of its backstory.

One of its benefits is that **you don’t need to wrap your app in a provider**. This works well for a codebase like Jira’s, which is made up of many small apps all managing their state separately. When you need to share state between two apps, it’s easier when you don’t need to wrap your entire codebase in a provider.

## Installing react-sweet-state
Use your package manager of choice to install `react-sweet-state`:
```bash
npm i react-sweet-state
yarn add react-sweet-state
```
## Getting up to speed
There are a couple of state management concepts that we will be referring to in this post:

* A **store** is a central location where we store all the state for our app.
* An **action** is in charge of modifying the store. We dispatch these actions from the UI.
* A **selector** returns a specific chunk of our store to the UI.

The example app we will be referring to today is a to-do list app. The shape of its store will look like this:

```js
const initialState = {
  listName: 'My new list', // <- the name of our to-do list
  tasks: {} // <- all our to-do list items live inside this object
};
```

## Creating your actions
### Using setState
To modify the name of our to-do list, we would create an action that looks like this:
```js
const updateListName = (listName) => ({ setState }) => {
    setState({ listName });
}
```

You’ll notice that the action is a **function that returns another function**. When we call this action from our UI, we will only need to call the outer function:
```js
updateListName('New name');
```

Behind the scenes, sweet-state will handle providing the `setState` parameter for us!

#### Understanding setState

Our store contains both `tasks` and `listName`, but when we call `setState`, we only need to pass in the list's name:

```js
setState({ listName })
```

This is because when you call `setState`, it will do a shallow merge with what is currently in your store. i.e. like this:

```js
{ ...state, listName }
```

> This is the same as how React's `setState` function works

### Using getState
There will be times where you need to first `get` what is currently stored in your state. We can do this with `getState()`:
```js
// src/react-sweet-state/state/actions/tasks

const updateTaskName = (id, name) => ({ getState, setState }) => {
    const { tasks } = getState();
    const updatedTask = { ...tasks[id], name };
    setState({ tasks: { ...tasks, [id]: updatedTask } });
};
```

In the above example we are getting the `tasks` data from our store with `getState()`, and then updating our store with the newly created `updatedTask` object.

When setting state, you have to make sure to **never directly modify the state object that you receive**. 

This means we can’t do this:
```js
const { tasks } = getState();
tasks[id].name = name
```

We want our app to re-render when values in our store are changed, but if we directly edit the state object this won’t happen.

> If things are getting complex, you can also check out libraries like [immer](https://github.com/immerjs/immer) to help you modify your state

## Creating your store
Our actions will be changing the data stored in our **store**, so we’ll need to make sure we’ve created one. To create our store, we pass in the initial state, the actions that we’ve defined, and a name for our store.
```js
// src/react-sweet-state/state/store

import { createStore } from 'react-sweet-state';

export const Store = createStore({
    initialState,
    actions: {
        updateListName,
        ...taskActions
    },
    name: 'TasksStore'
});
```

> Fun fact: we can use the [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) browser extension when debugging sweet-state! The name we choose for our store will be used to identify it in there

## Accessing selectors using createHook
Selectors allow the UI to grab a specific chunk of the store. We can create them using `createHook`:
```js
import { createHook } from 'react-sweet-state';

export const useTasks = createHook(Store, {
    selector: state => state.tasks
});

```
Our newly created `useTasks` hook will return an array. The **first** item in this array is the data that our selector is returning. In our UI code, it would be used like this:
```js
const [tasks] = useTasks();
```

## Accessing actions using createHook
The **second** item returned in our array from `useTasks()` is an object containing our actions. For instance our `updateTaskName` action can be accessed like this:
```js
const [tasks, { updateTaskName }] = useTasks();

updateTaskName(taskId, 'new task name');
```

### Creating a hook without a selector
You may have a scenario where your component only needs to access some actions, and doesn’t need any data. In this case, you can pass in a `null` selector to `createHook`:
```js
export const useTaskActions = createHook(Store, {
    selector: null
});
```

When you make use of this new hook, make sure to ignore the first element in the array (as it will be `null`):
```js
const [, { updateTaskName, deleteTask }] = useTaskActions();
```

## Conclusion
With a store, selectors, and actions, you'll be all set up to do state management with sweet-state! For more advanced use-cases, I encourage you to check out the [sweet-state docs](https://atlassian.github.io/react-sweet-state/#/).

### Should I use sweet-state?

As we wrap up this post, it is worth pointing out that sweet-state is _tiny_ compared to a giant like Redux (350 Github stars vs 19k for [react-redux](https://github.com/reduxjs/react-redux)). When a library is popular, it's going to be a lot easier to find answers on Google. The chance of it being abandoned is lower too.

Even though sweet-state doesn't seem that popular, it is widely used within Jira (and so I think less likely to be abandoned). Hopefully posts like this one will make the library a bit more accessible too. It would be great to see sweet-state receive a bit more love in the React community!

If you think sweet-state might work for you, I’d encourage you to give it a go in your next React app, and I'd love to hear from you if you have any questions about it.

Thanks for reading!