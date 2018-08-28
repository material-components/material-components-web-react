import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('tab-scroller/index.html'),
];

const screenshotSuite = new ScreenshotSuite('TabScroller', screenshots);

export default screenshotSuite;
