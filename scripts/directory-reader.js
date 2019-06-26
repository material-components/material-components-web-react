const {lstatSync, readdirSync} = require('fs');
const {basename, join, resolve} = require('path');

const denyList = ['images'];

const isDirectory = (source) => lstatSync(source).isDirectory();
const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory);

function readScreenshotDirectory(
  components = [],
  path = resolve(__dirname, '../test/screenshot'),
  parentDirectory = ''
) {
  const directories = getDirectories(path);
  directories.forEach((directory) => {
    const packageName = basename(directory);
    if (denyList.includes(packageName)) return;

    // recursively get sub directories
    const subDirectories = getDirectories(resolve(path, packageName));
    if (subDirectories.length > 0) {
      readScreenshotDirectory(
        components,
        resolve(path, packageName),
        packageName
      );
    }
    components.push(
      `${parentDirectory ? parentDirectory + '/' : ''}${packageName}`
    );
  });

  return components;
}

module.exports = {read: readScreenshotDirectory, getDirectories};
