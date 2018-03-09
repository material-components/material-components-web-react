const {bundle} = require('./webpack-bundles');

module.exports = [
  bundle('temporary-package/index.js', 'temporary-package/bundle'),
  bundle('temporary-package/foo.js', 'temporary-package/foo'),
];
