---
title: "Linting, committing and pushing your code in one magic command"
date: 2019-10-20
tags: ["productivity"]
emoji: 🧙‍♀️
coverImage: ''
--- 
I recently realised that every day I do the same set of commands over and over:

```bash
yarn eslint src/some/folders/**/*.js --fix
git add .
git commit -m "commit message"
git push
```

What if I could increase my productivity by merging this all into one command? 🤔 

## The magic command
Now when I run:

```bash
magic "commit message"
```

My code will be linted, committed and pushed! 🎉 

To accomplish this, I’m storing the following aliases in my `~/.bashrc` file:

```bash
alias lint="git add . && git diff HEAD --name-only --diff-filter=d | grep '.*.js$' | xargs yarn eslint --fix"
alias magic='f() {branch=$(git rev-parse --abbrev-ref HEAD); lint && git add . && git commit -m "$1" && git push -u origin $branch;};f'
```

Read on if you want a bit more of an explanation of what’s happening.

## Linting your changed files
```bash
git add . && git diff HEAD --name-only --diff-filter=d |
grep '.*.js$' |
xargs yarn eslint --fix
```

- I run `git add .`  first to make sure any new files that I’ve added are being tracked by git
- `git diff --staged --name-only` will grab the file names of all staged files
- `--diff-filter=d` ignores the files that have been deleted (we don’t need to lint those!)
- the `grep` will find only files ending in `.js`
- Finally we run  `yarn eslint --fix` on each of those files

You may have to modify this depending on your linting setup, and what file extensions you use. Thanks to Masato Ohba, who provided the [initial snippet](https://dev.to/ohbarye/lint-only-over-changed-files-4e7j).


## Adding, committing, and pushing your code
```bash
f() {
    branch=$(git rev-parse --abbrev-ref HEAD);
    lint && git add . && git commit -m "$1" && git push -u origin $branch;
}
```

- We are storing the current branch name in `$branch`
-  `$1` refers to the first argument that we pass in - the commit message
- `-u` is the shortened form of `--set-upstream` (which you only need to do the first time you push after creating a branch)

## Thanks for reading!

Let me know if this works for you, or if you have any cool aliases you’d like to share!