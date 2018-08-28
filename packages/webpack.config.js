// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const webpack = require('webpack');
const {readdirSync, lstatSync} = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {readMaterialPackages} = require('../scripts/package-json-reader');
const {convertToImportPaths} = require('../scripts/package-name-converter');
const {importer} = require('./webpack.util');

const isDirectory = (source) => lstatSync(source).isDirectory();
const containsJsFile = (source) => readdirSync(source).some((file) => path.extname(file) === '.js');

const getChunks = (source) =>
  readdirSync(source)
    .map((filename) => path.join(source, filename))
    .filter((source) => isDirectory(source) && containsJsFile(source))
    .map((directoryPath) => directoryPath.replace('packages\/', ''));

const chunks = getChunks('./packages');

const getAbsolutePath = (url) => path.resolve(__dirname, url);
const filename = '[name]';

function getWebpackConfigs() {
  const webpackConfigs = [];

  chunks.forEach((chunk) => {
    const jsPath = getAbsolutePath(`${chunk}/index.js`);
    const cssPath = getAbsolutePath(`${chunk}/index.scss`);

    webpackConfigs.push(getJavaScriptWebpackConfig(jsPath, chunk, 'commonjs'));
    webpackConfigs.push(getJavaScriptWebpackConfig(jsPath, chunk, false));
    webpackConfigs.push(getJavaScriptWebpackConfig(jsPath, `${chunk}.min`, 'commonjs'));


    if (chunk === 'ripple') return;
    webpackConfigs.push(getCssWebpackConfig(cssPath, chunk));
    webpackConfigs.push(getCssWebpackConfig(cssPath, `${chunk}.min`));
  });

  return webpackConfigs;
}

function getCommonWebpackParams(entryPath, chunk, {isCss, modules}) {
  const entry = {[chunk]: entryPath};
  return {
    entry,
    output: {
      path: getAbsolutePath('../build'),
      filename: `${filename}${isCss ? '.css' : ''}${modules === false ? '.es' : ''}.js`,
      libraryTarget: 'umd',
    },
    devtool: 'source-map',
  };
}

function getMaterialExternals() {
  const externals = {};
<<<<<<< HEAD
  [
    'base',
    'button',
    'card',
    'chips',
    'fab',
    'floating-label',
    'line-ripple',
    'list',
    'notched-outline',
    'ripple',
    'select',
    'switch',
    'tab',
    'tab-indicator',
    'tab-scroller',
    'textfield',
    'top-app-bar',
    'typography',
  ].forEach((name) => {
    // this can be reverted when we change back to @material/foo-package-filename
    // https://github.com/material-components/material-components-web/pull/3245
    const fileName = `@material/${name}/dist/mdc.${dashedToCamel(name)}`;
    externals[fileName] = fileName;
=======
  const importPaths = convertToImportPaths(readMaterialPackages());
  importPaths.forEach((importPath) => {
    externals[importPath] = importPath;
>>>>>>> master
  });
  return externals;
}

function getJavaScriptWebpackConfig(entryPath, chunk, modules) {
  return Object.assign(
    getCommonWebpackParams(entryPath, chunk, {modules}), {
      externals: Object.assign(
        {
          'react': 'react',
          'classnames': 'classnames',
          'prop-types': 'prop-types',
        },
        getMaterialExternals(),
      ),
      module: {
        rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            compact: true,
            presets: [['es2015', {modules}], 'react'],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
            ],
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
    getCommonWebpackParams(entryPath, chunk, {isCss: true}), {
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
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')(),
                ],
              },
            }, {
              loader: 'sass-loader',
              options: {importer},
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
