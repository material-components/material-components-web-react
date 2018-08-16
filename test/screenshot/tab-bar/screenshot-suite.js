import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('tab-bar/index.html'),
];

const screenshotSuite = new ScreenshotSuite('TabBar', screenshots);

export default screenshotSuite;
