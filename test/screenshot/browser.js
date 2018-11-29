import puppeteer from 'puppeteer';

export default class Browser {

  launch() {
    return new Promise(async (resolve, reject) => {
      const browser = await puppeteer.launch({
        executablePath: 'google-chrome-unstable',
        // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
        args: ['--disable-dev-shm-usage'],
      });

      resolve(browser);
    });
  }
}
