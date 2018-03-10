import fullSuite from './full-suite';

fullSuite.forEach((screenshotSuite) => {
  screenshotSuite.diff();
});
