---
title: "Setting up web monetization on your Gatsby blog (with RSS)"
date: 2020-05-27
tags: ["gatsby"]
emoji: 📰
coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
devArticleId: 344504
---

In this post we'll be adding web monetization to your Gatsby blog, allowing you to create content that is only visible to users that are sending you micropayments. We'll also be hiding this monetized content from your RSS feed, and (optionally) setting up a separate secret feed that contains your monetized content.

> If you're only interested in monetizing your site, and aren't planning on hiding any content, you can jump down to [Add a monetization meta tag to the head of every page](#add-a-monetization-meta-tag-to-the-head-of-every-page).

## Getting started with Gatsby and MDX

MDX allows you to create posts using a combination of Markdown and React components. If you have an existing Gatsby blog, you are most likely already using either Markdown or MDX to write your posts. We're going to need use MDX for this tutorial, so if you already have it set up - great! 

Otherwise, you'll need to start [converting your site to use MDX](https://www.gatsbyjs.org/blog/2019-11-21-how-to-convert-an-existing-gatsby-blog-to-use-mdx/), or at least add the capabilities so that any new posts are written in MDX.

If you are creating a new blog from scratch, you can use the [gatsby-starter-blog-mdx](https://www.gatsbyjs.org/starters/hagnerd/gatsby-starter-blog-mdx/) to quickly get started:

```bash
npm install -g gatsby-cli
gatsby new gatsby-starter-blog-mdx # https://github.com/hagnerd/gatsby-starter-blog-mdx
```

## Hiding monetized content in your posts

I used the `useMonetization` hook I created in my post on [getting started with web-monetization in React](/react-web-monetization) to create a wrapper component for monetized content:

```jsx
// src/components/monetized.js

import React, { useEffect, useState } from 'react';

export const useMonetization = () => { ... }

export const MonetizedContent = ({ children }) => {
    const { isMonetized, isLoading } = useMonetization();

    if (isLoading) {
        return <div>Loading...</div>
    } else if (isMonetized) {
        return <div>{children}</div>
    } else {
        return <div>Monetized content is hidden.</div>
    }
}
```

For this wrapper content to be usable in your MDX posts, you'll need to pass it in using the `MDXProvider` component. You can add this in the template file for your posts. For a blog created using the starter I mentioned above, this file lives at `src/templates/blog-post.js`.

```jsx
// src/templates/blog-post.js

import { MDXProvider } from "@mdx-js/react"
import { MonetizedContent } from '../components/Monetized';

<MDXProvider components={{ MonetizedContent }}>
    <MDXRenderer>{post.body}</MDXRenderer>
</MDXProvider>
```

The final step is to use this `MonetizedContent` wrapper in your posts:

```md
// your-blog-post.mdx

---
title: Hello World
---

Blah blah blah.

<MonetizedContent class="monetized-content">
    This content here is super special monetized content!
</MonetizedContent>
```

Now if you start up your Gatsby site using `gatsby develop`, you'll be able to see that your monetized content will be hidden if you are not sending micropayments.

## Add a monetization meta tag to the head of every page

To receive micropayments, you'll need to include your payment pointer in a meta tag on every page. Gatsby starters will usually come with an `SEO` file, so I would recommend adding it there:

```jsx
// src/components/seo.js
import Helmet from 'react-helmet'

<Helmet
    meta={[
    // Include all your other meta tags
    {
      name: `monetization`,
      content: 'fakePaymentPointer',
    },
    ].concat(
      keywords.length > 0
        ? {
            name: `keywords`,
            content: keywords.join(`, `),
          }
        : []
    )
    .concat(meta)}
/>
```

If you happened to not have a `SEO` file already handy, you'll need to create a component that renders something similar to above, and then include it in the template file for your blog posts.

## Hiding your monetized content from your RSS feed

By default, your site will probably come with an RSS feed. You can check this either by visiting `/rss.xml` on your site, or by going to your `gatsby-config.js` file and seeing if you have `gatsby-plugin-feed` set-up. 

If you don't have an RSS feed but you want one, you can install it following the instructions on the [gatsby-plugin-feed page](https://www.gatsbyjs.org/packages/gatsby-plugin-feed/).

Currently when the RSS feed is being generated, it will fail to find our `MonetizedContent` wrapper component and just treat it as a regular `div`, and so the monetized content will be freely available in your RSS feed. 

You can pass in the `MonetizedContent` component in the `wrap-root-element`  file:

```jsx
// wrap-root-element.js

import { MonetizedContent } from './src/components/Monetized'

const components = {
    // any other components goes here
    MonetizedContent,
}

export const wrapRootElement = ({ element }) => (
    <MDXProvider components={components}>{element}</MDXProvider>
)
```

However when the RSS feed is generated, it will end up with the monetized content being rendered in its loading state (i.e. the component you show while you're checking to see if the user is sending you micropayments). This could suit your use-case, depending on what you want to render in that loading state.

The alternative is to go back to your `gatsby-config.js` file and hide your content with a `hideMonetizedContent` function:

```jsx
// gatsby-config.js
const hideMonetizedContent = require('./src/utils/hide-monetized');
// ...
feeds: [
  {
    serialize: ({ query: { site, allMdx } }) => {
      return allMdx.edges.map(edge => {
        return Object.assign({}, edge.node.frontmatter, {
          // ...
          // wrap the content of your post - edge.node.html
          custom_elements: [{ 'content:encoded': hideMonetizedContent(edge.node.html) }],
        })
      })
    },
```

This function will replace any occurrences it can find of the `monetized-content` class and replace it with a message of your choice.

```jsx
// src/utils/hide-monetized.js

const hideMonetizedContent = function(html) {
    const monetizationHidden = 
	html.replace(
	    /<div class="monetized-content">.*?<\/div>/g, 
	    '' // Replace with message you want to show to reader
        );
    return monetizationHidden;
}

module.exports = hideMonetizedContent;
```

To test changes to your RSS feed, you'll need to serve the production build of your site: 

```jsx
gatsby build && gatsby serve
```

## Creating a second RSS feed to show your monetized content

This final step is optional as there isn't yet a strong use case for it, but it could be useful to give out as a perk to people who may be subscribed to you on some sort of payment platform.

To create this second feed, go back to your `gatsby-config.js` file and find your fields array:

```jsx
// gatsby-config.js
{
  resolve: `gatsby-plugin-feed`,
  options: {
    // ...
    feeds: [...] // <- this array right here!
```

You should already have one item in this array - your existing RSS feed. Copy-paste it and add it as a second item to the array. There will be a couple of changes you will need to make to this:

```jsx
// Change the URL of your hidden feed to be something not easily guessable
output: '/secrethiddenrss.xml',
// Prevents RSS feed link from showing up in <head>
match: "^$"
```

By default, the link to your RSS feed shows up in your page's `<head>`. We can use the `match` variable to match on which pages we want this link to show up on - `^$` will match on nothing.

The other change you would need to make is to *not* wrap the content in the `hideMonetizedContent` function, and your monetized content will now show up!

---

This post is part of my submission for the [Grant for the Web Hackathon](https://dev.to/devteam/announcing-the-grant-for-the-web-hackathon-on-dev-3kd1). I've got one final post coming to wrap this all up, so stay tuned.

Thanks for reading!