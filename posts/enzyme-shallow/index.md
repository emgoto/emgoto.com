---
title: "Understanding the shallow function in Enzyme"
date: 2020-05-01
category: "blog"
tags: ["enzyme"]
emoji: 🐬
coverImage: 'https://images.unsplash.com/photo-1576156406191-1b5b90467d9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80'
devArticleId: 323131
--- 

As an alternative to mounting React components during unit tests, you can use Enzyme's `shallow()` to render your component only "one level deep". Essentially this will render only the code that is defined inside of that component - anything that is imported from elsewhere will not be included. 

Let's take a look at a couple of examples to see how this works in practice.

## Shallow rendering some divs

Given a basic component:

```jsx
// App.js 
const App = () => (
  <div foo="bar">
    <div>Hello world</div>
  </div>
);

export default App;
```

We can use Enzyme's handy `debug` function to see what `shallow()` is rendering:

```jsx
// App.test.js
import { shallow } from 'enzyme';

const wrapper = shallow(<App />);
console.log(wrapper.debug());
```

Since all our app's code is defined in the same place, what you will see in your terminal will look identical to your code: 

```
<div foo="bar">
  <div>Hello world</div>
</div>
```

## Shallow rendering externally defined components

Here our app is rendering two child components - one defined in a separate file, and the other in the same file as `App`: 

```jsx
// App.js
import Bar from './bar';

const Foo = () => <div>Foo!</div>;

const App = () => (
  <div>
    <Foo />
    <Bar />
  </div>
);
```

Since both these components were defined outside of the `App` component, their internals won't be rendered in a shallow render:

```
<div>
  <Foo />
  <Bar />
</div>
```

## Shallow rendering with the render prop pattern

If you are using the [render prop pattern](https://reactpatterns.com/#render-prop):

```jsx
const Wrapper = ({ children }) => <div>{children('black')}</div>;

const App = () => <Wrapper>{color => <div>{color}</div>}</Wrapper>;
```

You will get something like this:

```
<Wrapper>
  [function]
</Wrapper>
```

## Using the dive function to go one level deeper

If we wanted to test any of the nested child components in the above examples, we can make use of Enzyme's `dive` function.

In the second example where you can see the name of the child component:

```
<div>
  <Foo />
  <Bar />
</div>
```

You will first need to `find()` the child component before then diving into it:

```jsx
const wrapper = shallow(<App />);
const fooWrapper = wrapper.find(Foo).dive();
```

In the render props example, you'll be able to just `dive()` right in!

## When is shallow() useful?

Shallow rendering can be faster than mounting your component, and allows you to focus your unit tests on a specific component without having to worry about what any of its children may be doing.

However there is a fairly popular post from Kent C Dodds about how he [never uses shallow rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering). Some of the things he points out are that:

- If you test a component using shallow rendering you're not guaranteeing that the component is actually rendering correctly e.g. if any child components are broken, it won't cause the test to fail
- If you're shallow rendering, you're going to be testing implementation details, which [you shouldn't be doing](https://kentcdodds.com/blog/testing-implementation-details)
- Even if mounting your component is slower, it's worth it!

Tim Doherty has posted a rebuttal [in defense of shallow rendering](https://medium.com/javascript-in-plain-english/in-defense-of-shallow-rendering-5f627f7c155d) in which he talks about what constitutes an "implementation detail" and when `shallow()` might be useful.

For example if you had an `onChange` prop in your React component:

```jsx
const App = () => {
  const onChange = () => {}; // imagine some cool stuff happening
  return <Component onChange={onChange} />;
};
```

Tim argues that it would be okay to test that the `onChange` prop being called causes the desired behaviour to occur, since the `onChange` prop counts as part of the public interface for that component and therefore isn't an "implementation detail".

```jsx
const wrapper = shallow(<App />);

wrapper
  .find('Component')
  .props()
  .onChange(); // This calls the onChange prop

// Assert that the App has done what you expect it to do after onChange! 
// e.g. a div changing colour, a button disappearing
expect(...) 
```

> Enzyme can be used with any number of testing libraries, but in this post I am using Jest for assertions

Personally I've done a similar sort of thing in scenarios where we might want to assert that a function isn't being called more than a certain number of times (due to it being expensive, or triggering other unwanted effects in our app):

```jsx
const wrapper = shallow(<Component foo="bar" onChange={onChange} />);

expect(onChange).toHaveBeenCalledTimes(1);

// I'm forcing it to re-render via changing props
wrapper.setProps({ foo: 'baz' }); 

expect(onChange).toHaveBeenCalledTimes(1);
```

## shallow() won't always work

Another thing to point out is that not everything is going to work if you shallow render a component, such as:

- `useEffect` - your code will run, but it will never enter this hook
- `useContext` - you're never going to get a value back from your context
- refs - setting a ref won't work

In these cases you will definitely have to use `mount()`.

## Switching out shallow() for mount()

One of the downsides I find with `mount()` is that if your app's child components make some endpoint calls and/or have dependencies on things that aren't going to be available in tests, mocking all of those things can take a bit of time and effort.

One way you could work around this problem is to mount your component, and mock any children components that are causing issues (and that you don't need in your tests): 

```jsx
// App.js
import { ProblematicChild } from './problematic';

const App = () => (
  <div>
    <ProblematicChild />
  </div>
);

// App.test.js
jest.mock('./problematic', () => ({
  ProblematicChild: () => null, // render nothing
}));
```

However if you end up mocking all of your children components, at that point you may as well just use `shallow()` anyway - unless of course you want to test things like `useEffect` or `useContext` in which case this will come in handy.

> If you want to learn more about mocks, I have an article on [mocking with Jest](/mocking-with-jest) you can check out.

## Conclusion

I started off writing this post wanting to properly understand what it means to use `shallow()` in Enzyme, and then I got a bit sidetracked reading about the pros and cons of whether we should even be doing shallow rendering at all!

I think shallow rendering still has its uses, and I will continue to use it, but if you are interested in moving away from `shallow()` then a "best of both worlds" approach may be to use `mount()`, but then selectively mock out any child components that you don't want to include in your tests.

---

Thanks for reading!