const capture = require('capture-chrome');
const fs = require('fs');

module.exports = function(path, name) {
  return capture({
    url: 'http://localhost:8080/' + path,
  }).then((screenshot) => {
    fs.writeFileSync(
      './test/screenshot/' + path + '/' + name + '.png', screenshot);
  });
};
