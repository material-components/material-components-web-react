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

const SERVICE_ACCOUNT_KEY = process.env.SERVICE_ACCOUNT_KEY;
const BRANCH_NAME = process.env.BRANCH_NAME;
const COMMIT_HASH = process.env.COMMIT_HASH;
const GOLDENS_FILE_PATH = './test/screenshot/golden.json';
const BUCKET_NAME = 'screenshot-uploads';
const DEFAULT_METADATA = {
  commit: COMMIT_HASH,
  branch: BRANCH_NAME,
};

const GOLDEN = 'golden';
const SNAPSHOT = 'snapshot';
const DIFF = 'diff';

let credentials;
try {
  credentials = JSON.parse(SERVICE_ACCOUNT_KEY);
} catch (err) {
  console.error('Service account key could not be parsed.');
  process.exit(1);
}

const storage = new Storage({
  credentials,
});

const bucket = storage.bucket(BUCKET_NAME);

export default class Screenshot {
  /**
   * @param {string} urlPath The URL path to test
   */
  constructor(urlPath) {
    /** @private {string} */
    this.urlPath_ = urlPath;
    // TODO allow clients to specify capture-chrome options, like viewport size
  }

  /**
   * Returns the golden ID
   * @return {string|undefined}
   * @private
   */
  async getGoldenID_() {
    const goldenFile = await readFilePromise(GOLDENS_FILE_PATH);
    const goldenJSON = JSON.parse(goldenFile);
    return goldenJSON[this.urlPath_];
  }

  /**
   * Saves the golden ID
   * @param {string} goldenId The hash of the golden image
   * @private
   */
  async saveGoldenID_(goldenId) {
    const goldenFile = await readFilePromise(GOLDENS_FILE_PATH);
    const goldenJSON = JSON.parse(goldenFile);
    goldenJSON[this.urlPath_] = goldenId;
    await writeFilePromise(GOLDENS_FILE_PATH, JSON.stringify(goldenJSON, null, '  '));
  }

  /**
   * Takes a screenshot of the URL
   * @return {!Buffer}
   * @private
   */
  async createScreenshotTask_() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:8080/${this.urlPath_}`);
    const imageBuffer = await page.screenshot();
    await browser.close();
    return imageBuffer;
  }

  /**
   * Generates a unique hash from an image's contents
   * @param {!Buffer} imageBuffer The image buffer to hash
   * @return {string}
   * @private
   */
  generateImageID_(imageBuffer) {
    return createHash('sha256').update(imageBuffer).digest('hex');
  }

  /**
   * Returns the correct image path
   * @param {string} imageId The image ID
   * @param {string} imageType The image type
   * @private
   */
  getImagePath_(imageId, imageType) {
    switch (imageType) {
      case GOLDEN:
      return `${this.urlPath_}/${imageId}.golden.png`;

      case SNAPSHOT:
      case DIFF:
      return `${this.urlPath_}/${COMMIT_HASH}/${imageId}.${imageType}.png`;
    }
  }

  /**
   * Saves the given image to Google Cloud Storage with optional metadata
   * @param {string} imagePath The path to the image
   * @param {!Buffer} imageBuffer The image buffer
   * @param {Object} customMetadata Optional custom metadata
   * @private
   */
  async saveImage_(imagePath, imageBuffer, customMetadata={}) {
    const metadata = Object.assign({}, DEFAULT_METADATA, customMetadata);
    const file = bucket.file(imagePath);

    // Check if file exists and exit if it does
    const [exists] = await file.exists();
    if (exists) {
      console.log('✔︎ No changes', imagePath);
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
   * Captures a screenshot of the test URL
   */
  capture() {
    test(this.urlPath_, async () => {
      const golden = await this.createScreenshotTask_();
      const goldenId = this.generateImageID_(golden);
      const goldenPath = this.getImagePath_(goldenId, GOLDEN);
      await Promise.all([
        this.saveImage_(goldenPath, golden),
        this.saveGoldenID_(goldenId),
      ]);
      return;
    });
  }

  /**
   * Diffs a screenshot of the test URL with the existing golden screenshot
   */
  diff() {
    test(this.urlPath_, async () => {
      // Get the golden file path from the golden ID
      const goldenID = await this.getGoldenID_();
      const goldenPath = this.getImagePath_(goldenID, GOLDEN);

      // Take a snapshot and download the golden iamge
      const [snapshot, golden] = await Promise.all([
        this.createScreenshotTask_(),
        this.readImage_(goldenPath),
      ]);

      // Compare the images
      const data = await compareImages(snapshot, golden, comparisonOptions);
      const diff = data.getBuffer();

      // Use the same ID for the snapshot and diff so it's easy can associate the two
      const snapshotId = this.generateImageID_(snapshot);
      const snapshotPath = this.getImagePath_(snapshotId, SNAPSHOT);
      const diffPath = this.getImagePath_(snapshotId, DIFF);
      const metadata = {golden: goldenID};

      // Save the snapshot and the diff
      await Promise.all([
        this.saveImage_(snapshotPath, snapshot, metadata),
        this.saveImage_(diffPath, diff, metadata),
      ]);

      return assert.isBelow(Number(data.misMatchPercentage), 0.01);
    });
  }
}
