import capture from 'capture-chrome';
import {get} from 'http';
import fs from 'fs';
import resemble from 'node-resemble-js';
import readFilePromise from 'fs-readfile-promise';
import {assert} from 'chai';

export default class Screenshot {
  constructor(urlPath, imagePath) {
    this.urlPath_ = urlPath;
    this.imagePath_ = imagePath;
    // TODO allow clients to specify capture-chrome options, like viewport size
  }

  capture() {
    test(this.urlPath_, () => {
      const url = 'http://localhost:8080/' + this.urlPath_;
      return this.checkStatusCode_(url,
        capture({
          url,
        }).then((screenshot) => {
          fs.writeFileSync(
            './test/screenshot/' + this.imagePath_,
            screenshot);
        })
      );
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
            const onComplete = function(data) {
              assert.isBelow(Number(data.misMatchPercentage), 0.01);
              resolve();
            };
            resemble(newScreenshot)
            .compareTo(oldScreenshot)
            .onComplete(onComplete);
        });
      });
    });
  }

  checkStatusCode_(url, success) {
    return new Promise((resolve) => {
      get((url, res) => {
        const {statusCode} = res;
        if (statusCode === 200) {
          resolve(success);
        }
      });
    });
  }
}
