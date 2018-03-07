const {sassBundle, javaScriptBundle} = require('./webpack-bundles');

module.exports = [
sassBundle('./test/screenshot/temporary-package/temporary-package.scss', 'test/screenshot/temporary-package/bundle.css'),
javaScriptBundle('./test/screenshot/temporary-package/index.js', 'test/screenshot/temporary-package/bundle.js')
];
