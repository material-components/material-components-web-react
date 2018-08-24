import Screenshot from './screenshot';
import testUrls from './screenshot-test-urls';

testUrls.forEach((url) => {
  const screenshot = new Screenshot(url);
  screenshot.capture();
});
