import puppeteer from 'puppeteer';

export default class Browser {

  async launch() {
    const browser = await puppeteer.launch({
      executablePath: 'google-chrome-unstable',
      // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
      args: ['--disable-dev-shm-usage'],
    });

    return browser;
  }
}
