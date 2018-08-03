/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const webpack = require('webpack');
const {readdirSync, lstatSync} = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    'tab-indicator',
    'textfield',
    'top-app-bar',
    'typography',
  ].forEach((name) => externals[`@material/${name}`] = `@material/${name}`);
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
