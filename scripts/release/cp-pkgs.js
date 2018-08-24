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

/**
 * @fileoverview Copies built assets from our build directory to each of their respective package's
 * dist/ folder.
 */

const path = require('path');
const fs = require('fs');
const cpFile = require('cp-file');
const {sync: globSync} = require('glob');

const PKG_RE = /^(([a-z]*\-?)*)/;

const isValidCwd = (
  path.basename(process.cwd()) === 'material-components-web-react' &&
  fs.existsSync('packages') &&
  fs.existsSync('build')
);

if (!isValidCwd) {
  console.error(
    'Invalid CWD. Please ensure you are running this from the root of the repo, ' +
    'and that you have run `npm run build`'
  );
  process.exit(0);
}

function getAssetEntry(asset) {
  const [fileName, entryName] = path.parse(asset).name.match(PKG_RE);
  return entryName;
}

function cpAsset(asset) {
  const assetPkg = path.join('packages', getAssetEntry(asset));
  if (!fs.existsSync(assetPkg)) {
    Promise.reject(new Error(`Non-existent asset package path ${assetPkg} for ${asset}`));
  }

  let basename = path.basename(asset);
  const extname = path.extname(asset);
  const isMap = extname === '.map';
  const isJs = extname === '.js';
  const isEs = basename.includes('.es');
  const isCss = basename.includes('.css');
  if (!isEs && !isCss && (isJs || isMap )) {
    if (isMap) {
      basename = 'index.js.map';
    } else {
      if (basename.includes('.min')) {
        basename = 'index.min.js';
      } else {
        basename = 'index.js';
      }
    }
  }

  const destDir = path.join(assetPkg, 'dist', basename);
  return cpFile(asset, destDir)
    .then(() => console.log(`cp ${asset} -> ${destDir}`));
}

Promise.all(globSync('build/*.{css,js,map}').map(cpAsset))
  .then(() => {
    console.log('done!');
  })
  .catch((err) => {
    console.error(`Error encountered copying assets: ${err}`);
    process.exit(1);
  });
