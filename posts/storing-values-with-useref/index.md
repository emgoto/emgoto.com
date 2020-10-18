---
title: "Storing values with the useRef hook"
date: 2020-02-20
tags: ["react"]
emoji: 💾
coverImage: ''
--- 

By now you’ve all probably heard about [React hooks](https://reactjs.org/docs/hooks-intro.html). You may have heard about (or used) `useRef` too:

```jsx
const Component = () => {
    const ref = useRef(null);
    return <div ref={ref}>Hello world</div>;
};
```

Its most common use-case is when you want to have a reference to a DOM element. With this reference, you can do lots of useful things like grabbing an element’s height and width, see whether a scrollbar is present, or `focus()` it at a certain point in time.

Recently I learned you can also use `useRef` to store values, which you can then go on to reference and update in your code:

```jsx
const Component = () => {
    const ref = useRef({
        renderCount: 0
    });

    // Increase the render count on every re-render
    ref.current.renderCount += 1;

    return <>Hello world</>;
}
```

## What’s the difference between useRef and just using a variable?

If you tried initializing a variable like this: 

```jsx
const Component = () => {
    let renderCount = 0;
    renderCount += 1;

    return <>Hello world</>;
}
```

It would get end up getting re-initialized each time the component is rendered. But if you use a ref, the value you store in it will persist between renders of your component.

## What about if I define the variable outside of the component?

If you initialize the value outside of your component, this value will be global to all instances of `Component` (if you happen to be rendering more than one). So if you change the value, it will affect the value for all the other `Component`s you have rendered on your page.

```jsx
let renderCount = 0;

const Component = () => {
    // If you had 10 Components on the page, they would all update the same
    // renderCount value and it would already be at 10 after one render!
    renderCount += 1;
    return <>Hello world</>;
}
```

## What about useState?

The key difference between storing a value using `useState` and `useRef` is that if you update the state, your component will re-render. If you update the value stored in your ref, nothing will happen. So if you don’t need the component to re-render after you change a value, you don’t need to store it in state.

## What if I’m using class components?

If you’re using class components, you can achieve the same thing using a class variable:

```jsx
class Component extends React.Component() {
    renderCount = 0;

    render() {
        this.renderCount += 1;
        return <div>Hello world</div>;
    }
}
```

I hope this has helped you to understand `useRef` a little bit more. Thanks for reading!