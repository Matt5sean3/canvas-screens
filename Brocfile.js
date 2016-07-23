var Concat = require('broccoli-concat');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var Bundle = require('broccoli-rollup');
// var Docco = require("broccoli-docco");

// First reach an ES6 compatible form by concatenating to a module

var es6 = Concat("src", {
  "inputFiles": ["*.js"],
  "outputFile": "canvas-screens.js",
  "headerFiles": ["declarations.js"],
  "sourceMapConfig": {"enabled": false},
  "allowNone": false
});

var es6funnel = Funnel(es6, {
  "destDir": "es6"
});

// Transpile to a web form
var web = Bundle(es6, {
  "inputFiles": ["canvas-screens.js"],
  "rollup": {
    "moduleName": "CanvasScreens",
    "entry": "canvas-screens.js",
    "format": "iife",
    "dest": "canvas-screens.js"
  }
});

var webfunnel = Funnel(web, {
  "destDir": "web"
});

var commonjs = Bundle(es6, {
  "inputFiles": ["canvas-screens.js"],
  "rollup": {
    "entry": "canvas-screens.js",
    "format": "cjs",
    "dest": "canvas-screens.js"
  }
});

var commonjsfunnel = Funnel(commonjs, {
  "destDir": "commonjs"
});

// var docs = Docco(es6);

module.exports = MergeTrees([es6funnel, commonjsfunnel, webfunnel]); 

