import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('fab/standard.html'),
];

const screenshotSuite = new ScreenshotSuite('Fab', screenshots);

export default screenshotSuite;
