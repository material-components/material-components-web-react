import puppeteer from 'puppeteer';

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
    test(this.urlPath_, async () => {
      const url = 'http://localhost:8080/' + this.urlPath_;
      const imagePath = `./test/screenshot/${this.imagePath_}`;
      await this.createScreenshotTask_(url, imagePath);
    });
  }

  diff() {
    test(this.urlPath_, () => {
      const url = 'http://localhost:8080/' + this.urlPath_;
      const capturePromise = this.createScreenshotTask_(url);
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

  async createScreenshotTask_(url, path) {
    let image;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    if (path) {
      image = await page.screenshot({path});
    } else {
      image = await page.screenshot();
    }

    await browser.close();
    return image;
  }
}
