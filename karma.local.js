const karmaConfig = require('./scripts/karma/config');

module.exports = function(config) {
  karmaConfig.browsers = ['Chrome'];
  config.set(karmaConfig);
};
