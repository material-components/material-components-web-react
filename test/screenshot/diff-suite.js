import Screenshot from './screenshot';
import Browser from './browser';
import testUrls from './screenshot-test-urls';

const browser = new Browser();
const launchedBrowser = browser.launch().then(() => {
  testUrls.forEach((url) => {
    const screenshot = new Screenshot(url, launchedBrowser);
    screenshot.diff();
  });
});
