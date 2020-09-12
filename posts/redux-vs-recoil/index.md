---
title: "Redux vs Recoil: which should you use?"
date: 2020-07-11
category: "blog"
tags: ["react"]
emoji: 🐍
coverImage: 'https://images.unsplash.com/photo-1498855926480-d98e83099315?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
devArticleId: 391961
--- 

Facebook recently announced a new state management library for React called [Recoil](https://github.com/facebookexperimental/Recoil). Even though it’s still at an early, experimental phase it has received a lot of hype with 8000+ stars on Github.

With [Redux](https://github.com/reduxjs/react-redux) being the most popular state management library to use for React, it’s natural to want to make the comparison with Recoil - when does it make sense to use one over the other?

## Stores vs Atoms
In Redux, we have the concept of a centralised **store** where all the data for our app lives. 

In a simple to-do list example, your store would look something like this:

```js
{
    listName: 'My cool to-do list',
    tasks: {
        '1': {
            name: 'My first task',
        }
    }
}
```

Recoil instead splits your state into individual **atoms**. You would have one atom for `listName`, and another for `tasks`. Here’s how you would create the `atom` for your tasks (taken from [the Recoil docs](https://recoiljs.org/docs/basic-tutorial/atoms)):

```js
const todoListState = atom({
    key: 'todoListState',
    default: [],
});
```

As I was watching this [ReactEurope video](https://youtu.be/_ISAA_Jt9kI), the creator of Recoil, Dave McCabe, also introduced the possibility of creating individual atoms for each of your items:

```js
export const itemWithId =
    memoize(id => atom({
        key: `item${id}`,
        default: {...},
    }));
```
In our case, that would involve creating individual atoms for each of our `tasks`.

## What makes Recoil more performant?

Dave McCabe mentioned [in a comment on HackerNews](https://news.ycombinator.com/item?id=23183177):

> "Well, I know that on one tool we saw a 20x or so speedup compared to using Redux. This is because Redux is O(n) in that it has to ask each connected component whether it needs to re-render, whereas we can be O(1)."

Recoil can be O(1) because when you edit the data stored in an **atom**, only components subscribed to that atom will need to re-render. 

In our to-do list example, if we had 20 separate tasks, we would have 20 separate atoms. If we edited the fifth task, only the fifth task would need to re-render.

Redux _does_ allow you to achieve the same effect using selectors:
```js
// selector
const taskSelector = (id) => state.tasks[id];

// component code
const task = useSelector(taskSelector(id));
```

This way, the component will only need to re-render when the specific task re-renders.

The caveat here is that each time _any_ part of the state changes, our `taskSelector` would have to re-calculate itself. 

> We can also use optimisations like `createSelector` to reduce expensive calculations, but it will still need to check whether it _needs_ to re-calculate to begin with.

I think these performance optimisations mean that Recoil might make sense for huge apps that need to render a large amount of components on the page. Your regular app is probably going to perform just fine with Redux, and I don’t think it’s worth switching to Recoil just for the potential (probably nonexistent) performance benefits.

There may be other reasons you may want to switch to Recoil - maybe if you think the API makes more sense to you than Redux, or that it's simpler to use and understand. Since Recoil is still in its experimental phase, it will also be a matter of waiting to see if there are any other compelling reasons to make the switch from Redux to Recoil.

I'd love to hear from you if you think there are any other good reasons to make the switch.

Thanks for reading!