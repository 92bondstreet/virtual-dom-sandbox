'use strict';

let createElement = require('virtual-dom/create-element');
let diff = require('virtual-dom/diff');
let h = require('virtual-dom/h');
let patch = require('virtual-dom/patch');

//Step 1: Create a function that declares what the DOM should look like
const render = count => {
  return h('div#container', [
    h('div.blue', {
      'style': {
        'lineHeight': '100px',
        'border': '1px solid blue',
        'width': '100px',
        'height': '100px'
      }
    }),
    h('div.red', {
      'style': {
        'textAlign': 'center',
        'lineHeight': `${100 + count}px`,
        'border': '1px solid red',
        'width': `${100 + count}px`,
        'height': `${100 + count}px`
      }
    }, [String(count)])
  ]);
};

//Step 2: Initialise the document
//We need some app data. Here we just store a count.
let count = 0;

//We need an initial tree
//Create an initial root DOM node ...
//... and it should be in the document
let tree = render(count);
let rootNode = createElement(tree);

document.body.appendChild(rootNode);

//Step 3: Wire up the update logic
setInterval(() => {
  count ++;

  const newTree = render(count);
  const patches = diff(tree, newTree);

  rootNode = patch(rootNode, patches);
  tree = newTree;
}, 1000);
