import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('top-app-bar/fixed.html'),
  new Screenshot('top-app-bar/prominent.html'),
  new Screenshot('top-app-bar/short.html'),
  new Screenshot('top-app-bar/shortCollapsed.html'),
  new Screenshot('top-app-bar/standard.html'),
  new Screenshot('top-app-bar/standardNoActionItems.html'),
  new Screenshot('top-app-bar/standardWithNavigationIconElement.html'),
];

const screenshotSuite = new ScreenshotSuite('TopAppBar', screenshots);

export default screenshotSuite;
