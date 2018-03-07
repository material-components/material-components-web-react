const {sassBundle, javaScriptBundle} = require('./webpack-bundles');

module.exports = [
sassBundle('./test/screenshot/temporary-package/temporary-package.scss', 'temporary-package/bundle.css'),
javaScriptBundle('./test/screenshot/temporary-package/index.js', 'temporary-package/bundle.js')
];
