const {basename} = require('path');

const dashedToCamel = (name) =>
  name.replace(/-(\w)/g, (_, v) => v.toUpperCase());

convertToImportMDCWebPaths = (packageNames) => {
  return packageNames.map((packageName) => {
    const name = basename(packageName);
    // this can be reverted when we change back to @material/foo-package-filename
    // https://github.com/material-components/material-components-web/pull/3245
    return `@material/${name}/dist/mdc.${dashedToCamel(name)}`;
  });
};

module.exports = {convertToImportMDCWebPaths};
