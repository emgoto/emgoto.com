---
title: "Getting started with styled-components in React"
date: 2020-03-13
tags: ["react"]
emoji: 💅
coverImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
devArticleId: 278354
--- 

If you’re looking for a way to write easily maintainable and portable CSS in React, you may be interested in using the [styled-components](https://github.com/styled-components/styled-components) library. It’s one of a number of **CSS in JS** libraries that let you skip some of the pains that you may otherwise experience dealing with large and unwieldy `.css` files.

## What is CSS in JS, anyway?

When using plain CSS, you’d define your CSS in one file:
```css
.saveButton {
  color: green;
}
```

And refer to it via the `className` prop in your React code:
```jsx
export const App = () => <button className='saveButton'>Save</button>
```

As your codebase grows in size, managing these CSS files can become unwieldy, and the naming of your CSS classes will become super important (and sometimes complicated) - you have to remember that your defined CSS is global to your entire app, and to make sure you don't end up with naming conflicts!

On the other hand, CSS in JS libraries let you define your CSS *inside* of your JavaScript files. For example using styled-components it will look like this: 

```jsx
import styled from 'styled-components';

// Creates a <button> with the style "color: green"
const SaveButton = styled.button`
  color: green;
`;
  
export const App = () => <SaveButton>Save</SaveButton>
```

The benefit here is that when using `SaveButton`, this CSS will only apply to what it wraps around, and nothing else. Of course there are other cool benefits too like being able to use props, which we'll explore later in this guide.

## Where did the class names go?

You may have noticed that we're no longer defining CSS class names - styled-components does it for us behind the scenes! If you took a look at your React app's source code, you would see something like this:
```html
<style>
  .cPQVKZ { color: green; }
</style>

<!-- Other stuff goes here... -->

<button class="sc-AxjAm cPQVKZ">Save</button>
```

There will be two randomly generated class names for every React component:

* The first one (starting with `sc-`) is a reference to the `SaveButton` styled component itself and won't ever have any styles attached to it
* The second one (in this example `cPQVKZ`) will contain the styles defined inside of `SaveButton`

## Using the styled API

So far we’ve seen `styled.button`, but we can also use any HTML tag in its place, like `h1` or `div`:

```jsx
const Header = styled.h1`
  font-size: 16px;
`;

const CoolDiv = styled.div`
  padding: 8px;
`;
```

We can use other styled components too, and inherit their styles (and override any that are the same):

```jsx
const BoringButton = styled.button`
  color: blue;
`;

const CoolButton = styled(BoringButton)`
  color: pink;
`;
```

## Passing in props

Another part of the magic of styled components is that you can pass in props! 

```jsx
const CoolButton = styled.button`
  color: ${props => props.color};
`;

export const App = () => (
  <>
    <CoolButton color="yellow"/>
    <CoolButton color="green"/>
  </>
);
```

The source code will end up looking like this:

```html
<style>
  .jUNwe { color: yellow; }
  .krQJtN { color: green; }
</style>

<!-- Other stuff goes here... -->

<button color="yellow" class="sc-AxjAm jUNwe">Save</button>
<button color="green" class="sc-AxjAm krQJtN">Save</button>
```

You can see that for each value we use for the `color` prop, a new CSS class will be created. We can also see that the `sc-AxjAm` class in each button is the same - since this class name refers to the `CoolButton` itself, and doesn’t change regardless of props.

## Using the css helper function

We can define CSS styles using the `css` helper function:

```jsx
import { css } from 'styled-components';

const whiteColor = css`
  color: white;
`;
```

This can come in handy if you have a common set of styles that you want to use in multiple styled components:

```jsx
const Button = styled.button`
  ${whiteColor};
  background-color: red;
`;

const AnotherButton = styled.button`
  ${whiteColor};
  background-color: green;
`;
```

The styles defined in `whiteColor` will not be its own separate class, but will be added to both of the CSS classes generated for `Button` and `AnotherButton`.

## Modifying the styles of a styled component’s children

If you’ve created a styled component, and you need to change the styles of one of its children, you can add selectors:

```jsx
const Button = styled.button`
  .h1 {
    color: pink;
  }
`;
```

Referring to `.h1` will apply to children at any depth - if you only want to refer to any direct children, you’ll need to use `> .h1` instead.

## Referring to other styled components

Instead of just referring to tag names, you can also refer to other styled components! 

```jsx
const ChildButton = styled.button`
    color: pink;
`;

const CoolDiv = styled.div`
  ${ChildButton} {
    color: green;
  }
`;

export const App = () => (
  <>
    <CoolDiv>
      <ChildButton>Click me</ChildButton>
    </CoolDiv>
  </>
);
```

This will override the original styles of `ChildButton`.

----------

The [styled-components](https://github.com/styled-components/styled-components) library is the biggest and most popular CSS in JS library at the moment, so it’s very easy to get started with all the documentation and help available for it on the internet.

However if you’re still shopping around for a CSS in JS library, I’d also encourage you to check out some alternatives such as [emotion](https://github.com/emotion-js/emotion) and [linaria](https://github.com/callstack/linaria) to see if they’re right for you.

Thanks for reading!




