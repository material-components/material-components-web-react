import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('select/index.html'),
];

const screenshotSuite = new ScreenshotSuite('Select', screenshots);

export default screenshotSuite;
