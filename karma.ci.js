const karmaConfig = require('./scripts/karma/config');

// enable ChromeHeadless Browser
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  karmaConfig.browsers = ['ChromeHeadless'];
  karmaConfig.webpack.mode = 'production';
  config.set(karmaConfig);
};
