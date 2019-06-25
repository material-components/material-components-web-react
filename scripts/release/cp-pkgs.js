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

const isValidCwd =
  path.basename(process.cwd()) === 'material-components-web-react' &&
  fs.existsSync('packages') &&
  fs.existsSync('build');

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
    Promise.reject(
      new Error(`Non-existent asset package path ${assetPkg} for ${asset}`)
    );
  }

  let basename = path.basename(asset);
  const extname = path.extname(asset);
  const isJs = extname === '.js';
  const isEs = basename.includes('.es');
  const isCss = basename.includes('.css');
  if (!isEs && !isCss && isJs) {
    if (basename.includes('.min')) {
      basename = 'index.min.js';
    } else {
      basename = 'index.js';
    }
  }

  const destDir = path.join(assetPkg, 'dist', basename);
  return cpFile(asset, destDir).then(() =>
    console.log(`cp ${asset} -> ${destDir}`)
  );
}

// this takes a file path to an index.d.ts file and adds an //@ts-ignore comment
// above the MDC Web imports (any line that includes `/dist/`). We need to ignore
// these lines since MDC Web does not have typing files
// TODO: https://github.com/material-components/material-components-web-react/issues/574
function addTsIgnore(filePath) {
  const data = fs
    .readFileSync(filePath)
    .toString()
    .split('\n');
  const lineNumber = data.findIndex((lineText) => lineText.includes('/dist/'));
  if (lineNumber <= -1) return;

  data.splice(lineNumber, 0, '// @ts-ignore');
  const text = data.join('\n');
  fs.writeFile(filePath, text, function(err) {
    if (err) return console.log(err);
  });
}

// takes assetPath, computes the destination file directory path
// and copies file into destination directory
function cpTypes(typeAsset) {
  const {dir, base} = path.parse(typeAsset);
  let destDir = dir.split('build/types/')[1];
  destDir = destDir.split('/');
  destDir.splice(2, 0, 'dist');
  destDir = `${destDir.join('/')}/${base}`;
  addTsIgnore(typeAsset);
  return cpFile(typeAsset, destDir).then(() =>
    console.log(`cp ${typeAsset} -> ${destDir}`)
  );
}

async function copyPackages() {
  try {
    await Promise.all(globSync('build/*.{css,js,map}').map(cpAsset));
    console.log('-- Copied CSS, JS, and Map Files to Destination Directory');
    await Promise.all(globSync('build/types/packages/**/*.d.ts').map(cpTypes));
    console.log('-- Copied Typescript Type Files to Destination Directory');
  } catch (err) {
    console.error(`Error encountered copying assets: ${err}`);
    process.exit(1);
  }
}

copyPackages();
