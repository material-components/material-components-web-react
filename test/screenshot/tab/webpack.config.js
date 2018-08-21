const {bundle} = require('../webpack-bundles');

module.exports = [
  bundle('tab/index.js', 'tab/index'),
];
