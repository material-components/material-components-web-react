import Screenshot from './screenshot';
import Browser from './browser';
import testUrls from './screenshot-test-urls';

const runDiffSuite = async () => {
  const browser = new Browser()
  const launchedBrowser = await browser.launch();

  testUrls.forEach((url) => {
    const screenshot = new Screenshot(url, launchedBrowser);
    screenshot.diff();
  });
}

runDiffSuite();
