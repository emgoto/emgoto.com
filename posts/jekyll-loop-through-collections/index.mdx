---
title: "How to loop through and render collections in Jekyll"
date: 2020-05-30
tags: ["jekyll"]
emoji: 🧪
coverImage: 'https://images.unsplash.com/photo-1589163809021-966e3ced4f2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'
---
```html
{% for collection in site.collections %}
    {% if collection.label != 'posts' %}
        <h2>{{ collection.label }}</h2>
        {% for item in site[collection.label] %}
            <br><a href="{{ item.url }}">{{ item.title }}</a>
        {% endfor %}
    {% endif %}
{% endfor %}
```
Posts will count as a collection even if it's empty, so I have taken the step of filtering it out above.

> The `{% %}` syntax is from a templating language called [Liquid](https://jekyllrb.com/docs/liquid/).

## How to render your collection on the home page
If you are using a template like [minima](https://github.com/jekyll/minima/blob/master/_layouts/home.html), you can override the existing home page by creating a new file inside of `_layouts/home.html`. I would recommend copy-pasting the [existing code for the home.html page](https://github.com/jekyll/minima/blob/master/_layouts/home.html) and modifying it.


## How to define a collection
In your `_config.yml` file, add a new line for each collection. 
```yml
collections:
  - collectionName
  - collectionName2
```

## Adding posts to your collection
Create a folder at the root level called `_collectionName` for each collection that you have defined in your config file. 

Each `.md` file within that, that contains a title in the frontmatter:

```md
---
title: Hello world
---
```

Will be counted as an item in the collection.