const karmaConfig = require('./scripts/karma/config');

// enable ChromeHeadless Browser
// process.env.CHROME_BIN = require('puppeteer').executablePath();
// console.log(process.env.CHROME_BIN)
process.env.CHROME_BIN = 'google-chrome-unstable';

module.exports = function(config) {
  karmaConfig.browsers = ['ChromeHeadless'];
  config.set(karmaConfig);
};
