const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const chunks = [
  'button',
  'card',
  'fab',
  'floating-label',
  'line-ripple',
  'material-icon',
  'notched-outline',
  'ripple',
  'text-field',
  'top-app-bar',
];

const getAbsolutePath = (url) => require('path').resolve(__dirname, url);
const filename = 'react-[name]';

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
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: shouldMinify,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [getAbsolutePath('../node_modules')],
              },
            },
          ],
        }),
      }],
    },
    plugins: [
      new ExtractTextPlugin(`${filename}.css`),
    ],
  });
}


module.exports = getWebpackConfigs();
