const webpack = require('webpack');
const {readdirSync, lstatSync} = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDirectory = (source) => lstatSync(source).isDirectory();
const getChunks = (source) =>
  readdirSync(source)
    .map((filename) => path.join(source, filename))
    .filter(isDirectory)
    .map((directoryPath) => directoryPath.replace('packages\/', ''));

const chunks = getChunks('./packages');

const getAbsolutePath = (url) => path.resolve(__dirname, url);
const filename = '[name]';

function getWebpackConfigs() {
  const webpackConfigs = [];

  chunks.forEach((chunk) => {
    const jsPath = getAbsolutePath(`${chunk}/index.js`);
    const cssPath = getAbsolutePath(`${chunk}/index.scss`);

    webpackConfigs.push(getJavaScriptWebpackConfig(jsPath, chunk));
    webpackConfigs.push(getJavaScriptWebpackConfig(jsPath, `${chunk}.min`));


    if (chunk === 'ripple') return;
    webpackConfigs.push(getCssWebpackConfig(cssPath, chunk));
    webpackConfigs.push(getCssWebpackConfig(cssPath, `${chunk}.min`));
  });

  return webpackConfigs;
}

function getCommonWebpackParams(entryPath, chunk, isCss) {
  const entry = {[chunk]: entryPath};
  return {
    entry,
    output: {
      path: getAbsolutePath('../build'),
      filename: `${filename}${isCss ? '.css' : ''}.js`,
      libraryTarget: 'umd',
    },
    devtool: 'source-map',
  };
}

function getJavaScriptWebpackConfig(entryPath, chunk) {
  return Object.assign(
    getCommonWebpackParams(entryPath, chunk), {
      module: {
        rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        }],
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          include: /\.min\.js$/,
        }),
      ],
    });
}

function getCssWebpackConfig(entryPath, chunk) {
  const shouldMinify = chunk.includes('.min');
  return Object.assign(
    getCommonWebpackParams(entryPath, chunk, true), {
      module: {
        rules: [{
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                minimize: shouldMinify,
              },
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: [getAbsolutePath('../node_modules')],
              },
            }],
          }),
        }],
      },
      plugins: [
        new ExtractTextPlugin(`${filename}.css`),
      ],
    });
}


module.exports = getWebpackConfigs();
