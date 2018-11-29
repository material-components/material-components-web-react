import puppeteer from 'puppeteer';

export default class Browser {

  browser = null;

  async launch() {
    if (!this.browser) {
      const browser = await puppeteer.launch({
        executablePath: 'google-chrome-unstable',
        // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
        args: ['--disable-dev-shm-usage'],
      });
      this.browser = browser;
    }

    return this.browser;
  }
}
