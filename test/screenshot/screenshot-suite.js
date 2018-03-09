export default class ScreenshotSuite {
  constructor(name, screenshots) {
    this.name_ = name;
    this.screenshots_ = screenshots;
  }

  capture() {
    suite(this.name_, () => {});

    this.screenshots_.forEach((screenshot) => {
      screenshot.capture();
    });
  }

  diff() {
    suite(this.name_, () => {});

    this.screenshots_.forEach((screenshot) => {
      screenshot.diff();
    });
  }
}
