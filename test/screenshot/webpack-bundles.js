const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports.bundle = function(testPath, outputPath) {
  return {
    entry: './test/screenshot/' + testPath,
    output: {
      filename: outputPath + '.js',
    },
    devtool: 'eval-source-map',
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
              loader: 'sass-loader',
              options: {
                includePaths: ['./node_modules'],
              },
            },
          ],
        }),
      }],
    },
    plugins: [
      new ExtractTextPlugin(outputPath + '.css'),
      new OptimizeCssAssetsPlugin(),
    ],
  };
};
