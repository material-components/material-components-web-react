const buttonBundles = require('./button/webpack.config.js');
const materialIconBundles = require('./material-icon/webpack.config.js');
const rippleBundles = require('./ripple/webpack.config.js');
const topAppBarBundles = require('./top-app-bar/webpack.config.js');

module.exports = [
  ...buttonBundles,
  ...materialIconBundles,
  ...rippleBundles,
  ...topAppBarBundles,
];
