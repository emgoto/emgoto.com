---
title: "A quick start guide to creating an app with Preact, TypeScript and Ruby on Rails"
date: 2020-03-25
tags: ["preact"]
emoji: 🥞
coverImage: 'https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
devArticleId: 292293
--- 

After following this guide, you will have created a "Hello world" application that uses Preact, TypeScript and Ruby on Rails. We'll also be installing ESLint! 

## Installing prerequisites - ruby and sqlite3

Make sure you have installed rbenv and Ruby:

```bash
brew install rbenv

ruby --version

# if your version of Ruby is old:
rbenv install 2.7.0
rbenv rehash
rbenv global 2.7.0
```

You'll most likely have `sqlite3` already installed (check using `sqlite3 --version`) but if you don't you can download it from the [SQLite download page](https://www.sqlite.org/download.html).

## Installing Ruby on Rails

Then install Ruby on Rails:
```bash
gem update --system
gem install bundler
RBENV_VERSION=2.7.0 rbenv exec gem install rails --version 6.0.2.1
```

Once installed, open a new terminal window and double-check that it was successfully installed:

```bash
rails --version
```

## Create your Ruby on Rails app with React
Since there isn't Preact boilerplate code available, I found it much easier to get started with React and then switch it out for Preact afterwards.

```bash
rails new <APP_NAME> --webpack=react
```

## Add TypeScript and ESLint

```bash
bundle exec rails webpacker:install:typescript
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-preact @types/webpack-env
yarn add babel-plugin-transform-react-jsx
```

Make sure to update all of your JavaScript files to end with `.ts` and `.tsx`!

> If your code is rendering a Preact component you'll want it to end in `.tsx`. If it's just a util file with some functions in it, then you only need `.ts` (but you can still just use `.tsx` and it will work fine).

Add the following line in `tsconfig.json`:

```json
"compilerOptions": {
    "jsxFactory": "h",
    //...
}
```

Then add a lint script to your `package.json`:

```json
"scripts": {
    "lint": "eslint app/javascript/**/*.ts[x]"
}
```

Also make sure to create a `.eslintrc.js` file in your root folder and add the following:

```js
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'preact'
    ],
};
```

## Install Preact

```bash
yarn add preact
```

And add the the following to the plugin section of your `babel.config.js` file: 

```json
plugins: [
    ["transform-react-jsx", { "pragma": "h" }],
]
```

Now that you've got Preact, you can also delete `react` and `react-dom` from your dependencies in your `package.json` file.

## Create your first controller

Create your first controller. I've named mine `hello`:

```bash
rails generate controller hello
```

This will create a file for you called `app/controllers/hello_controller.rb`. Add the following code to it:

```rb
class HelloController < ApplicationController
    def home
    end    
end
```

Then add this new controller you've created to `config/routes.rb`:

```rb
Rails.application.routes.draw do
    root to: 'hello#home'
end
```

## Switch out any React references for Preact

When we first created this app, a `app/javascript/packs/hello_react.tsx` file will have been created for us. Rename this to `hello_preact.tsx`, and switch out its contents for a Preact component:

```jsx
import { render, h } from 'preact';

const Hello = () => (
    <div>Hello world!</div>
)

document.addEventListener('DOMContentLoaded', () => {
    render(<Hello />, document.body);
});
```

And finally, we need to add our new Preact component to `app/views/hello/home.html.erb` 

```erb
<%= javascript_pack_tag 'hello_preact' %>

<h1>Hello world!</h1>
```

## Starting things up

Finally, we can run these two commands to start up our Preact + Rails app:

```bash
rails s --binding=127.0.0.1
./bin/webpack-dev-server
```

And voila! 🎉 You should now have a "Hello world" app that uses Preact and Ruby on Rails.

---

I struggled to find good documentation online to help me get started with this stack, so I hope this guide has helped you if you were facing the same difficulties.

Happy coding!

## References

[Getting Started with Rails](https://guides.rubyonrails.org/getting_started.html)

[Rails: Install Rails 5.2.3 with rbenv](https://www.chrisjmendez.com/2016/05/06/installing-ruby-on-rails-on-osx-using-rbenv/)

[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
