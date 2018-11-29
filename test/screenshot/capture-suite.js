import Screenshot from './screenshot';
import Browser from './browser';
import testUrls from './screenshot-test-urls';

const browser = new Browser();
browser.launch().then(async (launchedBrowser) => {
  testUrls.forEach((url) => {
    const screenshot = new Screenshot(url, launchedBrowser);
    screenshot.capture();
  });
  await launchedBrowser.close();
});
