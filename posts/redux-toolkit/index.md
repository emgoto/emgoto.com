---
title: "Getting started with state management using Redux Toolkit"
date: 2020-06-26
category: "blog"
tags: ["react"]
emoji: 🔨
coverImage: 'https://images.unsplash.com/photo-1592157874621-0a8033a473b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80'
devArticleId: 368025
--- 

[Redux Toolkit](https://redux-toolkit.js.org/) is a library that provides helper functions to simplify how you use Redux. It was created in response to criticisms that Redux required a lot of boilerplate code and was confusing to get set up. 

My previous post in this series explored how [state management works with Redux](/redux-state-management). This post will explore how Redux Toolkit changes things with `createSlice`, as well as looking into some of the additional features it provides like `createSelector` and `redux-thunk`.

If you want to follow along, I have created a repository for the example app created in this guide at [react-state-comparison](https://github.com/emgoto/react-state-comparison/tree/master/src/redux-toolkit).

> This post assumes knowledge of how to render components in React, as well as a general understanding of how hooks work. It also assumes you have a basic understanding of Redux, as we will be making some comparisons to it in this post.

## Getting started

To get started with Redux Toolkit, you’ll need to install these libraries using your package manager of choice:
```bash
npm install redux react-redux @reduxjs/toolkit
yarn add redux react-redux @reduxjs/toolkit
```
## A brief overview of terms

There are a couple of terms that are important when managing state with React and Redux:
* A **store** is a central location where we store all the state for our app.
* An **action** is in charge of telling the reducer to modify the store. We dispatch these actions from the UI. 
* We also have **action creators** which are functions that create actions for us
* The **reducer** handles doing what the action tells it to do (i.e. making the necessary modifications to the store).

## Create reducers and actions with createSlice

The first improvement that Redux Toolkit seeks to make is to reduce the amount of code you need to create your actions and reducers.

With plain Redux, here is the code that we would use to modify the name of our to-do list:

```js
// Action
export const UPDATE_LIST_NAME = 'UPDATE_LIST_NAME';

// Action creator
export const updateListName = (name) => ({
    type: UPDATE_LIST_NAME,
    payload: { name }
});

// Reducer
const reducer = (state = 'My to-do list', action) => {
    switch (action.type) {
        case UPDATE_LIST_NAME: {
            const { name } = action.payload;
            return name;
        }

        default: {
            return state;
        }
    }
};

export default reducer;
```

With `createSlice`, it looks like this:
```js
// src/redux-toolkit/state/reducers/list-name
import { createSlice } from '@reduxjs/toolkit';

const listNameSlice = createSlice({
    name: 'listName',
    initialState: 'My to-do list',
    reducers: {
        updateListName: (state, action) => {
            const { name } = action.payload;
            return name;
        }
    }
});

export const {
    actions: { updateListName },
} = listNameSlice;

export default listNameSlice.reducer;
```

With `createSlice`, we only need to define our reducer and our actions will be created for us! It helps to simplify the amount of boilerplate code developers have to write.

### You no longer have to worry about mutating state
With plain Redux, you have to be careful not to directly mutate the state, as it will cause unexpected behaviours. For instance, to add a new task to your store you would have to do something like this:

```js
{ ...tasks, [id]: { id, name, checked: false } };
```

With `createSlice`, we can now directly mutate the state:
```js
tasks[id] = { id, name, checked: false };
```

> Behind-the-scenes it's using the [immer](https://github.com/immerjs/immer) library, so we're not _actually_ mutating the state.

I really love this feature, since it makes the reducer code easier to understand, and it also removes the responsibility from the developer to have to learn how to use libraries like immer.

## Creating and initialising our store 
After creating a reducer, you can set up your store using it. Here we’ll be using the `configureStore` function from the toolkit to do so:
```js
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers';

const store = configureStore({
    reducer
});

export const TasksProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
);
```

What differentiates `configureStore` from Redux’s `createStore` is that it provides a few extra defaults out of the box. This helps you get started quicker when setting up a new app. I’ll be touching on one of the features it provides (`redux-thunk`) later in this post.

### configureStore can combine reducers
Redux provides a `combineReducers()` function to split your reducers into multiple files:
```js
import { combineReducers } from 'redux';

import listNameReducer from './list-name';
import tasksReducer from './tasks';

const reducer = combineReducers(listNameReducer, tasksReducer);

export default reducer;
```

With `configureStore`, if you pass in multiple reducers it will do this `combineReducer` step for you:

```js
const store = configureStore({
    reducer: {
		listName: listNameReducer,
		tasks: tasksReducer 
	}
});
```

## Finishing it off
Beyond this point, our app is otherwise identical to how you would set up a plain Redux app using hooks. To summarise, we first need to wrap our app in the `TasksProvider` that we created:
```js
// src/redux-toolkit/components
const ReduxToolkitApp = () => (
    <>
        <h2>Redux Toolkit</h2>
        <TasksProvider>
            <Name />
            <Tasks />
            <CreateTask />
        </TasksProvider>
    </>
);
```

Create and use selectors with `useSelector`:
```js
// src/redux-toolkit/state/selectors
export const tasksSelector = (state) => state.tasks;

// src/redux-toolkit/components/tasks
const tasks = useSelector(tasksSelector);
```

And dispatch actions to modify the state with `useDispatch`:
```js
// src/redux-toolkit/components/name
const dispatch = useDispatch();
dispatch(updateListName({ name }));
```

Now let's jump into a couple of other features that React Toolkit provides.

## createSelector
Redux Toolkit lets us create selectors using `createSelector`. This is a pre-existing feature, and can already be used in any Redux app by adding the [reselect](https://github.com/reduxjs/reselect) library. Redux Toolkit has taken the step of including it by default.

### When do we need createSelector?
With selectors, the component will only re-render when what the selector is returning has changed.

For instance, our `Tasks` component will only re-render when `state.tasks` has changed. 

```js
// src/redux-toolkit/state/selectors
export const tasksSelector = (state) => state.tasks;

// src/components/redux-toolkit/components/tasks
const Tasks = () => {
    const tasks = useSelector(tasksSelector);

    return <TasksView Task={Task} tasks={tasks} />;
};
```

However, each time _any_ part of the state changes, the `tasksSelector` will re-run, and calculate what it needs to return. This could cause performance problems if we had a huge list of tasks, and our selector was doing some sort of calculation (like filtering on whether a task was done or not).

`createSelector` lets you create a **memoized** selector. What this means is that it will cache the result of its calculation, and only re-calculate once things have changed. In our case, we could create a selector that only re-calculates once `state.tasks` has changed:
```js
import { createSelector } from '@reduxjs/toolkit';

const completedTasksSelector = createSelector(
  state => state.tasks,
  tasks => tasks.filter(task => task.checked)
)
```

To learn more about createSelector I’d recommend you to check out the readme on the [reselect](https://github.com/reduxjs/reselect) library.

## Redux middleware and redux-thunk
The final thing we’ll be touching on in this post is **Redux middleware**. These are third-party libraries that you can add on to your Redux setup to add extra functionality. When using Redux Toolkit’s `configureStore` API, we will get a couple installed out of the box. One of them is `redux-thunk`.

### When do we need redux-thunk?
A common use-case for `redux-thunk` is when making API calls. Imagine we stored our newly created tasks in the backend. Our flow would look something like this:

* User types and then presses the “create task” button
* We call the create task endpoint
* We wait for the endpoint to return that the task has successfully been created
* We show the newly created task at the bottom of the list

There are a couple of ways we could tackle this scenario.

### Option 1: Let the UI call the endpoint
We could let the UI call the task creation endpoint, and only when it successfully  returns, we call our `createTask` action:
```js
// component code
const dispatch = useDispatch();

createTaskAPI(data).then((newTask) => {
	dispatch(createTask(newTask));
});
```

However generally you want to keep your component code focused on rendering things, and move code that interacts with your APIs elsewhere.

So it would be nice if the UI could just do this:
```js
dispatch(createTask(data));
```

And then inside the action creator, we wait for the API to return before returning an action:
```js
const createTask = async (data) => {
    const newTask = await createTaskAPI(data);
    return { type: 'createTask', payload: newTask };
}
```

However the `dispatch` function is expecting an action - we can’t pass in an async function!

### Option 2: Pass in a dispatch argument
The workaround for this is that we pass in the `dispatch` function as an argument, and then wait to dispatch the action until the endpoint has returned:

```js
// component code
const dispatch = useDispatch();
createTask(dispatch, data);

// action creator
const createTask = async (dispatch, data) => {
    const newTask = await createTaskAPI(data);
    dispatch({ type: 'createTask', payload: newTask });
}
```

The problem with this approach is that your component code now has to know that for certain actions it does this:

```js
action(dispatch, data);
```

But then for other actions it does this:
```js
dispatch(action(data))
```


### Option 3: Use redux-thunk

`redux-thunk` simplifies this by giving us access to the `dispatch` function inside the action creator:

```js
// component code
const dispatch = useDispatch();
dispatch(createTask(data));

// action creator
const createTask = (data) => {
	return async (dispatch) => {
        const newTask = await createTaskAPI(data);
		dispatch({ type: 'createTask', payload: newTask });
	}   
}
```

Now our component code no longer has to know whether it needs to pass in `dispatch` as an argument or not, and can always just wrap actions in the `dispatch` function!

Since this middleware is so useful, it has been included by default when you set up your store using `configureStore()`.

## Conclusion
Redux Toolkit is a great library for simplifying the Redux code you write. By default it also provides useful tools that many codebases will need, like `createSelector` and `redux-thunk`. If you’re a developer working on a new codebase, I’d recommend jumping straight into using this toolkit. 

Unfortunately, for developers working on older and larger codebases, you could end up having to wrap your head around multiple ways of writing Redux:
* Old Redux with `connect()`
* New Redux with hooks like `useSelector()`
* New-new Redux with Redux Toolkit

I could see this getting confusing and hard to manage, especially for developers who are new to the codebase. It’s also interesting that the toolkit lives in its own separate library, instead of being part of the main react-redux library. I understand there may be some good reasons behind it, but I think it could confuse developers new to Redux into thinking it was optional, when I think it really should become compulsory and the new standard. 

Nevertheless I think this is a great step forward in simplifying Redux, and I’m interested to see where things goes in the future.

Thanks for reading!