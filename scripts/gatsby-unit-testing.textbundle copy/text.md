# How to unit test your Gatsby blog with React Testing Library
Writing unit tests will keep your Gatsby blog bug-free, and leads to more maintainable code. This post covers how you can use Jest and React Testing Library to cover some of your Gatsby blog’s most essential features.
## Why should you add unit tests?
When you’re hacking away on a side project, writing unit tests isn’t _fun_ and can be easily missed. I’ll admit I’ve often skipped writing unit tests for side projects - but I always end up regretting it later. Without unit tests, adding a bug fix or new feature becomes a lot scarier because you don’t know if you’re going to break something else in the process.
Writing tests as you go will immediately boost the quality of your code too, as unit tests force you to think a bit harder on the purpose of each function or component. It might be a struggle at first but the more you’ll do it, the easier it gets.
(Also seeing all those green ticks after you run your tests can be satisfying!)
## What should you test on your Gatsby blog?
For unit testing, you should be focusing on any logic that you have in your code. What you’ll need to test will depend on how simple or complex your Gatsby blog set up is.
In this post we’ll be using some of the unit tests I added to my blog as an example, and covering the following areas:
* Testing that my post’s dates are rendered as expected
* Testing that my SEO component is outputting the meta tags that I expect it to
* Testing that my home page renders links to 3 of my recent posts
## Installing Jest and React Testing Library
Getting started with unit testing is a bit more of a complex setup process for Gatsby than it would be for your regular React app. Luckily Gatsby provides some [great documentation on unit testing](https://www.gatsbyjs.com/docs/unit-testing/), so I would recommend following the steps on there to install Jest.
Next, you’ll also need to follow Gatsby’s instructions on [testing React components](https://www.gatsbyjs.com/docs/testing-react-components/) so that you can install React Testing Library.
## Why do we need both Jest and React Testing Library?
[Jest](https://jestjs.io/) is the framework that runs the tests for you.
Jest lets you do things like describe your suite of tests with `describe` and `test`, as well as make assertions using `expect`:
```js
describe('Test name', () => { test('should be true', () => {
		expect(true).toBe(true);
	});
});
```
Where [React Testing Library](https://testing-library.com/) comes into play is that it allows you to render your React apps and components, and then select certain parts of them to assert on:
```js
describe('Test name', () => { test('should be true', () => {
		render(<Component />); // highlight-line
		const text = screen.findByText('hello'); // highlight-line 
		expect(text).toBeTruthy();
	});
});
```
## Testing that my dates are rendered correctly
For posts published in the 2020, my blog will only render the day and month that the post was published (e.g. `16 Sept`). 
For posts published last year, I will render the year as well (e.g. `16 Sept 2019`).
Here is an example of the sort of unit test I would write for this scenario:
```js
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('PostSummary component', () => {
    test('should render year if post is from 2019', () => {
		const post = {
		    name: 'Post title',
			date: '16 Sept 2019',
		};
        render(<PostSummary post={post} />);
        expect(screen.getByText('16 Sept 2019')).toBeTruthy();
    });
});
```
In the above unit test we:
1.  Use RTL’s `render` function. This will render our React component and make it available to query on via the `screen` object.
2. Use the `getByText` query to assert that the text that we expect to be present is there.
As well as `getByText`, there are a number of other queries you can use depending on the situation. React Testing Library provides a useful guide for [which query you should use](https://testing-library.com/docs/guide-which-query).
> Pro-tip: If you’re running into issues with your unit tests, you can add a `console.log(screen.debug())` to your tests. This lets you double-check that your test is rendering what you’re expecting it to be rendering.
As well as testing the scenario for a post from 2019, I’ve also [written a unit test for if a post was written in the current year](https://github.com/emgoto/emgoto.com/blob/master/src/components/summaries/test.js).
## Testing your SEO component
If you’ve created your Gatsby blog using one of the default starter templates, chances are you’ll have a SEO component that uses `react-helmet` to generate your site’s meta tags. This contains things like the title of the page and what data your post would show if it was linked on Twitter or other social media sites.
> If you’re interested in learning more about meta tags, check out my recent post on [adding meta tags to your Gatsby blog ](https://www.emgoto.com/gatsby-metatags)
### Mocking Gatsby’s useStaticQuery
The first thing thing [my SEO component](https://github.com/emgoto/emgoto.com/blob/master/src/components/seo/index.js) does is get some of my site’s metadata with Gatsby’s `useStaticQuery`:
```js
// src/components/seo/index.js
const { site } = useStaticQuery(
    graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    author
                    siteUrl
                }
            }
        }
    `,
);
```
This data isn’t accessible in our unit test, so we’re going to need to mock what `useStaticQuery` returns. We can do this with Jest's `mockReturnValue`:
```js
// src/components/seo/test.js
describe('SEO component', () => {
	beforeAll(() => {
	    useStaticQuery.mockReturnValue({
	        site: {
	            siteMetadata: {
	                title: siteTitle,
	                description: siteDescription,
	                author: siteTitle,
	                siteUrl: siteUrl,
	            },
	        },
	    });
	});
	
	test(...)
});
```
We’re putting it inside a `beforeAll` hook which means this will get mocked once before all our tests run.
### Moving your useStaticQuery mock to `__mocks__`
As part of your unit testing setup, you will have created a `__mocks__/gatsby.js` file. If you only ever use `useStaticQuery` to get your site metadata, you could also move your mock there, so that it can be used across all of your unit tests:
```js
// __mocks__/gatsby.js

module.exports = {
  // ...
  useStaticQuery: jest.fn().mockReturnValue({
    site: {
        siteMetadata: {
            title: siteTitle,
            description: siteDescription,
            author: siteTitle,
            siteUrl: siteUrl,
        },
    },
  })
}

```
This will save you from having to individually mock it for each set of unit tests that you write.
### Testing your meta tags with Helmet’s peek()
With meta tags, you won’t be able to query for it on the `screen` object like we did with our previous unit test. Instead, we’ll need to make use of a function that React Helmet provides called `peek()`:
```js
// src/components/test.js
import { render } from '@testing-library/react';
import Helmet from 'react-helmet';

render(<SEO title={postTitle} />);
const helmet = Helmet.peek(); // highlight-line
```
This gives us an object containing all the meta tags created by our Helmet component. We can now write tests to assert that specific values are present:
```js
expect(helmet.title).toBe(siteTitle);

expect(helmet.metaTags).toEqual(
    expect.arrayContaining([
        {
            property: 'og:title',
            content: siteTitle,
        },
    ]),
);
```
Check out the full set of tests for my SEO component over on [Github](https://github.com/emgoto/emgoto.com/blob/master/src/components/seo/test.js).
## Testing that my home page renders three recent posts
My site’s home page renders my three most recent blog posts. It gets this data using a GraphQL [page query](https://www.gatsbyjs.com/docs/page-query/), which will be passed in as a prop to my component:
```js
const IndexPage = ({ data }) => (
    <>
        // renders the posts using the data
    </>
);

export const pageQuery = graphql`
    query {
        allMdx {
            nodes {
                // ...
            }
        }
    }
`;

export default IndexPage;
```
### Mocking the data
Since you can’t run the page query in a unit test, you’ll need to create a mock data object:
```js
const data = {
	nodes: {
    	// ...
	}
};
render(<IndexPage data={data} />
```
This approach is valid, and is recommended by the Gatsby testing docs. However if you modify your page query and somehow break it, your unit test will still pass regardless.
### Alternative approach: Using gatsby-plugin-testing
To use real data from your GraphQL page query, you can make use of [gatsby-plugin-testing](https://github.com/ehrencrona/gatsby-plugin-testing):
```js
import { getPageQueryData } from 'gatsby-plugin-testing';

const data = await getPageQueryData('index');
render(<IndexPage data={data} />);
```
This plugin will give you real data, identical to what your GraphQL query returns. This means that if you modify your GraphQL query in any way, the unit test will also use the new data from this query.
One thing to keep in mind with this approach is that since this is real data, you shouldn’t assert that a specific post title should be available on your home page (if you are showing your most recent posts). If you did, the unit test would break as soon as you added more blog posts.
### Finding my blog post links
In my unit test, I decided to assert that there are three posts rendered on my home page. Since each of the posts are links, one way we could find the posts is by using the `getAllByRole` query:
```js
const links = screen.getAllByRole('link');
```
This will return a list of all the links on the page. In my case however, my home page has a lot of other links so this isn’t too useful. 
Instead, I decided to add a `data-testid` prop to all my blog post links:
```js
// src/components/summaries/index.js

const PostSummary = () => <div data-testid="summary">...</div>
```
> It’s recommended that you use a `data-testid` instead of relying on a CSS class name or some other implementation detail, as we don’t want our unit tests to break if we edit the CSS, for example.
Now in my unit test, I can find all elements that match the given test ID, and assert that there are three of them:
```js
const posts = screen.getAllByTestId('summary');
expect(posts.length).toEqual(3);
```
This test _is_ fairly simple and I will admit that it’s not going to pick up on all the possible edge cases/bugs that could occur.
However, I’ve often broken certain pages of my website with small typos or changes so even a simple test like this one will let you know if anything is majorly broken, and so I still think it has a lot of use and is worth writing.
## Conclusion
I’m guilty of skipping unit tests for my side projects a lot of the time, but by writing them for my Gatsby blog I think I’ve come out with a codebase that’s a tiny bit cleaner, and I have more confidence in making changes to it in the future.
I hope this post helps you in unit testing your Gatsby blog or next side project.
Thanks for reading!