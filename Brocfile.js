var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var CompiledModules = require('broccoli-es6-module-transpiler');

var lib = 'src';

var transpiledLib = CompiledModules(lib, {
  formatter: 'bundle',
  output: 'canvas-screens.js'
});

module.exports = new Funnel(transpiledLib); 
