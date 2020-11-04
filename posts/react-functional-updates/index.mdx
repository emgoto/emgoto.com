---
title: "Using the functional updates pattern with React hooks"
date: 2020-04-07
tags: ["react"]
emoji: 🎣
coverImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
devArticleId: 301207
--- 

The functional updates pattern can be used whenever you need to **update state using the previous state.**

For example, if you were storing in state the number of times a button was clicked, you might do it by referring to the previous `count` state:

```jsx
const App = () => {
    const [count, setCount] = useState(0);
    return (
        <button onClick={() => setCount(count + 1)}>
            Click
        </button>
    );
};
```

Instead of doing `count + 1`, you can pass in a function to `setCount`:
```jsx
<button onClick={() => setCount(prevCount => prevCount + 1)}>
    Click
</button>
```

## What's the benefit of using functional updates?

In the above example, there's no immediate benefit to using this pattern (that I know of). However if you were setting state inside of a `useEffect` hook:

```jsx
useEffect(() => {
    setCount(count + 1);
}, [setCount, count]);
```

Since `count` is a dependency, each time `count` was changed by `setCount`, `useEffect` would be called again causing an infinite number of re-renders.

Using the functional updates pattern in this case makes sense:

```jsx
useEffect(() => {
    setCount(prevCount => prevCount + 1);
}, [setCount]);
```

---

If you have any better use cases that you can think of, I'd love to hear about them!

Thanks for reading!

## References

[https://reactjs.org/docs/hooks-reference.html#functional-updates](https://reactjs.org/docs/hooks-reference.html#functional-updates)