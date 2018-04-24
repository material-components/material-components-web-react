import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('floating-label/index.html'),
];

const screenshotSuite = new ScreenshotSuite('FloatingLabel', screenshots);

export default screenshotSuite;
