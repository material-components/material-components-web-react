const materialIconBundles = require('./material-icon/webpack.config.js');
const topAppBarBundles = require('./top-app-bar/webpack.config.js');
const fabBundles = require('./fab/webpack.config.js');
const floatingLabelBundles = require('./floating-label/webpack.config.js');

module.exports = [
  // ...materialIconBundles,
  // ...topAppBarBundles,
  // ...fabBundles,
  ...floatingLabelBundles,
];
