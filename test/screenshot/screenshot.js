import capture from 'capture-chrome';
import fs from 'fs';
import resemble from 'node-resemble-js';
import readFilePromise from 'fs-readfile-promise';
import {assert} from 'chai';

export default class Screenshot {
  constructor(urlPath, imagePath) {
    this.urlPath_ = urlPath;
    this.imagePath_ = imagePath;
  }

  capture() {
    test(this.urlPath_, () => {
      // TODO check that url resolves with 200 response first
      return capture({
        url: 'http://localhost:8080/' + this.urlPath_,
      }).then((screenshot) => {
        fs.writeFileSync(
          './test/screenshot/' + this.imagePath_,
          screenshot);
      });
    });
  }

  diff() {
    test(this.urlPath_, () => {
      const capturePromise = capture({
        url: 'http://localhost:8080/' + this.urlPath_,
      });
      const readPromise = readFilePromise(
          './test/screenshot/' + this.imagePath_);
      return Promise.all([capturePromise, readPromise])
      .then(function([newScreenshot, oldScreenshot]) {
        return new Promise(function(resolve) {
            const resolve2 = function(data) {
              console.log('stuff');
              assert.isBelow(Number(data.misMatchPercentage), 0.01);
              resolve();
            };
            resemble(newScreenshot)
            .compareTo(oldScreenshot)
            .onComplete(resolve2);
        });
      });
    });
  }
}
