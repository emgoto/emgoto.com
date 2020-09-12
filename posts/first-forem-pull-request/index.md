---
title: "Raising my first pull request to Forem"
date: 2020-07-18
tags: ["opensource"]
category: "blog"
emoji: 🌱
coverImage: 'https://images.unsplash.com/photo-1551970634-747846a548cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
devArticleId: 402776
--- 

This week I decided to do something I had been eyeing for a while - contributing to DEV’s [Forem repository](https://github.com/forem/forem).

Ultimately [the pull request I raised](https://github.com/forem/forem/pull/9375) is only one line - but it took a fair while to get there. This post outlines that process.

## My experience getting started

Initially I decided I was going to set Forem up locally, but after watching things slowly install in my terminal for a couple of minutes I decided I wanted to see if I could try out using the browser IDE, [GitPod](https://dev.to/ben/spin-up-a-local-instance-of-dev-in-the-cloud-with-gitpod-it-s-incredibly-simple-pij), instead.

GitPod wasn’t super fast either, but I didn’t have to do any work and it set itself up without any problems. I think this is super cool!

The bug I was originally going to fix needed me to be logged in. (I realised later I couldn’t actually reproduce the bug, so I probably should have checked that first).

Unfortunately, clicking on the Github log-in button didn't work. [Ben’s article on GitPod](https://dev.to/ben/spin-up-a-local-instance-of-dev-in-the-cloud-with-gitpod-it-s-incredibly-simple-pij) links to the [GitPod page](https://docs.dev.to/installation/gitpod/) in the documentation, and that documentation links back to Ben’s article, so for a little while I was confused if I was missing a step somewhere.

Eventually I figured it out. The problem was two-fold:

* If you try and click the Github log-in button from within GitPod’s web browser, it’s not going to work. You need to open the browser in a new window.
* I needed to add an authentication key for Github. The steps for this are located in the Forem documentation underneath the `Backend Guide` section. I initially didn’t think to look there since I saw this Github step as more of a “getting started” thing than a backend-specific thing.

Unfortunately once I did log in, I found that that there’s currently [a bug in running Forem using GitPod](https://github.com/forem/forem/issues/9195). I jumped back into setting it up locally, and a couple of setup steps later, got Forem working 🎉

## Finding an issue to work on
In my previous attempts at open source, I have found finding an issue to be a bit overwhelming and stressful, and usually where I end up giving up. Usually I end up doing something like:

* Filter by some labels
* Scroll through a bunch of issues
* Click on ones that look promising
* Read through the comment chain (if there is one)

I might read the description of the issue, and have absolutely no clue where to start. Sometimes there might be someone working on it already, or the issue has been paused due to a blocker or unresolved question. So it can take a while to find a issue that looks "doable" to me. I also don’t have much Ruby on Rails experience, so unfortunately that also reduces the number of issues that I can feel comfortable working on.

### Filtering by labels

At first I filtered by a couple of different labels - `ready for dev`, `tech: javascript` and `difficulty: easy`. 

I interpreted easy issues as things that would be easy to work on - however the definition in the contribution guide is a little bit different:

> Issues are usually confined to isolated areas of existing code.

And so effectively you can end up with issues like [creating a profile card that shows on hover](https://github.com/forem/forem/issues/1122) without any designs, which doesn't feel easy (from my perspective) to do. I think it's maybe a matter of adjusting my expectations of what is considered to be an "easy" issue.

### My first pull request!

In the end I found a bug with a `good first issue` label, and the fix itself was [only one line](https://github.com/forem/forem/pull/9375). I initially didn't filter by this label because I didn’t want to take away issues from newer developers - hopefully in the future I can work on some bigger / harder issues!

This whole process was probably 50% setup, 30% trying to find an issue, and then 20% working on it. Now that I’ve cleared this first hurdle, I’m hoping that finding that second issue and raising the second PR will be a little bit easier.