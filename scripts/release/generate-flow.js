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
const { compiler } = require('flowgen');


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

// takes assetPath, computes the destination file directory path
// and generates flow types
function generateFlow(typeAsset) {
  const {dir, base} = path.parse(typeAsset);
  let destDir = dir.split('build/types/')[1];
  destDir = destDir.split('/');
  destDir.splice(2, 0, 'dist');
  destDir = `${destDir.join('/')}/${base.replace('.d.ts', '.flow.js')}`;
  const flowdef = compiler.compileDefinitionFile(typeAsset);
  fs.writeFileSync(destDir, flowdef);
}

function generateFlowDefinitions() {
  try {
    globSync('build/types/packages/**/*.d.ts').map(generateFlow);
    console.log('-- Copied Typescript Type Files to Destination Directory');
  } catch (err) {
    console.error(`Error encountered copying assets: ${err}`);
    process.exit(1);
  }
}

generateFlowDefinitions();

