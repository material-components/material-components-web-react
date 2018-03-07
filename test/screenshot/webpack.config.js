const {sassBundle, javaScriptBundle} = require('./webpack-bundles');

module.exports = [
sassBundle('./test/screenshot/temporary-package/temporary-package.scss', 'temporary-package/bundle.css'),
javaScriptBundle('./test/screenshot/temporary-package/index.js', 'temporary-package/bundle.js'),
sassBundle('./test/screenshot/temporary-package-2/temporary-package-2.scss', 'temporary-package-2/bundle.css'),
javaScriptBundle('./test/screenshot/temporary-package-2/index.js', 'temporary-package-2/bundle.js')
];
