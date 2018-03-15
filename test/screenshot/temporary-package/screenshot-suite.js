import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('temporary-package/index.html'),
  new Screenshot('temporary-package/foo.html'),
];

const screenshotSuite = new ScreenshotSuite('TemporaryPackage', screenshots);

export default screenshotSuite;
