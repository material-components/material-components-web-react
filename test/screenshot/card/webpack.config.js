const {bundle} = require('../webpack-bundles');

module.exports = [
  bundle('card/index.js', 'card/index'),
];
