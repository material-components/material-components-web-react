const {lstatSync, readdirSync} = require('fs');
const {basename, join, resolve} = require('path');

const denyList = [
  'chips',
  'images'
];
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory);

function getPackages() {
  const components = [];
  const directories = getDirectories(resolve(__dirname, '../../test/screenshot'));
  directories.forEach((directory) => {
    const packageName = basename(directory);
    if (denyList.includes(packageName)) return;
    components.push(packageName);
  });

  return components;
}

function getComponents() {
  return getPackages().concat([
    // manually add sub-components
    'text-field/icon',
    'text-field/helper-text',
  ]);
}

module.exports = {getComponents};
