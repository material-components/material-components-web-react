import capture from 'capture-chrome';
import fs from 'fs';
import resemble from 'node-resemble-js';
import readFilePromise from 'fs-readfile-promise';
import {assert} from 'chai';
import {compareImages} from 'node-image-compare-promise';

export default class Screenshot {
  constructor(path, name) {
    this.path_ = path;
    this.name_ = name;
  }

  capture() {
    capture({
      url: 'http://localhost:8080/' + this.path_,
    }).then((screenshot) => {
      fs.writeFileSync(
        './test/screenshot/' + this.path_ + '/' + this.name_ + '.png',
        screenshot);
    });
  }

  diff() {
    test(this.name_, () => {
      const capturePromise = capture({
        url: 'http://localhost:8080/' + this.path_,
      });
      const readPromise = readFilePromise(
          './test/screenshot/' + this.path_ + '/' + this.name_ + '.png');
      return Promise.all([capturePromise, readPromise]).then(function([newScreenshot, oldScreenshot]) {
        return new Promise(function(resolve) {
            const resolve2 = function(data) {
              assert.isBelow(Number(data.misMatchPercentage), 0.01);
              resolve();
            };
            resemble(newScreenshot).compareTo(oldScreenshot).onComplete(resolve2);
        });
      });
    });
  }
}
