import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('ripple/index.html'),
];

const screenshotSuite = new ScreenshotSuite('Ripple', screenshots);

export default screenshotSuite;
