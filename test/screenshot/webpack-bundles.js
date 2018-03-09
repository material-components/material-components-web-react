const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports.bundle = function(testPath) {
  return {
    entry: './test/screenshot/' + testPath + '/index.js',
    output: {
      filename: testPath + '/bundle.js',
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              importer: function(url, prev) {
                if (url.indexOf('@material') === 0) {
                  let filePath = url.split('@material')[1];
                  let nodeModulePath = `./node_modules/@material/${filePath}`;
                  return {
                    file: require('path').resolve(nodeModulePath),
                  };
                }
                return {
                  file: url,
                };
              },
            },
          },
        ]}),
      }],
    },
    plugins: [
      new ExtractTextPlugin(testPath + '/bundle.css'),
      new OptimizeCssAssetsPlugin(),
    ],
  };
};
