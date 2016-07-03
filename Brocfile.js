var Concat = require('broccoli-concat');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var CompileModules = require('broccoli-es6-module-transpiler');
// var Docco = require("broccoli-docco");

// First reach an ES6 compatible form by concatenating to a module
var es6 = Concat("src", {
  "outputFile": "canvas-screens.js",
  "headerFiles": ["declarations.js"],
  "sourceMapConfig": {"enabled": false},
  "allowNone": false
});

var es6funnel = Funnel(es6, {
  destDir: "es6"
});

// Transpile to a web form
var web = CompileModules(es6, {
  formatter: "bundle",
  output: "canvas-screens.js"
});

var webfunnel = Funnel(web, {
  destDir: "web"
});

var commonjs = CompileModules(es6, {
  formatter: "commonjs"
});

var commonjsfunnel = Funnel(commonjs, {
  destDir: "commonjs"
});

// var docs = Docco(es6);

module.exports = MergeTrees([es6funnel, commonjsfunnel, webfunnel]); 

