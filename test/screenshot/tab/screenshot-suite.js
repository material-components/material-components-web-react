import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('tab-indicator/index.html'),
];

const screenshotSuite = new ScreenshotSuite('TabIndicator', screenshots);

export default screenshotSuite;
