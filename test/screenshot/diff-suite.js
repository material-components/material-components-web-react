import Screenshot from './screenshot';
import testUrls from './screenshot-test-urls';

testUrls.forEach((url) => {
  process.on('warning', e => console.warn(e.stack));
  const screenshot = new Screenshot(url);
  screenshot.diff();
});
