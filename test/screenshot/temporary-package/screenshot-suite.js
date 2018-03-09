import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('temporary-package', 'temporary-package/main.png'),
  new Screenshot('temporary-package/foo.html', 'temporary-package/foo.png'),
];

const screenshotSuite = new ScreenshotSuite('TemporaryPackage', screenshots);

export default screenshotSuite;
