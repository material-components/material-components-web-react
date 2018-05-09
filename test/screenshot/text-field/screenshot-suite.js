import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('text-field/index.html'),
];

const screenshotSuite = new ScreenshotSuite('TextField', screenshots);

export default screenshotSuite;
