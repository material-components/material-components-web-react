import Screenshot from './screenshot';
import Browser from './browser';
import testUrls from './screenshot-test-urls';

// const browser = new Browser();
// browser.launch().then(async (launchedBrowser) => {
//   suite('capture suite', () => {
//   })
//   await launchedBrowser.close();
// });
const browser = new Browser();

testUrls.forEach((url) => {
  const screenshot = new Screenshot(url, browser);
  screenshot.capture();
});
