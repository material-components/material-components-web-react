const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {read: readComponents} = require('../../scripts/directory-reader');
const {importer} = require('../../packages/webpack.util');

module.exports = {
  entry: ['babel-polyfill', `./test/screenshot/index.tsx`],
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {compact: true},
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()],
            },
          },
          {
            loader: 'sass-loader',
            options: {importer},
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'bundle.css'}),
    new OptimizeCssAssetsPlugin(),
    new webpack.DefinePlugin({
      COMPONENTS: JSON.stringify(readComponents()),
    }),
  ],
};
