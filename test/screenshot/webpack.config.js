const buttonBundles = require('./button/webpack.config.js');
const cardBundles = require('./card/webpack.config.js');
const fabBundles = require('./fab/webpack.config.js');
const floatingLabelBundles = require('./floating-label/webpack.config.js');
const lineRippleBundles = require('./line-ripple/webpack.config.js');
const materialIconBundles = require('./material-icon/webpack.config.js');
const notchedOutlineBundles = require('./notched-outline/webpack.config.js');
const rippleBundles = require('./ripple/webpack.config.js');
const textFieldIconBundles = require('./text-field/icon/webpack.config.js');
const topAppBarBundles = require('./top-app-bar/webpack.config.js');

module.exports = [
  ...buttonBundles,
  ...cardBundles,
  ...fabBundles,
  ...floatingLabelBundles,
  ...lineRippleBundles,
  ...materialIconBundles,
  ...notchedOutlineBundles,
  ...rippleBundles,
  ...textFieldIconBundles,
  ...topAppBarBundles,
];
