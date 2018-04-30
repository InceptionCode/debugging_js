// This file isn't transpiled, so must use CommonJS and ES standard

// Register babel to transpile before our tests run.
require('babel-register')();

// Disable webpack features that Mocha or any test framework doesn't understand.
require.extensions['.sass'] = function () {};