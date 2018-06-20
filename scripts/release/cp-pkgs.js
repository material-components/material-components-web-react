/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

  const basename = path.basename(asset);
  let destDir = path.join(assetPkg, 'dist', basename);
  if (path.extname(asset) === '.js' && !basename.includes('.css')) {
    if (basename.includes('.min')) {
      destDir = path.join(assetPkg, 'dist', 'index.min.js');
    } else {
      destDir = path.join(assetPkg, 'dist', 'index.js');
    }
  }
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
