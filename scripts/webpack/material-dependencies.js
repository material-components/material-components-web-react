const fs = require('fs');
const {basename, resolve, join} = require('path');
const packageJson = JSON.parse(fs.readFileSync(resolve(__dirname, '../../package.json'), 'utf8'));


function getMaterialDependencies() {
  const dependencies = [
    // must manually add any packages not in material-components-web-react/package.json
    'base',
  ];

  for (let dep in packageJson.devDependencies) {
    if (dep.startsWith('@material/')) {
      dependencies.push(basename(dep));
    }
  }
  return dependencies;
}


module.exports = {getMaterialDependencies};
