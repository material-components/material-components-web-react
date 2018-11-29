import Screenshot from './screenshot';
import Browser from './browser';
import testUrls from './screenshot-test-urls';

const runDiffSuite = async () => {
  const browser = await new Browser.launch();

  testUrls.forEach((url) => {
    const screenshot = new Screenshot(url, browser);
    screenshot.diff();
  });
}

runDiffSuite();
