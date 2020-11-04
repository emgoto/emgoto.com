---
title: "How to access props in mapDispatchToProps"
date: 2020-01-29
tags: ["redux", "react"]
emoji: 🗺️
coverImage: ''
--- 

## Accessing props from state using mergeProps

While using Redux, you may come across a situation where you are passing in props from both `mapStateToProps` and `mapDispatchToProps`, and using them together:

```jsx
// Button.js
const Button = ({ name, setName }) => (
    <button onClick={setName(name)}>Click</button>
);

const mapStateToProps = (state) => ({
    name: getName(state),
});

const mapDispatchToProps = (dispatch) => ({
    setName: (name) => dispatch(setName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Button); 
```

We can save `Button` having to know about `name`, and instead use `mergeProps`:

```jsx
// Button.js
const Button = ({ setName }) => (
    <button onClick={setName}>Click</button>
);

const mapStateToProps = (state) => ({
    name: getName(state),
});

const mapDispatchToProps = (dispatch) => ({
    setName: (name) => () => dispatch(setName(name))
});

const mergeProps = (stateProps, dispatchProps) => ({
    setName: dispatchProps.setName(stateProps.name),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Button); 
```

### What does mergeProps do?
`mergeProps` is an optional third argument you can pass into `connect`. As the name suggests, it merges all the props into one object for your component to use. By default, it will look like this:

```jsx
(stateProps, dispatchProps, ownProps) =>
    ({ ...stateProps, ...dispatchProps, ...ownProps })
```

- `stateProps` are all the props from `mapStateToProps` - in the above example, `name`
- `dispatchProps` are all the props from `mapDispatchToProps` -  `setName`
- `ownProps` are all props that are passed into a component like this  `<Button foo={bar}/>`

## Accessing ownProps in mapDispatchFromProps

We can also access `ownProps` from `mapDispatchToProps`. Here we have the same `Button` example, but instead of name coming from `mapStateToProps`, this time it’s being passed in from the `Form` component:

```jsx
// Form.js
import Button from './Button';

const Form = () => (
    <>
    {/* A bunch of other stuff... */}
    <Button name={'Emma'} />
    </>
);

// Button.js
const Button = ({ name, setName }) => (
    <button onClick={setName(name)}>Click</button>
);

const mapDispatchToProps = (dispatch) => ({
    setName: (name) => dispatch(setName(name)),
});

export default connect(null, mapDispatchToProps)(Button); 
```

We can use the `name` prop directly in `mapDispatchToProps` by using its second argument, `ownProps`:

```jsx
const Button = ({ setName }) => (
    <button onClick={setName}>Click</button>
);

const mapDispatchToProps = (dispatch, ownProps) => ({
    setName: () => dispatch(setName(ownProps.name)),
});

export default connect(null, mapDispatchToProps)(Button); 
```

Even if `name` is now unused, it will still be passed in as part of `ownProps` to the `Button` component. We can filter it out using `mergeProps`:

```jsx
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...dispatchProps,
});

export default connect(null, mapDispatchToProps, mergeProps)(Button); 
```

## Pro-tip: Using mapDispatchToProps’ object form

You’ll notice that I always defined `mapDispatchToProps` in its function form:

```jsx
const mapDispatchToProps = (dispatch) => ({
    setName: (name) => dispatch(setName(name))
});
```

If you’re not making use of `ownProps` or `mergeProps`, we can actually simplify it down to its object form, which does the exact same thing:

```jsx
const mapDispatchToProps = {
    setName,
};
```

Thanks for reading!