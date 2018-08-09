import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('tab/index.html'),
];

const screenshotSuite = new ScreenshotSuite('Tab', screenshots);

export default screenshotSuite;
