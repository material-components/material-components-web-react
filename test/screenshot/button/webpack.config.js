const {bundle} = require('../webpack-bundles');

module.exports = [
  bundle('button/index.js', 'button/index'),
];
