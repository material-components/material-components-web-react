const {bundle} = require('../webpack-bundles');

module.exports = [
  bundle('top-app-bar/short.js', 'top-app-bar/short'),
  bundle('top-app-bar/prominent.js', 'top-app-bar/prominent'),
  bundle('top-app-bar/standard.js', 'top-app-bar/standard'),
  bundle('top-app-bar/standardNoActionItems.js',
    'top-app-bar/standardNoActionItems'),
  bundle('top-app-bar/standardWithNavigationIconElement.js',
    'top-app-bar/standardWithNavigationIconElement'),
  bundle('top-app-bar/shortCollapsed.js', 'top-app-bar/shortCollapsed'),
];
