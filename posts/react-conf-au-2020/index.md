---
title: "Seven things I learned at ReactConf AU 2020"
date: 2020-02-29
tags: ["react", "conference"]
emoji: 🇦🇺
coverImage: ''
---

This week I had the chance to attend [ReactConf AU](https://reactconfau.com) - the first ReactConf to be held in Australia! As the first conference that I had ever attended, I think it has set the bar pretty high for me with all the great quality talks. 

## Dark mode is about dimming the lights

[Diana Mounter](https://twitter.com/broccolini) from Github talked about the work it takes to implement a dark mode - in simple terms, you have to make sure that your codebase is set up to handle theming by referring to colors by variable names instead of just doing a `color: #FFF` directly (but it gets a lot more complex than that!)

Choosing colors for your dark mode isn't just a matter of inverting the colours either - you have to instead think about dark mode as "dimming the lights" for your users.

If you're interested in learning more about dark mode, Diana also recommended the [Design Details](https://spec.fm/podcasts/design-details/310206) podcast episode on dark mode. 

Unfortunately Github hasn't released a dark mode for their site yet, but Diana has put up a pretty cool [dark mode prototype](http://broccolini.net/dark-mode/) for Github you can check out!

## BBC News has a Labs team

The BBC News Labs team does a lot of super cool innovation around creating smoother and better workflows for their journalists, as well as exploring new ways to provide content to their viewers and listeners. 

Labs engineer [James Dooley](https://github.com/jamesdools) showcased some of the work they've been doing around making it easier for journalists to correct automated transcriptions using their [react-transcript-editor](https://github.com/bbc/react-transcript-editor) - complete with timestamps and word highlighting in the editor as the audio is played. 

I used to do transcription work part-time and would have found this tool so useful, if it had existed at the time! You can check out a demo for it [here](https://bbc.github.io/react-transcript-editor/iframe.html?id=demo--default).

## Try ping pong pair programming

[Selena Small](https://twitter.com/selenasmall88) and [Michael Milewski](https://twitter.com/saramic) did a really funny skit showing how **not** to pair program, and then recommended trying ping pong pair programming - where one person writes the unit tests, the other writes the implementation, and then they switch over.

## Improving your React app's performance

If you're looking to improve your app's performance, [Josh Duck](https://twitter.com/joshduck) gave a lot of useful tips including fixing your cache headers, font swapping, pre-loading resources and delaying loading of images until the user actually needs to view them. This talk is definitely worth watching (once the video is up) if you're struggling with improving your app's performance.

## Engineering-led design

Letting engineers lead design sounds like a scary concept at first, but [Lauren Argenta](https://github.com/lauren-tm) provided some really useful tips to bring your design and engineering teams closer together:

* Let both designers and engineers gain context by having engineers attend customer interview sessions, and designers attend engineering meetings so they can get a better understanding of technical constraints. Both sides can use this additional context to influence their decisions
* When working on a feature, create a dictionary of concepts and acronyms, so that everyone understands what everything means, and you have pre-defined ways of explaining certain concepts


## Zero-install prototyping

[Mark Dalgleish](https://twitter.com/markdalgleish) demoed [Playroom](https://github.com/seek-oss/playroom), a tool that designers and developers can use to create mock-ups and prototypes using just JSX and your own component library - no setup of React needed!

Another takeaway for me was when building components, make sure they are not responsible for their margins (I'm going to admit I have been guilty of that one). This responsibility should be taken over by dedicated layout components. 

For instance at SEEK if a component needs a margin they will wrap it in a `Stack` component that will assign equal margins to all of its children components.

## Model-based testing

Before this talk [David Khourshid](https://twitter.com/davidkpiano) gave, I had never heard of model-based testing. But after hearing about it, it makes me want to give it a go in my next side project!

To use model-based testing, first you'd need to generate a **finite state machine** for your app. This is basically like a diagram of all possible states of your app, with arrows between the nodes indicating the action performed to get to that new state. 

For instance you could start with a field being empty, and then have text typed in it, and now its state has changed to being _not_ empty.

After you've created this "machine" (which you can do using David's [XState](https://github.com/davidkpiano/xstate) library) you'd be able to have possible paths through your app generated for you, and then loop through those paths and run tests against them to make sure you're getting the expected outcome.

The benefit here is that instead of just unit testing, you'll be directly testing user behaviour. And by having the paths be automatically generated from the finite state machine for you, it removes the chance of you missing any edge cases in your tests!

----

There's plenty of other great talks that I didn't cover in this post, so I do recommend checking out all the video recordings once they have been uploaded.

Thanks for reading!
