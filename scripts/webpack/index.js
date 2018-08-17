const {getComponents} = require('./component-globber');
const {getMaterialDependencies} = require('./material-dependencies');

function getMaterialExternals() {
  const dashedToCamel = (name) => name.replace(/-(\w)/g, (_, v) => v.toUpperCase());
  const externals = {};
  getMaterialDependencies().forEach((name) => {
    // this can be reverted when we change back to @material/foo-package-filename
    // https://github.com/material-components/material-components-web/pull/3245
    const fileName = `@material/${name}/dist/mdc.${dashedToCamel(name)}`;
    externals[fileName] = fileName;
  });
  return externals;
}

module.exports = {getMaterialExternals, getComponents};
