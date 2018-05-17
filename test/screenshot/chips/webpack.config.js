const {bundle} = require('../webpack-bundles');

module.exports = [
  bundle('chips/index.js', 'chips/index'),
];