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

const {readdirSync, lstatSync} = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {readMaterialPackages} = require('../scripts/package-json-reader');
const {
  convertToImportMDCWebPaths,
} = require('../scripts/package-name-converter');
const {getDirectories} = require('../scripts/directory-reader');
const {importer} = require('./webpack.util');

const isDirectory = (source) => lstatSync(source).isDirectory();
const containsTsxFile = (source) =>
  readdirSync(source).some((file) => path.extname(file) === '.tsx');

const getChunks = (source) =>
  readdirSync(source)
    .map((filename) => path.join(source, filename))
    .filter((source) => isDirectory(source) && containsTsxFile(source))
    .map((directoryPath) => directoryPath.replace('packages/', ''));

const chunks = getChunks('./packages');

const getAbsolutePath = (url) => path.resolve(__dirname, url);
const filename = '[name]';

function getWebpackConfigs() {
  const webpackEntries = {};
  const cssWebpackEntries = {};
  const cssWebpackEntriesMin = {};
  const webpackConfig = getJavaScriptWebpackConfig();
  const webpackConfigCss = getCssWebpackConfig();
  const webpackConfigCssMin = getCssWebpackConfig(true);

  chunks.forEach((chunk) => {
    const tsxPath = getAbsolutePath(`${chunk}/index.tsx`);
    const cssPath = getAbsolutePath(`${chunk}/index.scss`);
    webpackEntries[chunk] = tsxPath;
    cssWebpackEntries[chunk] = cssPath;
    cssWebpackEntriesMin[`${chunk}.min`] = cssPath;
  });

  webpackConfig.entry = webpackEntries;
  webpackConfigCss.entry = cssWebpackEntries;
  webpackConfigCssMin.entry = cssWebpackEntriesMin;

  return [webpackConfig, webpackConfigCss, webpackConfigCssMin];
}

function getCommonWebpackParams({isCss} = {}) {
  return {
    mode: 'production',
    output: {
      path: getAbsolutePath('../build'),
      filename: `${filename}${isCss ? '.css' : ''}.js`,
      libraryTarget: 'umd',
      globalObject: `typeof self !== 'undefined' ? self : this`,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    devtool: 'source-map',
  };
}

function getReactMaterialExternals() {
  return getDirectories('./packages').map(
    (directory) => `react-${path.parse(directory).name}`
  );
}

function getMaterialExternals() {
  const externals = {};
  const importPaths = convertToImportMDCWebPaths(readMaterialPackages());
  importPaths.forEach((importPath) => {
    externals[importPath] = `${importPath}.js`;
  });

  getReactMaterialExternals().forEach((path) => {
    externals[`@material/${path}`] = `@material/${path}/dist/index.js`;
  });

  return externals;
}

const materialExternals = getMaterialExternals();

function getJavaScriptWebpackConfig() {
  return Object.assign(getCommonWebpackParams(), {
    externals: Object.assign(
      {
        react: 'react',
        'react-dom': 'react-dom',
        classnames: 'classnames',
        'prop-types': 'prop-types',
      },
      materialExternals
    ),
    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            compact: true,
            presets: [['es2015', {modules: false}], 'react'],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
            ],
          },
        },
      ],
    },
  });
}

function getCssWebpackConfig(shouldMinify) {
  return Object.assign(getCommonWebpackParams({isCss: true}), {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: 'global',
                localIdentName: '[local]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () =>
                  [require('autoprefixer')()].concat(
                    shouldMinify ? require('cssnano')() : []
                  ),
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
    plugins: [new MiniCssExtractPlugin({filename: `${filename}.css`})],
  });
}

module.exports = getWebpackConfigs();
