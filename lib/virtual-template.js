'use strict';

let fs = require('fs');
let htmlclean = require('htmlclean');
let path = require('path');
let template = require('ak-template');

let createElement = require('virtual-dom/create-element');
let diff = require('virtual-dom/diff');
let patch = require('virtual-dom/patch');
let VNode = require('virtual-dom/vnode/vnode');
let VText = require('virtual-dom/vnode/vtext');

let convertHTML = require('html-to-vdom')({
  'VNode': VNode,
  'VText': VText
});

const view = template(fs.readFileSync(path.join(__dirname, 'template.tpl'), 'utf-8'));

//Step 1: Create a function that declares what the DOM should look like
const render = count => {
  return convertHTML(htmlclean(view({count})));
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
