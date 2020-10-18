---
title: "Getting started with web monetization in React"
date: 2020-05-09
tags: ["web-monetization"]
emoji: 💵
coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
devArticleId: 330884
--- 

After seeing the announcement for the [Grant For The Web Hackathon](https://dev.to/devteam/announcing-the-grant-for-the-web-hackathon-on-dev-3kd1) I did a little bit of digging and thinking to try and understand web monetization better.

If you're looking to create something using React, hopefully this quick guide can save you a bit of time in getting started.

## Creating a hook to see if a user is web monetized

Here's a hook that will return you two states - `isMonetized` and `isLoading`:

```jsx
import { useEffect, useState } from 'react';

export const useMonetization = () => {
    const [isMonetized, setIsMonetized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!document.monetization) {
	    // This means this user doesn't have monetization capabilities
	    // i.e. they don't have the Coil extension installed on their browser
            setIsLoading(false);
            setIsMonetized(false);
            return;
        }

        // Note: A user could have monetization capabilities (i.e. installed Coil)
        // but that doesn't mean they've actually signed up for an account!
        const { state } = document.monetization;

        // If the initial state is 'stopped', we can assume the user isn't
        // going to pay, and so we can stop loading
        if (state === 'stopped') {
            setIsLoading(false);
            setIsMonetized(false);
        }

        // We add a listener to wait for the user to start paying
        document.monetization.addEventListener('monetizationstart', () => {
            setIsMonetized(true);
            setIsLoading(false)
        });

    }, []);

    return { isMonetized, isLoading };
};
```

You would be able to use it like this:

```jsx
const { isLoading, isMonetized } = useMonetization();

if (isLoading) {
    // Return a spinner
} else if (isMonetized) {
    // Show exclusive content
} else {
    // Let the user know there is exclusive content available
}
```

## How to test your web monetization without signing up for Coil

The [test-web-monetization](https://testwebmonetization.com/) provides a bookmarklet you can use to test your project (scroll down to the **Bookmarklet for Testing** section of the page). This makes it super easy to test web monetization - and it will work with the React hook I've described above too.

This does also mean that if you do set up web monetization this way, anyone will be able to easily get around it by using a bookmarklet such the one listed above. As of now there are no server-side examples on the [Web Monetization website](https://webmonetization.org/docs/exclusive-content), but hopefully there will be some soon!

## Other resources

If you are planning on using React or Gatsby, there are some small packages that may help you out:

* [react-web-monetization](https://github.com/sharafian/react-web-monetization)

* [gatsby-plugin-web-monetization](https://github.com/Daudr/gatsby-plugin-web-monetization)

---

I'm super excited to see what everyone comes up with for this hackathon! Good luck!