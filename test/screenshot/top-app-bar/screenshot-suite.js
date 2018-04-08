import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('top-app-bar/prominent'),
  new Screenshot('top-app-bar/short'),
  new Screenshot('top-app-bar/shortCollapsed'),
  new Screenshot('top-app-bar/standard'),
  new Screenshot('top-app-bar/standardNoActionItems'),
  new Screenshot('top-app-bar/standardWithNavigationIconElement'),
];

const screenshotSuite = new ScreenshotSuite('TopAppBar', screenshots);

export default screenshotSuite;
