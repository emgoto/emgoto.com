---
title: "How to add a canonical URL to Jekyll posts"
date: 2020-05-30
tags: ["jekyll"]
emoji: ⚗️
coverImage: 'https://images.unsplash.com/photo-1590517785334-cc5851a8b864?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
---

Add `jekyll-seo-tag` to your `_config.yml` file.

```yml
plugins:
 - jekyll-seo-tag
```

Then in the frontmatter for your posts, add the canonical URL:

```md
---
title: How to add a canonical URL to Jekyll posts
canonical_url: 'https://your-canonical-url-here'
---
```


