import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('card/index.html'),
];

const screenshotSuite = new ScreenshotSuite('Card', screenshots);

export default screenshotSuite;
