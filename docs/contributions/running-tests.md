# Running Tests

Tests are an important part of coding. Please refer to the following instructions when contributing to the repository.

**Ensure you're on Node v10**
If you need help updating, please see [NVM](https://github.com/creationix/nvm#installation). :heart: NVM.

## Screenshot Tests

Please refer to [screenshot tests](../screenshot-tests.md).

## Unit Tests

We use:

* [Enzyme](https://airbnb.io/enzyme/)
* [Karma](https://karma-runner.github.io/latest/index.html)
* [Mocha](https://mochajs.org/)
* [Chai Assert](https://www.chaijs.com/api/assert/)

To run a single instance of the tests, run:

```bash
npm run test:unit
```

To run the tests with a debugger in Chrome:

```bash
npm run test:watch
```

Click on the big DEBUG button in the top righthand corner. In the new tab that Chrome opens, you can open the [developer tools](https://developers.google.com/web/tools/chrome-devtools/) and debug per usual.

<img width="1051" alt="karma-debug-button" src="https://user-images.githubusercontent.com/579873/48503422-f26cfc80-e7f6-11e8-9975-a91b21e30e09.png">

### Test Coverage

We use [Istanbul](https://istanbul.js.org/) to report and check code coverage. To build the coverage report, please run the unit tests `npm run test:unit`. This will create a `coverage/` directory in the root of the project. Open `./coverage/Chrome <version_number>/index.html`. This will show a screen like:

<img width="1680" alt="screen shot 2018-11-14 at 10 31 07" src="https://user-images.githubusercontent.com/579873/48504018-96a37300-e7f8-11e8-9366-4a648cda3790.png">

We aim for:

* Statements: 95%
* Branches: 95%
* Functions: 95%
* Lines: 95%

If they do not meet these requirements, we will ask to increase test coverage.

## Running Lint

Below is a list of the Eslint standards:

* [Google Eslint](https://github.com/google/eslint-config-google)
* [React Eslint](https://github.com/yannickcr/eslint-plugin-react)

To run lint:

```bash
npm run lint
```

This will print any lines that do not follow the eslint standards, which you will need to fix before opeing a PR.

## Type Tests

Due to [multiple issues in production type files](https://github.com/material-components/material-components-web-react/issues/936) an easy way to [validate production type files has been added](https://github.com/material-components/material-components-web-react/pull/900):

```bash
npm run test:types
```

This command will perform a full production build, install the locally built versions, [generate a file that imports them all](../../test/types/gen-index.js), and then build it to expose any issues in the locally built `.d.ts` files.
