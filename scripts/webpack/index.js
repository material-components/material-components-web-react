const {getComponents} = require('./component-globber');

function getMaterialExternals() {
  const dashedToCamel = (name) => name.replace(/-(\w)/g, (_, v) => v.toUpperCase());
  const externals = {};
  [
    'base',
    'button',
    'card',
    'chips',
    'fab',
    'floating-label',
    'line-ripple',
    'list',
    'notched-outline',
    'ripple',
    'select',
    'tab',
    'tab-indicator',
    'tab-scroller',
    'textfield',
    'top-app-bar',
    'typography',
  ].forEach((name) => {
    // this can be reverted when we change back to @material/foo-package-filename
    // https://github.com/material-components/material-components-web/pull/3245
    const fileName = `@material/${name}/dist/mdc.${dashedToCamel(name)}`;
    externals[fileName] = fileName;
  });
  return externals;
}

module.exports = {getMaterialExternals, getComponents};
