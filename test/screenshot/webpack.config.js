const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {getMaterialExternals, getComponents} = require('../../scripts/webpack');
const {importer} = require('../../packages/webpack.util');

module.exports = {
  entry: ['babel-polyfill', `./test/screenshot/index.js`],
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {compact: true},
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {importer},
          },
        ],
      }),
    }],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new OptimizeCssAssetsPlugin(),
    new webpack.DefinePlugin({
      COMPONENTS: JSON.stringify(getComponents()),
    }),
  ],
};
