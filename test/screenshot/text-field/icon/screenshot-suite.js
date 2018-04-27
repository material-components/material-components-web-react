import ScreenshotSuite from '../../screenshot-suite';
import Screenshot from '../../screenshot';

const screenshots = [
  new Screenshot('text-field/icon/index.html'),
];

const screenshotSuite = new ScreenshotSuite('TextFieldIcon', screenshots);

export default screenshotSuite;
