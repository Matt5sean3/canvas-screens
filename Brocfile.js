var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var CompileModules = require('broccoli-es6-module-transpiler');

var lib = 'src';

var web = CompileModules(lib, {
  formatter: 'bundle',
  output: 'canvas-screens.js'
});

var webfunnel = Funnel(web, {
  destDir: 'web'
});

var commonjs = CompileModules(lib, {
  formatter: 'commonjs'
});

var commonjsfunnel = Funnel(commonjs, {
  destDir: 'commonjs'
});

module.exports = MergeTrees([commonjsfunnel, webfunnel]); 
