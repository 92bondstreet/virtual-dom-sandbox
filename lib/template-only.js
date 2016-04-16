'use strict';

let fs = require('fs');
let path = require('path');
let template = require('ak-template');

const view = template(fs.readFileSync(path.join(__dirname, 'template.tpl'), 'utf-8'));

//Step 1: Create a function that declares what the DOM should look like
const render = count => {
  return view({count});
};

//Step 2: Initialise the document
//We need some app data. Here we just store a count.
//We need an initial tree
let count = 0;
let tree = render(count);

document.body.innerHTML = tree;

//Step 3: Wire up the update logic
setInterval(() => {
  count ++;

  const newTree = render(count);

  document.body.innerHTML = newTree;
}, 1000);
