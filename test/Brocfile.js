var Concat = require('broccoli-concat');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var Bundle = require('broccoli-rollup');
var Path = require('path');

var es6 = Concat("src", {
  "inputFiles": ["*.js"],
  "outputFile": "tests.js",
  "headerFiles": ["header.js"],
  "footerFiles": ["footer.js"],
  "sourceMapConfig": {"enabled": false},
  "allowNone": false
});

var es6funnel = Funnel(es6, {
  destDir: "es6"
});

var commonjs = Bundle(es6, {
  "inputFiles": ["tests.js"],
  "rollup": {
    "entry": "tests.js",
    "format": "cjs",
    "dest": "tests.js",
    "external": [
      Path.resolve("../build/commonjs/canvas-screens.js")
    ]
  }
});

var commonjsfunnel = Funnel(commonjs, {
  destDir: "test"
});

module.exports = MergeTrees([es6funnel, commonjsfunnel]);

