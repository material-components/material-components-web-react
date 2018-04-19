import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('button/index.html'),
];

const screenshotSuite = new ScreenshotSuite('Button', screenshots);

export default screenshotSuite;
