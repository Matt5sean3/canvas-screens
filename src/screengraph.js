import { Base } from './base.js';

// Essentially a state map
// Used to manage which screens are parents and which are children
// Good for keeping things clean and planned
export const ScreenGraph = Object.create(Base);

ScreenGraph.init = function(screens, edges) {
  this.screens = screens;
  this.edges = edges;
  this.stack = [];
};

ScreenGraph.atBase = function() {
  return this.stack.length <= 1;
};

ScreenGraph.ascend = function() {
  this.currentScreen().close();
  if(!this.atBase()) {
    this.stack.pop();
    this.currentScreen().unpause();
  }
};

ScreenGraph.descend = function(idx) {
  // cycles are potentially problematic
  this.currentScreen().pause();
  this.stack.push(this.currentAdjacent()[idx]);
  this.currentScreen().open(this);
};

ScreenGraph.currentScreen = function() {
  return this.screens[this.stack[this.stack.length - 1]];
};

ScreenGraph.currentAdjacent = function() {
  return this.edges[this.stack[this.stack.length - 1]];
};

ScreenGraph.rebaseStack = function() {
  // Close everything above you on the stack
  while(this.stack.length > 1) {
    var idx = this.stack.shift();
    this.screens[idx].close();
  }
};

ScreenGraph.open = function() {
  this.stack = [0];
  this.currentScreen().open();
};

