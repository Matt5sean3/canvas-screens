var Concat = require('broccoli-concat');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var Bundle = require('broccoli-rollup');

var es6 = Concat("src", {
  "outputFile": "tests.js",
  "headerFiles": ["header.js"],
  "footerFiles": ["footer.js"],
  "sourceMapConfig": {"enabled": false},
  "allowNone": false
});

var commonjs = Bundle(es6, {
  "inputFiles": ["tests.js"],
  "rollup": {
    "entry": "tests.js",
    "format": "cjs",
    "dest": "tests.js"
  }
});

var commonjsfunnel = Funnel(commonjs, {
  destDir: "test"
});

module.exports = commonjsfunnel;

