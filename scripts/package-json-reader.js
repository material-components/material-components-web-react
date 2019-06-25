const fs = require('fs');
const {resolve, join} = require('path');
const packageJson = JSON.parse(
  fs.readFileSync(resolve(__dirname, '../package.json'), 'utf8')
);

const readMaterialPackages = () => {
  const dependencies = [
    // must manually add any packages not in material-components-web-react/package.json
    'base',
  ];

  for (let dep in packageJson.devDependencies) {
    if (dep.startsWith('@material/')) {
      dependencies.push(dep);
    }
  }
  return dependencies;
};

module.exports = {readMaterialPackages};
