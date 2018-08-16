const path = require('path');
const {lstatSync, readdirSync} = require('fs');
const {join} = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory);

function getComponents() {
  const components = [
    // manually add sub-components
    'text-field/icon',
    'text-field/helper-text',
  ];
  const directories = getDirectories(__dirname);
  directories.forEach((directory) => {
    components.push(path.basename(directory));
  });

  return components;
}

module.exports = {getComponents};
