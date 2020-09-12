---
title: "Attempts at my fifth pull request to Forem"
date: 2020-08-09
tags: ["opensource"]
category: "blog"
emoji: 🌻
coverImage: 'https://images.unsplash.com/photo-1535222830855-fd60aca7e065?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
devArticleId: 422738
---

This week, I worked on my fifth pull request to [Forem](https://github.com/forem/forem) (the repository used to power [DEV](https://dev.to)). The feature I decided to tackle was adding a “copy to clipboard” feature to code examples on blog posts.
The pull request is still [a work-in-progress](https://github.com/forem/forem/pull/9688), but I thought I’d outline my thoughts and process of working on it so far. Open source is fun!

## Where do I start?

The first thing I needed to figure out was how and where code blocks are rendered. I figured from that point, I would be able to insert the ability of being able to copy that code block. 

I noticed that code blocks on posts all came with a `highlight` class, so I spent a while trying to find where in the code this class was applied. I found some `.scss` files where `.highlight` was being referred to, but otherwise no luck.

> This is usually the strategy I use when trying to find where code for a certain feature is located in the codebase. I inspect the page, and try to find a relevant class name or ID, or sometimes even a string of text on the page. I then try and search for this in the codebase. I’d love to hear if you have any advice on better approaches.

I decided at this point to ask on the issue ticket for some help. Rhymes was super helpful (as always!) and pointed me in the right direction to [markdown_parser.rb](https://github.com/forem/forem/blob/master/app/labor/markdown_parser.rb). 

As it turns out, Forem makes use of a Ruby library called [Rouge](https://github.com/rouge-ruby/rouge) to convert markdown into HTML, and this library applies the `highlight` class name. So it was definitely a bit of a red herring trying to find this in the codebase.

## Making sense of the code

The `markdown_parser.rb` file is responsible for creating the HTML that is used to render a blog post on DEV. Initially, trying to read this file felt very overwhelming. I think I went around in circles for a bit trying to figure out how this file worked, and how I would be able to add a “copy code” feature to it.

Eventually, I decided to check out its [test file](https://github.com/forem/forem/blob/master/spec/labor/markdown_parser_spec.rb), since tests will usually tell what sort of functionality is in the file that it is testing. I soon realised that the tests were testing a `finalise` function, so I figured that would be a good place to start. 

Looking at that function, I could see that after markdown had been converted to HTML with Rouge, some extra things were added to the HTML using functions like `wrap_all_images_in_link`.
I thought it sounded like a pretty good idea to do something similar, something along the lines of `add_copy_icon_to_codeblocks`.

## Using the clipboard web component

Rhymes had pointed out to me that web components were used in a couple of places already in Forem to allow copying text to a clipboard. Now, I’m pretty new to web components so take everything I say below with a grain of salt!

Usage of the [clipboard-copy](https://www.webcomponents.org/element/clipboard-copy-element) web component looks something like this:
```html
<clipboard-copy for="id-name">
  Click to copy
</clipboard-copy>
<div id="id-name">Thing being copied</div>

```
When you click the copy button, it will look for an element with the ID that matches the argument that you passed in using `for`. It will find that element, and copy the text inside of it.

## Getting stuck

I fiddled for a while with trying to add this to each code block on the page. I eventually successfully added it to the page _but_ clicking on the button to copy code did nothing!

This part of the process was super frustrating, and I didn’t really know what I had done wrong, or how to fix it. I also didn’t know anything about web components, so I thought maybe there was something I had done wrong there without realising.

To try and debug this problem, I wanted to try and get the web component working in any way I could. I tried adding it to the top of the blog post page (ignoring the code blocks for now) just to try and get it functional. No luck there either.
I took a look at another usage of the web component, the “copy link to article” feature (you’ll be able to see it in the meatballs menu to the left of posts on DEV). I copy pasted that too to try and get things working.

## A discovery?

After a while, I reached a realisation. The reason the “copy link to article” feature works is that there’s a separate file ([initializeCommentDropdown.js](https://github.com/forem/forem/blob/master/app/assets/javascripts/initializers/initializeCommentDropdown.js)) that adds the copy functionality like this:
```js
clipboardCopyElement.addEventListener('click', copyText);

function copyText() {
    // all the functionality of copying text
}
```

To me, it seems like the web component isn’t actually _doing_ anything, and all the functionality for copying the code to a clipboard lives inside of this file.

> I might be missing something completely obvious - let me know if you know what’s happening!

By re-using this code, I manage to get the “copy code” functionality working on my side.

## Raising a WIP pull request

At this point, I’m a little bit confused on the purpose of the web component, and I decided that before I go any further, I’d raise a [a WIP pull request](https://github.com/forem/forem/pull/9688) to the Forem repository so that I can get some feedback on whether I’m heading down the right path or not.

I was hoping to get most of this feature done, so it’s frustrating that I got stuck like this, and the web component is still a bit of a mystery to me. But I’m glad I managed to at least  get halfway towards a solution. Hopefully I get some more information on this soon!
