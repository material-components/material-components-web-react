import ScreenshotSuite from '../screenshot-suite';
import Screenshot from '../screenshot';

const screenshots = [
  new Screenshot('top-app-bar/short.html'),
  new Screenshot('top-app-bar/prominent.html'),
  new Screenshot('top-app-bar/standard.html'),
  new Screenshot('top-app-bar/shortNoActionItems.html'),
  new Screenshot('top-app-bar/prominentNoActionItems.html'),
  new Screenshot('top-app-bar/standardNoActionItems.html'),
  new Screenshot('top-app-bar/alwaysCollapsed.html'),
];

const screenshotSuite = new ScreenshotSuite('TopAppBar', screenshots);

export default screenshotSuite;
