import ScreenshotSuite from '../../screenshot-suite';
import Screenshot from '../../screenshot';

const screenshots = [
  new Screenshot('text-field/helper-text/index.html'),
];

const screenshotSuite = new ScreenshotSuite('TextFieldHelperText', screenshots);

export default screenshotSuite;
