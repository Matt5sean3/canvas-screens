var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var Rollup = require('broccoli-rollup');

// First reach an ES6 compatible form by concatenating to a module
var src = "src";

var es6 = Rollup(src, {
  "inputFiles": ["*.js"],
  "rollup": {
    "entry": "entry.js",
    "format": "es6",
    "dest" : "canvas-screens.js"
  }
});

var es6funnel = Funnel(es6, {
  "destDir": "es6"
});

// Transpile to a web form
var web = Rollup(src, {
  "inputFiles": ["*.js"],
  "rollup": {
    "moduleName": "CanvasScreens",
    "entry": "entry.js",
    "format": "iife",
    "dest": "canvas-screens.js"
  }
});

var webfunnel = Funnel(web, {
  "destDir": "web"
});

// commonjs seems to fail
var commonjs = Rollup(src, {
  "inputFiles": ["*.js"],
  "rollup": {
    "entry": "entry.js",
    "format": "cjs",
    "dest": "canvas-screens.js"
  }
});

var commonjsfunnel = Funnel(commonjs, {
  "destDir": "commonjs"
});

module.exports = MergeTrees([es6funnel, commonjsfunnel, webfunnel]); 

