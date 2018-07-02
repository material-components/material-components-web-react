import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('chips/index.html'),
];

const screenshotSuite = new ScreenshotSuite('Chips', screenshots);

export default screenshotSuite;
