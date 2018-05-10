const webpack = require('webpack');

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
const minifiedChunks = {};
chunks.forEach((chunk) => {
  const path = getAbsolutePath(`${chunk}/index.js`);
  minifiedChunks[chunk] = path;
  minifiedChunks[`${chunk}.min`] = path;
});

module.exports = {
  entry: minifiedChunks,
  output: {
    path: require('path').resolve(__dirname, '../build'),
    filename: 'react-[name].js',
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
