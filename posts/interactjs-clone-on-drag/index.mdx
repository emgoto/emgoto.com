---
title: "Cloning an item on drag using interact.js"
date: 2020-03-17
tags: ["interactjs"]
emoji: 🐉
coverImage: 'https://images.unsplash.com/photo-1524679118078-6eeab91fabc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60'
--- 

If you're looking for a JavaScript drag and drop library that provides snapping to grids, or need to make sure items can only be dropped in a specific zone, [interact.js](https://interactjs.io/) provides these capabilities out of the box!

You may come across a scenario where you need an item to be cloned when you start dragging it - e.g. if you are building a map creator that lets you drop multiple of the same icon onto it.

Check out the code below, or you can also [view a working Codepen](https://codepen.io/emgoto/pen/wvamoRG).

```js
// This stores the position of the current item being dragged
const position = { x: 0, y: 0 };

interact(".item")
  .draggable({
    // By setting manualStart to true - we control the manualStart.
    // We need to do this so that we can clone the object before we begin dragging it.
    manualStart: true,
    listeners: {
      move(event) {
        position.x += event.dx;
        position.y += event.dy;
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }
    }
  })
  // This only gets called when we trigger it below using interact.start(...)
  .on("move", function(event) {
    const { currentTarget, interaction } = event;
    let element = currentTarget;

    // If we are dragging an item from the sidebar, its transform value will be ''
    // We need to clone it, and then start moving the clone
    if (
      interaction.pointerIsDown &&
      !interaction.interacting() &&
      currentTarget.style.transform === ""
    ) {
      element = currentTarget.cloneNode(true);

      // Add absolute positioning so that cloned object lives
      // right on top of the original object
      element.style.position = "absolute";
      element.style.left = 0;
      element.style.top = 0;

      // Add the cloned object to the document
      const container = document.querySelector(".container");
      container && container.appendChild(element);

      const { offsetTop, offsetLeft } = currentTarget;
      position.x = offsetLeft;
      position.y = offsetTop;

      // If we are moving an already existing item, we need to make sure
      // the position object has the correct values before we start dragging it
    } else if (interaction.pointerIsDown && !interaction.interacting()) {
      const regex = /translate\(([\d]+)px, ([\d]+)px\)/i;
      const transform = regex.exec(currentTarget.style.transform);

      if (transform && transform.length > 1) {
        position.x = Number(transform[1]);
        position.y = Number(transform[2]);
      }
    }

    // Start the drag event
    interaction.start({ name: "drag" }, event.interactable, element);
  });
```