import {Readable} from 'stream';
import {createHash} from 'crypto';
import {readFile, writeFile} from 'fs';
import {promisify} from 'util';
import puppeteer from 'puppeteer';
// @ts-ignore no typings
import compareImages from 'resemblejs/compareImages';
import {test} from 'mocha';
import {assert} from 'chai';
import Storage from '@google-cloud/storage';
import comparisonOptions from './screenshot-comparison-options';
import axios from 'axios';
import path from 'path';
import mkdirp from 'mkdirp';

const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);
const serviceAccountKey: string =
  process.env.MDC_GCLOUD_SERVICE_ACCOUNT_KEY || '';
const branchName = process.env.MDC_BRANCH_NAME;
const commitHash = process.env.MDC_COMMIT_HASH;
const goldenFilePath = './test/screenshot/golden.json';
const bucketName = 'screenshot-uploads';
const defaultMetadata = {
  commit: commitHash,
  branch: branchName,
};

const NO_MATCH_DIRECTORY = 'no_match';

let storage: Storage | null = null;
let bucket: Storage.Bucket | null = null;
if (serviceAccountKey) {
  storage = new Storage({
    credentials: JSON.parse(serviceAccountKey),
  });

  bucket = storage.bucket(bucketName);
}

export default class Screenshot {
  urlPath_: string;
  /**
   * @param {string} urlPath The URL path to test
   */
  constructor(urlPath: string) {
    /** @private {string} */
    this.urlPath_ = urlPath;
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
      if (!goldenPath) {
        console.error('no goldenPath found');
        return;
      }
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
      if (!goldenPath) {
        console.error('no goldenPath found');
        return;
      }
      // Take a snapshot and download the golden image
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
      const metadata: Storage.CustomFileMetadata = {golden: goldenHash};
      if (!snapshotPath) {
        console.error('no snapshotPath found');
        return;
      }
      if (!diffPath) {
        console.error('no diffPath found');
        return;
      }
      // Save the snapshot and the diff
      if (storage) {
        await Promise.all([
          this.saveImage_(snapshotPath, snapshot, metadata),
          this.saveImage_(diffPath, diff, metadata),
        ]);
      }
      if (Number(data.misMatchPercentage) > 0) {
        mkdirp.sync(path.dirname(`${NO_MATCH_DIRECTORY}/${diffPath}`));
        await writeFilePromise(`${NO_MATCH_DIRECTORY}/${diffPath}`, diff);
      }
      return assert.equal(Number(data.misMatchPercentage), 0);
    });
  }
  /**
   * Generates a unique hash from an image's contents
   * @param {!Buffer} imageBuffer The image buffer to hash
   * @return {string}
   * @private
   */
  generateImageHash_(imageBuffer: Buffer): string {
    return createHash('sha256')
      .update(imageBuffer)
      .digest('hex');
  }
  /**
   * Returns the golden hash
   * @return {string|undefined}
   * @private
   */
  async getGoldenHash_() {
    const goldenFile = await readFilePromise(goldenFilePath);
    const goldenJSON = JSON.parse(goldenFile.toString());
    return goldenJSON[this.urlPath_];
  }
  /**
   * Returns the correct image path
   * @param {string} imageHash The image hash
   * @param {string} imageType The image type
   * @return {string|undefined}
   * @private
   */
  getImagePath_(imageHash: string, imageType: string): string | undefined {
    if (imageType === 'golden') {
      return `${this.urlPath_}/${imageHash}.golden.png`;
    }
    if (['snapshot', 'diff'].includes(imageType)) {
      return `${this.urlPath_}/${commitHash}/${imageHash}.${imageType}.png`;
    }
    return undefined;
  }
  /**
   * Downloads an image from Google Cloud Storage
   * @param {string} gcsFilePath The file path on Google Cloud Storage
   * @return {Buffer}
   * @private
   */
  async readImage_(gcsFilePath: string) {
    const url = `https://storage.googleapis.com/screenshot-uploads/${gcsFilePath}`;
    const response = await axios.request({
      url,
      responseType: 'arraybuffer',
    });
    return response.data;
  }
  /**
   * Saves the golden hash
   * @param {string} goldenHash The hash of the golden image
   * @private
   */
  async saveGoldenHash_(goldenHash: string) {
    const goldenFile = await readFilePromise(goldenFilePath);
    const goldenJSON = JSON.parse(goldenFile.toString());
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
  async saveImage_(
    imagePath: string,
    imageBuffer: Buffer,
    customMetadata: Storage.CustomFileMetadata = {}
  ) {
    const metadata: Storage.CustomFileMetadata = Object.assign(
      {},
      defaultMetadata,
      customMetadata
    );
    if (!bucket) {
      throw new Error('GCS is not configured');
    }
    const file = bucket.file(imagePath);
    // Check if file exists and exit if it does
    const [exists] = await file.exists();
    if (exists) {
      console.log('✔︎ No changes to', imagePath);
      return;
    }
    // Create a new stream from the image buffer
    const stream = new Readable();
    stream.push(imageBuffer);
    stream.push(null);
    // The promise is resolved or rejected inside the stream event callbacks
    return new Promise((resolve, reject) => {
      stream
        .pipe(file.createWriteStream())
        .on('error', (err: string) => {
          reject(err);
        })
        .on('finish', async () => {
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
    const browser = await puppeteer.launch({
      executablePath: 'google-chrome-unstable',
      // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
      args: ['--disable-dev-shm-usage'],
    });
    const page = await browser.newPage();
    await page.goto(`http://localhost:8080/#/${this.urlPath_}`, {
      waitUntil: ['networkidle2'],
      timeout: 600000,
    });
    // await page.waitForSelector('#screenshot-test-app');
    const imageBuffer = await page.screenshot({fullPage: true});
    await browser.close();
    return imageBuffer;
  }
}
