const temporaryPackageBundles
  = require('./temporary-package/webpack.config.js');

module.exports = [
  ...temporaryPackageBundles,
];
