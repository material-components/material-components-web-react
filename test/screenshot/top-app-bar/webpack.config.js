const {bundle} = require('../webpack-bundles');

module.exports = [
  bundle('top-app-bar/short.js', 'top-app-bar/short'),
  bundle('top-app-bar/prominent.js', 'top-app-bar/prominent'),
  bundle('top-app-bar/standard.js', 'top-app-bar/standard'),
  bundle('top-app-bar/shortNoActionItems.js', 'top-app-bar/shortNoActionItems'),
  bundle('top-app-bar/prominentNoActionItems.js',
    'top-app-bar/prominentNoActionItems'),
  bundle('top-app-bar/standardNoActionItems.js',
    'top-app-bar/standardNoActionItems'),
  bundle('top-app-bar/alwaysCollapsed.js', 'top-app-bar/alwaysCollapsed'),
];
