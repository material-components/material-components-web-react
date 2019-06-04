const karmaConfig = require('./scripts/karma/config');

module.exports = function(config) {
  karmaConfig.browsers = ['Chrome'];
  karmaConfig.webpack.mode = 'development';
  config.set(karmaConfig);
};
