const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './test/screenshot/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[sha1:hash:hex:4]',
          },
        },
        {
          loader: 'sass-loader',
          options: {
            importer: function(url, prev) {
              if (url.indexOf('@material') === 0) {
                let filePath = url.split('@material')[1];
                let nodeModulePath = `./node_modules/@material/${filePath}`;
                return {
                  file: path.resolve(nodeModulePath),
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
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new OptimizeCssAssetsPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
