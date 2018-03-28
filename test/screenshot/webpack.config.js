const temporaryPackageBundles
  = require('./temporary-package/webpack.config.js');
const topAppBarBundles = require('./top-app-bar/webpack.config.js');

module.exports = [
  ...temporaryPackageBundles,
  ...topAppBarBundles,
];
