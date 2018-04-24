import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('line-ripple/index.html'),
];

const screenshotSuite = new ScreenshotSuite('Line Ripple', screenshots);

export default screenshotSuite;
