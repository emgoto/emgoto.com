---
title: "How to mock React hooks using dependency injection"
date: 2020-04-01
tags: ["react"]
emoji: 💉
coverImage: 'https://images.unsplash.com/photo-1584384624796-55e84bfcbd56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
devArticleId: 296336
--- 

When using hooks in React you may have used or seen this sort of pattern where you use data from a hook to render your component:

```jsx
import { useData } from 'use-data';

const App = () => {
    const [data] = useData();
    return <Component data={data} />;
}

export default App;
```

However when it comes time to unit test this component or view it using Storybook, it may fail to render! A common cause of this would be if the hook was calling a REST endpoint - which won't be accessible in a testing or Storybook scenario.

We can use a pattern known as **dependency injection** to get around this problem.

## What is dependency injection?

Wikipedia says:

> In software engineering, dependency injection is a technique whereby one object supplies the dependencies of another object.

In the above example, we would say that the `App` component has a dependency on the `useData` hook. And right now it's sourcing its own dependency by importing it.

With **dependency injection**, whatever renders `App` can supply the `useData` dependency. In React, we can do this via passing in `useData` as a prop.

## Using dependency injection

Dependency injection in its most basic form would look like this:

```jsx
const App = ({ useData }) => {
    const [data] = useData();
    return <Component data={data} />;
}
```

`App` no longer is responsible for knowing where `useData` comes from, and just uses it!

The main problem with this is that each time another component rendered `App`, they would have to do the work of importing and passing in `useData` for it: 

```jsx
import { useData } from 'use-data';

//usage:
<App useData={useData} />
```

Which is kind of silly considering most of the time we're always going to be passing in the same `useData`.

## Using dependency injection with default props

In React we can make use of **default props** to allow the `use-data` import to be used by default:

```jsx
import { useData as useDataDI } from 'use-data';

const App = ({ useData = useDataDI }) => {
    const [data] = useData();
    return <Component data={data} />;
}
```

If a `useData` prop is not passed in, by default we will use `useDataDI` - which is the hook imported from the `use-data`.

Then for all normal uses of this component, we can just render it as normal:

```jsx
<App /> // we don't need to do anything else!
```

And when we want to use the component in unit tests or Storybooks, we can pass in our own `useData` hook with mock data:

```jsx
const mockData = { foo: "bar" };
const mockUseData = () => [mockData];

// Usage:
<App useData={mockUseData} />
```

## Alternatives to dependency injection

One of the downsides of dependency injection is it does require you to add an extra prop to your component that you wouldn't otherwise have. If you don't want to use the dependency injection pattern there are some alternatives:

* When testing with Jest, it is [possible to mock imports](/mocking-with-jest) and this includes hooks too
* You can mock endpoint calls using libraries like [fetch-mock](https://www.npmjs.com/package/fetch-mock) (which will also work with Storybook)
* If you're looking to mock hooks with Storybook, there aren't any popular solutions out there (that I know of) but there is a [react-magnetic-di](https://github.com/albertogasparin/react-magnetic-di) library that may suit your needs, if you would like to give it a try

---

Thanks for reading!
