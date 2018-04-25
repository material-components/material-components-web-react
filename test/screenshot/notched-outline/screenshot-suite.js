import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('notched-outline/index.html'),
];

const screenshotSuite = new ScreenshotSuite('NotchedOutline', screenshots);

export default screenshotSuite;
