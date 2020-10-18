---
title: "Testing your Trello Power-Up hosted on GitHub Pages"
date: 2019-04-25
tags: ["Trello Power-Ups"]
emoji: 🧪
coverImage: ''
--- 

If you want to get started with developing Trello Power-ups, [GitHub Pages](https://pages.github.com/) allows you to host your Power-Up for free (provided you're fine with making your repository public).

> You can take a look at how it works with [Trello's template](https://github.com/trello/power-up-template).

Unfortunately, GitHub Pages doesn't let you have a development branch that pushes to a separate URL, so there's a couple of options for testing:

- Create a second GitHub Pages repository to host the dev version of your Power-Up
- Upload your changes to [Glitch](https://glitch.com/), and test it from there
- Test your changes locally using Jekyll and ngrok

In this post we're going to be exploring the third option.

## Using Jekyll

Install github-pages using `gem install github-pages`.

> If you don't have ruby installed, you can follow the instructions [here](https://www.ruby-lang.org/en/documentation/installation/).

You can then run your Power-Up locally using `jekyll serve`. 

This will make it available to you at `http://localhost:4000/`.

## Using ngrok

You'll need to [download ngrok](https://ngrok.com/) to create a tunnel between your locally hosted Power-Up and the internet. 

Once you've got it downloaded, run `jekyll serve` in one terminal window, and then `./ngrok http 4000` in another. 

This will give you a ngrok URL, which will look something like `https://12345abc.ngrok.io` (make sure you choose the https url!)

Paste this URL straight into your [Power-Up settings](https://trello.com/power-ups/admin/) and voila! 

## Pushing your changes

If everything looks good, you'll want to push your local changes to your repository. But before you do, make sure you've added the following lines to your .gitignore: 

```
Gemfile
Gemfile.lock
_site/
```

This prevents any Jekyll-related files from being pushed up to your remote repository.

## Conclusion

This approach is great if you want to do all of your development in the same place, without having to worry about new repositories or Glitch projects. The one downside is that due to ngrok, the initial page load of your Power-Up is a lot slower, so keep that in mind!