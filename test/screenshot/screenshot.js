import {Readable} from 'stream';
import {createHash} from 'crypto';
import {readFile, writeFile} from 'fs';
import {promisify} from 'util';
import puppeteer from 'puppeteer';
import compareImages from 'resemblejs/compareImages';
import {assert} from 'chai';
import Storage from '@google-cloud/storage';

import comparisonOptions from './screenshot-comparison-options';

const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);

const serviceAccountKey = process.env.MDC_GCLOUD_SERVICE_ACCOUNT_KEY;
const branchName = process.env.MDC_BRANCH_NAME;
const commitHash = process.env.MDC_COMMIT_HASH;
const goldenFilePath = './test/screenshot/golden.json';
const bucketName = 'screenshot-uploads';
const defaultMetadata = {
  commit: commitHash,
  branch: branchName,
};

const storage = new Storage({
  credentials: JSON.parse(serviceAccountKey),
});

const bucket = storage.bucket(bucketName);

export default class Screenshot {
  /**
   * @param {string} urlPath The URL path to test
   */
  constructor(urlPath, browser) {
    /** @private {string} */
    this.urlPath_ = urlPath;
    this.browser_ = browser;
    // TODO allow clients to specify capture-chrome options, like viewport size
  }

  /**
   * Captures a screenshot of the test URL and marks it as the new golden image
   */
  capture() {
    test(this.urlPath_, async () => {
      const golden = await this.takeScreenshot_();
      const goldenHash = this.generateImageHash_(golden);
      const goldenPath = this.getImagePath_(goldenHash, 'golden');
      await Promise.all([
        this.saveImage_(goldenPath, golden),
        this.saveGoldenHash_(goldenHash),
      ]);
      return;
    });
  }

  /**
   * Diffs a screenshot of the test URL with the existing golden screenshot
   */
  diff() {
    test(this.urlPath_, async () => {
      // Get the golden file path from the golden hash
      const goldenHash = await this.getGoldenHash_();
      const goldenPath = this.getImagePath_(goldenHash, 'golden');

      // Take a snapshot and download the golden iamge
      const [snapshot, golden] = await Promise.all([
        this.takeScreenshot_(),
        this.readImage_(goldenPath),
      ]);

      // Compare the images
      const data = await compareImages(snapshot, golden, comparisonOptions);
      const diff = data.getBuffer();

      // Use the same hash for the snapshot path and diff path so it's easy can associate the two
      const snapshotHash = this.generateImageHash_(snapshot);
      const snapshotPath = this.getImagePath_(snapshotHash, 'snapshot');
      const diffPath = this.getImagePath_(snapshotHash, 'diff');
      const metadata = {golden: goldenHash};

      // Save the snapshot and the diff
      await Promise.all([
        this.saveImage_(snapshotPath, snapshot, metadata),
        this.saveImage_(diffPath, diff, metadata),
      ]);

      return assert.equal(Number(data.misMatchPercentage), 0);
    });
  }

  /**
   * Generates a unique hash from an image's contents
   * @param {!Buffer} imageBuffer The image buffer to hash
   * @return {string}
   * @private
   */
  generateImageHash_(imageBuffer) {
    return createHash('sha256').update(imageBuffer).digest('hex');
  }

  /**
   * Returns the golden hash
   * @return {string|undefined}
   * @private
   */
  async getGoldenHash_() {
    const goldenFile = await readFilePromise(goldenFilePath);
    const goldenJSON = JSON.parse(goldenFile);
    return goldenJSON[this.urlPath_];
  }

  /**
   * Returns the correct image path
   * @param {string} imageHash The image hash
   * @param {string} imageType The image type
   * @return {string|undefined}
   * @private
   */
  getImagePath_(imageHash, imageType) {
    if (imageType === 'golden') {
      return `${this.urlPath_}/${imageHash}.golden.png`;
    }

    if (['snapshot', 'diff'].includes(imageType)) {
      return `${this.urlPath_}/${commitHash}/${imageHash}.${imageType}.png`;
    }
  }

  /**
   * Downloads an image from Google Cloud Storage
   * @param {string} gcsFilePath The file path on Google Cloud Storage
   * @return {Buffer}
   * @private
   */
  async readImage_(gcsFilePath) {
    const data = await bucket.file(gcsFilePath).download();
    return data[0];
  }

  /**
   * Saves the golden hash
   * @param {string} goldenHash The hash of the golden image
   * @private
   */
  async saveGoldenHash_(goldenHash) {
    const goldenFile = await readFilePromise(goldenFilePath);
    const goldenJSON = JSON.parse(goldenFile);
    goldenJSON[this.urlPath_] = goldenHash;
    const goldenContent = JSON.stringify(goldenJSON, null, '  ');
    await writeFilePromise(goldenFilePath, `${goldenContent}\r\n`);
  }

  /**
   * Saves the given image to Google Cloud Storage with optional metadata
   * @param {string} imagePath The path to the image
   * @param {!Buffer} imageBuffer The image buffer
   * @param {!Object=} customMetadata Optional custom metadata
   * @private
   */
  async saveImage_(imagePath, imageBuffer, customMetadata={}) {
    const metadata = Object.assign({}, defaultMetadata, customMetadata);
    const file = bucket.file(imagePath);

    // Check if file exists and exit if it does
    const [exists] = await file.exists();
    if (exists) {
      console.log('✔︎ No changes to', imagePath);
      return;
    }

    // Create a new stream from the image buffer
    let stream = new Readable();
    stream.push(imageBuffer);
    stream.push(null);

    // The promise is resolved or rejected inside the stream event callbacks
    return new Promise((resolve, reject) => {
      stream.pipe(file.createWriteStream())
        .on('error', (err) => {
          reject(err);
        }).on('finish', async () => {
          try {
            // Make the image public and set it's metadata
            await file.makePublic();
            await file.setMetadata({metadata});
            console.log('✔︎ Uploaded', imagePath);
            resolve();
          } catch (err) {
            reject(err);
          }
        });
    });
  }

  /**
   * Takes a screenshot of the URL
   * @return {!Buffer}
   * @private
   */
  async takeScreenshot_() {
    const browser = this.browser_;
    const page = await browser.newPage();
    await page.goto(`http://localhost:8080/#/${this.urlPath_}`, {'waitUntil': ['networkidle2']});
    // await page.waitForSelector('#screenshot-test-app');
    const imageBuffer = await page.screenshot({fullPage: true});
    await browser.close();
    return imageBuffer;
  }
}
