// Karma configuration
// Generated on Tue Mar 06 2018 14:20:28 GMT-0800 (PST)
const path = require('path');

module.exports = {
  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '',


  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['mocha'],


  // list of files / patterns to load in the browser
  files: [
    'test/unit/index.js'
  ],


  // list of files / patterns to exclude
  exclude: [],


  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'test/unit/index.js': ['webpack']
  },

  webpack: {
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              compact: true,
              presets: [
                'airbnb',
                'es2015',
                'react',
              ],
              plugins: ['transform-class-properties', 'istanbul']
            },
          }
        }
      ]
    }
  },

  client: {
    mocha: {
      reporter: 'html',
      ui: 'qunit',
    },
  },

  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['progress', 'coverage'],

  coverageReporter: {
    dir: 'coverage',
    reporters: [
      {type: 'lcovonly', subdir: '.'},
      {type: 'json', subdir: '.', file: 'coverage.json'},
      {type: 'html'},
    ],
  },

  // web server port
  port: 9876,


  // enable / disable colors in the output (reporters and logs)
  colors: true,


  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  // logLevel: config.LOG_INFO,


  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: false,

  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: false,

  // Concurrency level
  // how many browser should be started simultaneous
  concurrency: Infinity,
};
