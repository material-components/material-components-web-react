const capture = require('capture-chrome');
const resemble = require('node-resemble-js');
const readFilePromise = require('fs-readfile-promise');
const {assert} = require('chai');

module.exports = function(path, name) {
  return capture({
    url: 'http://localhost:8080/' + path,
  }).then((pngString) => {
    const newScreenshot = new Buffer(pngString, 'base64');
    readFilePromise('./test/screenshot/' + path + '/' + name + '.png')
    .then((oldScreenshot) => {
      resemble(oldScreenshot)
        .compareTo(newScreenshot)
        .onComplete(function(data) {
          assert.isBelow(
            Number(data.misMatchPercentage),
            0.01,
            'Screenshot ' + path + '/' + name + ' failed');
        });
    });
  });
};
