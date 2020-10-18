---
title: "Getting started with state management using useReducer and Context"
date: 2020-06-12
tags: ["react"]
emoji: 🔄
coverImage: 'https://images.unsplash.com/photo-1591199611141-cf661190c589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
devArticleId: 353425
--- 

Choosing a state management library for your React app can be tricky. Some of your options include:
* Using React’s `useReducer` hook in combination with React Context
* Going for a longstanding and popular library like [Redux](https://react-redux.js.org/) or [MobX](https://mobx.js.org/README.html)
* Trying something new like [react-sweet-state](https://github.com/atlassian/react-sweet-state) or [Recoil](https://github.com/facebookexperimental/Recoil) (if you're feeling adventurous!)

To help you make a more informed decision, this series aims to give a quick overview of creating a to-do list app using a variety of state management solutions.

In this post we will be using a combination of the `useReducer` hook and React Context to build our example app, as well as a quick detour to take a look at a library called [React Tracked](https://github.com/dai-shi/react-tracked "React Tracked"). 

If you want to follow along, I have created a repository for the example app created in this guide at [react-state-comparison](https://github.com/emgoto/react-state-comparison/tree/master/src/react).

> This post assumes knowledge of how to render functional components in React, as well as a general understanding of how hooks work.

## App functionality and structure

The functionality we will be implementing in this app will include the following:

* Editing the name of the to-do list
* Creating, deleting and editing a task

The structure of the app will look something like this:
```bash
src
  common
    components # component code we can re-use in future posts
  react # the example app we are creating in today's post
    state # where we initialise and manage our state
    components # state-aware components that make use of our common components
```

## Creating our common components
First we'll be creating some components in our `common` folder. These "view" components won’t have any knowledge of what state management library we are using. Their sole purpose will be to render a component, and to use callbacks that we pass in as props. We’re putting them in a common folder so that we can re-use them in future posts in this series.

We’ll need four components:

* `NameView` - a field to let us edit the to-do list’s name
* `CreateTaskView` - a field with a “create” button so we can create a new task
* `TaskView` - a checkbox, name of the task, and a “delete” button for the task
* `TasksView` - loops through and renders all the tasks

As an example, the code for the `Name` component will look like this:
```js
// src/common/components/name

import React from 'react';

const NameView = ({ name, onSetName }) => (
    <input
        type="text"
        defaultValue={name}
        onChange={(event) => onSetName(event.target.value)}
    />
);

export default NameView;
```

Each time we edit the name, we’ll be calling the `onSetName` callback with the current value of the input (accessed through the `event` object).

> In a real-life app, you might think about holding off on making this call until the user has saved the task’s name. You could either have a "save" button for this, or listen for the user to leaving the input field by clicking away or pressing enter.

The code for the other three components follow a similar sort of pattern, which you can check out in the [common/components](https://github.com/emgoto/react-state-comparison/tree/master/src/common/components) folder.

## Defining the shape of our store
Next we should think about how our **store** should look. With local state, your state lives inside of individual React components. In contrast to this, a **store** is a central place where you can put all the state for your app. 

We’ll be storing the name of our to-do list, as well as a tasks map that contains all our tasks mapped against their IDs:
```js
const store = {
  listName: 'To-do list name',
  tasks: {
    '1': {
      name: 'Task name',
      checked: false,
      id: 1,
    }
  }
}
```

## Creating our reducer and actions
A reducer and actions is what we use to modify the data in our **store**.

An **action**'s job is to ask for the store to be modified. It will say:

> “Hey, I want to change the to-do list’s name to be 'Fancy new name'”. 

The **reducer**'s job is to modify the store. The **reducer** will receive that request, and go:

> "Okay, I will change the to-do list's name to be 'Fancy new name'"

### Actions
Each action will have two values:

* An action's `type` -  to update the list’s name you could define the type as `updateListName`
* An action’s `payload` - to update the list's name, the payload would contain "Fancy new name"

Dispatching our `updateListName` action would look something like this:
```js
dispatch({ 
    type: 'updateListName', 
    payload: { name: 'Fancy new name' } 
});
```
### Reducers

A reducer is where we define how we will modify the state using the action’s payload. It’s a function that takes in the current state of the store as its first argument, and the action as its second:
```js
// src/react/state/reducers

export const reducer = (state, action) => {
    const { listName, tasks } = state;
    switch (action.type) {
        case 'updateListName': {
            const { name } = action.payload;
            return { listName: name, tasks };
        }
        default: {
            return state;
        }
    }
};

```
With a switch statement, the reducer will attempt to find a matching case for the action. If the action isn’t defined in the reducer, we would enter the `default` case and return the `state` object unchanged.

If it is defined, we will go ahead and return a modified version of the `state` object. In our case, we would change the `listName` value. 

A super-important thing to note here is that we **never directly modify the state object that we receive**. e.g. Don’t do this:
```js
state.listName = 'New list name';
```
We need our app to re-render when values in our store are changed, but if we directly modify the state object this won’t happen. We need to make sure that we return new objects. If you don’t want to do this manually, there are libraries like [immer](https://github.com/immerjs/immer) that will do this safely for you.

## Creating and initialising our store

Now that we’ve defined our reducer and actions, we need to create our store using React Context and `useReducer`:
```js
// src/react/state/store

import React, { createContext, useReducer } from 'react';
import { reducer } from '../reducers';
import { initialState } from '../../../common/mocks';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <TasksContext.Provider value={{ state, dispatch }}>
            {children}
        </TasksContext.Provider>
    );
};

```
The `useReducer` hook allows us to create a reducer using the reducer function we defined earlier. We also pass in an initial state object, which might look something like this:
```js
const initialState = {
  listName: 'My new list',
  tasks: {},
};
```
When we wrap the Provider around our app, any component will be able to access the `state` object to render what it needs, as well as the `dispatch` function to dispatch actions as the user interacts with the UI.

## Wrapping our app with the Provider
We need to create our React app in our `src/react/components` folder, and wrap it in our new provider:
```js
// src/react/components
import React from 'react';

import { TasksProvider } from '../state/store';

import Name from './name';
import Tasks from './tasks';
import CreateTask from './create-task';

const ReactApp = () => (
    <>
        <h2>React with useReducer + Context</h2>
        <TasksProvider>
            <Name />
            <Tasks />
            <CreateTask />
        </TasksProvider>
    </>
);

export default ReactApp;

```

You can see all the state-aware components we are using [here](https://github.com/emgoto/react-state-comparison/tree/master/src/react/components) and I'll be covering the `Name` component below.

## Accessing data and dispatching actions
Using our `NameView` component that we created earlier, we'll be re-using it to create our `Name` component. It can access values from Context using the `useContext` hook:
```js
import React, { useContext } from 'react';
import NameView from '../../../common/components/name';
import { TasksContext } from '../../state/store';

const Name = () => {
    const {
        dispatch,
        state: { listName }
    } = useContext(TasksContext);

    const onSetName = (name) =>
        dispatch({ type: 'updateListName', payload: { name } });

    return <NameView name={name} onSetName={onSetName} />;
};

export default Name;
```

We can use the `state` value to render our list’s name, and the `dispatch` function to dispatch an action when the name is edited. And then our reducer will update the store. And it’s as simple as that!

## The problem with React Context
Unfortunately, with this simplicity comes a catch. Using React Context will cause re-renders for any components that are using the `useContext` hook. In our example, we'll have a `useContext` hook in both the `Name` and `Tasks` components. If we modify the list’s name, it causes the `Tasks` component to re-render, and vice versa. 

This won’t pose any performance issues for our small to-do list app, but lots of re-renders isn’t very good for performance as your app gets bigger. If you want the ease of use of React Context and useReducer without the re-render issues, there is a workaround library that you can use instead.

## Replacing React Context with React Tracked
[React Tracked](https://github.com/dai-shi/react-tracked) is a super small ([1.6kB](https://bundlephobia.com/result?p=react-tracked@1.4.0)) library that acts as a wrapper on top of React Context.

Your reducer and actions file can stay the same, but you’ll need to replace your `store` file with this:
```js
//src/react-tracked/state/store

import React, { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { reducer } from '../reducers';

const useValue = ({ reducer, initialState }) =>
    useReducer(reducer, initialState);

const { Provider, useTracked, useTrackedState, useUpdate } = createContainer(
    useValue
);

export const TasksProvider = ({ children, initialState }) => (
    <Provider reducer={reducer} initialState={initialState}>
        {children}
    </Provider>
);

export { useTracked, useTrackedState, useUpdate };

```

There are three hooks you can use to access your state and dispatch values:

```js
const [state, dispatch] = useTracked();
const dispatch = useUpdate();
const state = useTrackedState();
```

And that’s the only difference! Now if you edit the name of your list, it won’t cause the tasks to re-render.

## Conclusion
Using `useReducer` in conjunction with React Context is a great way to quickly get started with managing your state. However re-rendering can become a problem when using Context. If you’re looking for a quick fix, React Tracked is a neat little library that you can use instead. 

To check out any of the code that we’ve covered today, you can head to [react-state-comparison](https://github.com/emgoto/react-state-comparison) to see the full examples. You can also take a sneak peek at the Redux example app we’ll be going through next week! If you have any questions, or a suggestion for a state management library that I should look into, please let me know.

Thanks for reading!
