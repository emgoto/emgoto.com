---
title: "A guide to module mocking with Jest"
date: 2020-01-24
tags: ["jest", "react"]
emoji: 🤡
coverImage: 'https://images.unsplash.com/photo-1597816165828-56c53e9394f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2033&q=80'
--- 

When writing Jest unit tests, I always struggle to remember the syntax for mocking modules. So this post is intended as a part-guide, part-cheatsheet to refresh your memory when you need to do some mocking.

## Getting started
For the purposes of this guide, let’s assume we have a React app which renders the day of the week thanks to a handy `Time` module, and we want to mock any imports from `Time`.

```jsx
// App.js
import getDayOfWeek from './Time';

const App = () => {
    return (
    <>
        {getDayOfWeek()}
    </>
    );
};
```

## Mocking once and forever
If you don’t ever need to change what the `Time` module returns, and you don’t need to make any assertions on it in your tests, here’s how you would do it.

### Mocking a default import
```jsx
// App.js
import getDayOfWeek from './Time';

// test.js
jest.mock('./Day', () => () => 'Monday');
```

### Mocking a named import
```jsx
// App.js
import { getTime } from './Time';

// test.js
jest.mock('./Day', () => ({
    getTime: () => '1:11PM',
}));
```

### Mocking default and named imports
If you want to mock default and named imports, you’ll need to remember to use `__esModule: true`:
```jsx
// App.js
import getDayOfWeek, { getTime } from './Time';

// test.js
jest.mock('./Day', () => ({
    __esModule: true,
    getTime: () => '1:11PM',
    default: () => 'Thursday'
}));
```

### Leaving some imports unmocked
If we mock a module but leave out a specific import from that module, it will be left as `undefined`. If you don’t want a specific import mocked, you’ll need to use `requireActual`:
```jsx
// App.js
import { getTime, isMorning } from './Time';

// test.js
jest.mock('./Day', () => ({
    ...jest.requireActual('./Day'), 
    getTime: () => '1:11PM',
    // isMorning will return its true value
}));
```

## Using jest.fn() to assert on your mocks
In the case where you want to assert things on the import you are mocking, such as how many times it is called, you’ll need to use `jest.fn()`:

```jsx
import { render } from '@testing-library/react';
import App from './App';
import getDayOfWeek from './Day';

jest.mock('./Day', () => jest.fn(() => 'Tuesday'));

test('Calls getDayOfWeek function once', () => {
    render(<App />);
    expect(getDayOfWeek).toBeCalledTimes(1);
});
```

## Clearing mocks between tests with clearAllMocks
If we declare the mock once, its call count doesn’t reset between tests. So the second test here would fail:
```jsx
jest.mock('./Day', () => jest.fn(() => 'Tuesday'));

test('Calls getDayOfWeek function once', () => {
    render(<App />);
    expect(getDayOfWeek).toBeCalledTimes(1);
});

test('Calls getDayOfWeek function once, again', () => {
    render(<App />);
    expect(getDayOfWeek).toBeCalledTimes(1); // getDayOfWeek has been called twice
});
```
We would need to make sure we clear the call count between each test by calling `clearAllMocks`:

```jsx
beforeEach(() => {
    jest.clearAllMocks();
});

test('Calls getDayOfWeek function once', () => {
    // ...
```
## Changing what the mock returns between tests
### Using mockReturnValue
If you wanted to have `getDayOfWeek` to return a different value per test, you can use `mockReturnValue` in each of your tests:

```jsx
import getDayOfWeek from './Day';

jest.mock('./Day', () => jest.fn());

test('App renders Monday', () => {
    getDayOfWeek.mockReturnValue('Monday');
    //...
});

test('App renders Tuesday', () => {
    getDayOfWeek.mockReturnValue('Tuesday');
    //...
});
```

If you only wanted to change what the mocked function returned for just *one* test, beware you don’t do something like this, as it won’t work:

```jsx
jest.mock('./Day', () => jest.fn(() => 'Tuesday'));

test('App renders Tuesday', () => {
    // Passes
});

test('App renders Monday', () => {
    getDayOfWeek.mockReturnValue('Monday');
    // Passes
});

test('App renders Tuesday, again', () => {
    // Fails
});
```

This is because calling `mockReturnValue` inside a test still changes the mock for all other tests after it.

### Using mockReturnValueOnce
To get around the above scenario, you could use  `mockReturnValueOnce`:

```jsx
jest.mock('./Day', () => jest.fn(() => 'Tuesday'));

test('App renders Monday', () => {
    getDayOfWeek.mockReturnValueOnce('Monday');
    // Passes
});

test('App renders Tuesday', () => {
    // Passes
});
```

`mockReturnValueOnce` will return a `Monday` once, and then resume returning `Tuesday` for all other tests.

### Defining the mocks in beforeEach
Alternatively you can define the mock before each test, and then call `mockReturnValue` inside the Monday test to override the mock just for that test:

```jsx
jest.mock('./Day', () => jest.fn());

beforeEach(() => {
    getDayOfWeek.mockReturnValue('Tuesday');
});

test('App renders Tuesday', () => {
    // Passes
});

test('App renders Monday', () => {
    getDayOfWeek.mockReturnValue('Monday');
    // Passes
});

test('App renders Tuesday, again', () => {
    // Passes
});
```
Personally I’d prefer this approach over using `mockReturnValueOnce` as I think it’s less likely to cause confusion or end up in a scenario where your mocks are in a weird state.

## Chaining mocks

As one final tip, when mocking multiple modules you can chain them like so:

```jsx
jest
    .mock('./Time', () => jest.fn())
    .mock('./Space', () => jest.fn());
```

## Thanks for reading!

I hope this covers what you need to know about mocking with Jest, but please let me know if I’ve left you with any unanswered questions.

