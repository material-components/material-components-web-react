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
const outputPath = getAbsolutePath('../build');

const minifiedChunks = {};
const minifiedChunkStyles = {};
chunks.forEach((chunk) => {
  const path = getAbsolutePath(`${chunk}/index.js`);
  const stylePath = getAbsolutePath(`${chunk}/index.scss`);
  minifiedChunks[chunk] = path;
  minifiedChunks[`${chunk}.min`] = path;

  if (chunk === 'ripple') return;
  minifiedChunkStyles[chunk] = stylePath;
  minifiedChunkStyles[`${chunk}.min`] = stylePath;
});

const jsWebpackConfig = {
  entry: minifiedChunks,
  output: {
    path: outputPath,
    filename: `${filename}.js`,
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
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
};

const cssWebpackConfig = {
  entry: minifiedChunkStyles,
  output: {
    path: outputPath,
    filename: `${filename}.css.js`,
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            minimize: 
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
}

module.exports = [
  jsWebpackConfig,
  cssWebpackConfig,
];
