---
title: "How to restart your Ruby on Rails database"
date: 2020-06-01
tags: ["rails"]
emoji: 🚞
coverImage: ''
--- 

If you’re still early in the development phase of your app, you might want to restart your database so that you can have a “fresh” start.

If you run the following command:
```bash
rake db:reset
```
Your database will be dropped and it will be recreated using whatever is currently stored in your `db/schema.rb` file.

Before you run the reset command, you can also modify that schema file to add/remove any tables or columns as you see fit.
You can also safely delete any migration files you have inside of `db/migrations`.