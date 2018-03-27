import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('temporary-package/foo-test'),
  new Screenshot('temporary-package/bar-test'),
];

const screenshotSuite = new ScreenshotSuite('TemporaryPackage', screenshots);

export default screenshotSuite;
