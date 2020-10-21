---
title: "Working in Public: how can we solve the problems of open source?"
date: 2020-10-21
tags: ["books", "opensource"]
emoji: 💻
coverImage: 'https://images.unsplash.com/photo-1582322384982-92cf41ed4dbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80'
---

Nadia Eghbal’s recent book _Working in Public: The Making and Maintenance of Open Source Software_, covers what the open source experience is like for maintainers today. 

It ends with the following sentence:

> “We don’t have all the answers yet, but I’m hoping this book helps point us towards the right questions.”

This felt like a very apt conclusion, for I did walk away from this book feeling a lot more sympathy for those who do work in open source, but also without any real answers or solutions for what we _can_ do about open source.

This post is a summary of some of the things I learned from Nadia’s book. At around 250 pages it’s not too long of a read so I would definitely recommend [buying the book for yourself](https://www.amazon.com/Working-Public-Making-Maintenance-Software-ebook/dp/B08BDGXVK9) if you have any interest in this topic.

## The open source community has grown friendlier, and more inclusive
Eghbal points out that open source has come a long way in becoming a more open and inclusive community. Repositories now have codes of conduct, and there is a culture of being generally welcoming and friendly towards first-time contributors. This contrasts with the earlier “benevolent dictators” of open source like [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) (the creator of Linux) who in 2018 apologised for his many years of ["unprofessional and uncalled for"](https://arstechnica.com/gadgets/2018/09/linus-torvalds-apologizes-for-years-of-being-a-jerk-takes-time-off-to-learn-empathy/) behaviour.

I’ll admit gave me a chuckle when I turned the page to see Torvalds giving the finger, juxtaposed with [Sindre Sorhus](https://twitter.com/sindresorhus) surrounded by Huskies:

![](./linus-and-sindre.png)

Github is also credited for reducing the barrier to participating in open source. Since we have standardised on Github as the place most open source repositories live, this means users are more likely to be familiar with the interface (and to already have an account). This makes it a lot easier for users to open issues when they encounter bugs or have questions, as well as to raise pull requests to fix these bugs or add new features.

## Popularity can lead to maintainer fatigue
The generally welcoming nature of open source combined with the ease by which users can create PRs or issues can result in a lot of work for maintainers (especially those who maintain a repository by themselves). They may feel pressured to respond to every issue and pull request received, and to spend time helping contributors to get their pull request to a state where it can be merged. 

Of course, not all contributors are a burden. It may be that by taking the time to help a first-time contributor merge a pull request, they could go on to contribute more useful pull requests in the future. But if more than 50% of contributors are one-off contributors to a project, that can be a lot of time invested by maintainers that they're not going to see a return on.

This pressure can cause some maintainers to want to quit. However even quitting can be hard! Deleting a popular repository could “break the internet” as [was the case with left-pad](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/). And finding someone to take over your repository might mean needing to put your faith in a relative stranger, who could end up [adding malicious code to steal your Bitcoins](https://www.zdnet.com/article/hacker-backdoors-popular-javascript-library-to-steal-bitcoin-funds/).

## Should open source be a one-way mirror?
One of the potential suggestions Eghbal poses to this problem is to make open source a **one-way mirror**. In practice, this would mean that users would be able to see the code, as well as any discussions that maintainers are having, but would no longer be able to open pull requests or issues asking for help. 

Maintainers would be able to opt-in certain contributors who they know would bring value, or they could allow people who are sponsoring their project access as well.

This would drastically reduce the amount of time maintainers have to spend responding to users’ requests, and allow them to do more high-value work.

With the inclusive and welcoming nature of open source, there could be some anger directed towards maintainers who take this approach. I think it would be too drastic of a change to be widely adopted any time soon, but I think there's a lot of inspiration we can take from this idea. Maybe there's some sort of middle ground?

## Looking for solutions
Eghbal has pointed out some of the problems plaguing open source today, but given this is a very hard problem to solve, understandably there are no perfect solutions yet.

To some extent, we can mitigate some of the busywork maintainers have to do by using bots and other automation (like running tests when contributors open PRs). Maintainers can also uphold a certain set of standards that a pull request must meet before it becomes reviewed, and provide clear documentation to help first-time contributors meet these standards.

Maintainers could also employ curators who could maintain a similar role to what moderators do on Twitch - weed out any low-value issues or pull requests, and surface to the maintainers only the issues and pull requests that are worth the attention.

As Github is the platform of choice for open source, maintainers are also reliant on Github to provide the features they need to work effectively. For example, users can now vote on issues by using the “thumbs up” emoji, but for a long time this feature was not available, and so maintainers had to deal with receiving notifications by users leaving “+1” comments.

## Conclusion
As someone who has dabbled a little bit in the open source community, [Working in Public](https://www.amazon.com/Working-Public-Making-Maintenance-Software-ebook/dp/B08BDGXVK9) has provided me with a lot of food for thought, and definitely makes me more sympathetic towards maintainers!

The book feels especially relevant this month with [Hacktoberfest](https://hacktoberfest.digitalocean.com/) which has unfortunately caused a lot of difficulty for maintainers of open source projects. 

I'm interested to see what direction the open source community takes into the future. I think the idea of curating issues/PRs on repositories (similar to Twitch moderation) could also be a great way for people to start contributing to an open source repository if they don't feel comfortable enough with the codebase, but want to help out.

Maybe there's some way we can crowdsource this and create some sort of platform so that maintainers can ask for help curating, and volunteers can step in. Could be interesting!


