import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('material-icon/index.html'),
];

const screenshotSuite = new ScreenshotSuite('MaterialIcon', screenshots);

export default screenshotSuite;
