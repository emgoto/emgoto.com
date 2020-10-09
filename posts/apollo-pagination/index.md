---
title: "Apollo pagination tutorial: using fetchMore()"
date: 2020-09-30
category: "blog"
tags: ["apollo", "graphql", "react"]
emoji: 🚀
coverImage: 'https://images.unsplash.com/photo-1598103586325-59f81770b82c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
devArticleId: 470511
--- 

When you need to fetch large amounts of data from your GraphQL server with Apollo, you may need to make use of its pagination feature. Pagination allows you fetch multiple "pages" of data (e.g. 100 at a time).

This tutorial will walk you through how to make use of Apollo's pagination in your React app.

## Take a look at your GraphQL schema

The approach you take with pagination will depend entirely on how things have been structured in your GraphQL schema. In this post, we’ll be assuming that the schema looks something like this:

```graphql
type PageInfo {
   hasNextPage: Boolean!
}

type Connection {
    edges: [Edge]
    nodes: [Node]
    pageInfo: PageInfo!
}

type Edge {
    cursor: String!
    node: Node
}
```

What's important to us here are the `hasNextPage` and `cursor` (the item index) values.

## Using Apollo's fetchMore function

Along with the data you fetch from Apollo's `useQuery` hook, you can also grab a variable called `fetchMore`:

```js
const { data, loading, error, refetch, fetchMore } =
	useQuery(QUERY,
        {
            variables,
            fetchPolicy,
            errorPolicy: 'all',
        },
    );
```

The `fetchMore` function can be repeatedly called to get all your pages of data. But first, we'll be creating a couple of utility functions to make life easier.

### Check that there is a next page

Your data will contain a `hasNextPage` value, so we'll need to check if this is set to `true`:

```js
const getHasNextPage = (data) =>
    data.pageInfo.hasNextPage;
```

> Please note that your function may be slightly different depending on the structure of your schema!

### Calculate the after value

When using `fetchMore`, we need to tell it what index to start fetching from. We do this by passing in an `after` value. 

If we pass in 99 as our `after` value, we’re saying to fetch the next batch _after_ 99 (i.e. 100 onwards). 

To calculate our `after` value, we'll need to find the `cursor` value of the last item in the list:
```js
const getAfter = (data) =>
    data.edges && data.edges.length > 0
        ? data.edges[data.edges.length - 1].cursor
        : null;
```

### Create your updateQuery function

Finally, we’re going to need an `updateQuery` function. After we fetch the next page worth of data, we’ll need to merge that data in with our already fetched data.
```js
const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
        return previousResult;
    }

    const previousEdges = previousResult.edges;
    const fetchMoreEdges = fetchMoreResult.edges;

    fetchMoreResult.edges = [...previousEdges, ...fetchMoreEdges];

    return { ...fetchMoreResult }
}

```
As with the other code examples, you may have to  modify it to match your GraphQL schema.

There's a couple of key things to note when creating your `updateQuery`:
* The shape of the data you are returning needs to _exactly_ match what Apollo is expecting. If you try and modify or remove certain keys, your `updateQuery` won’t work
* Don’t modify the `previousResult` and return it! If you do, Apollo won’t recognise that anything has changed, and won’t re-render your app after you’ve fetched more data. If we modify the `fetchMoreResult`, we can get around this problem.

### Use fetchMore inside of a useEffect
Now that we’ve got all our utility functions, we can bring them all together:
```js
useEffect(() => {
    if (data && fetchMore) {
        const nextPage = getHasNextPage(data);
        const after = getAfter(data);

        if (nextPage && after !== null) {
            fetchMore({ updateQuery, variables: { after } });
        }
    }
}, [data, fetchMore, updateQuery]);
```
### Pass in the after value to your GraphQL query

You’ll notice that we are passing in `after` to our variables list in `fetchMore`. You will also need to make sure that your query is using this variable:
```js
query Data ($after: String) {
    data (after: $after) {
        pageInfo {
            hasNextPage
        }
        edges {
            cursor
            node {
              // ... data from each node here
            }
        }
    }
}
```

With `fetchMore` implemented, the data from your `useQuery` hook will now return multiple pages worth of data!

## Conclusion
And that’s it! Hopefully this post may have cleared up some mysteries about how to use pagination with the Apollo Client. 

If you haven’t already, I also recommend checking out the [Pagination](https://www.apollographql.com/docs/react/data/pagination/) page on the Apollo docs for additional information and use cases.