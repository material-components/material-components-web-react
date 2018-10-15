[![Build Status](https://api.travis-ci.com/material-components/material-components-web-react.svg?branch=master)](https://travis-ci.com/material-components/material-components-web-react/)
[![codecov](https://codecov.io/gh/material-components/material-components-web-react/branch/master/graph/badge.svg)](https://codecov.io/gh/material-components/material-components-web-react)
[![Chat](https://img.shields.io/discord/259087343246508035.svg)](https://discord.gg/material-components)

# Material Components for React (MDC React)

MDC React is the offical implementation of Google's Material Design Components. It is a wrapper library for [MDC Web](https://github.com/material-components/material-components-web). Please refer to our [MDC Web Catalog](https://material-components.github.io/material-components-web-catalog/#/) to play and interact with the Components.

![mpmgq9h6b9x](https://user-images.githubusercontent.com/579873/44939654-d8fdfd80-ad3b-11e8-9b64-6244cb5e6886.png)

## Components

The following is a list of the components that are ready to be used, with corresponding links to the [material.io](https://material.io/) design spec and [MDC Web code](https://github.com/material-components/material-components-web).

Component | Spec | MDC Web
---- | ---- | ----
[Button](./packages/button) | [Button Design Page](https://material.io/design/components/buttons.html) | [MDC Button](https://github.com/material-components/material-components-web/tree/master/packages/mdc-button)
[Card](./packages/card) | [Card Design Page](https://material.io/design/components/cards.html) | [MDC Card](https://github.com/material-components/material-components-web/tree/master/packages/mdc-card)
[Checkbox](./packages/checkbox) | [Checkbox Design Page](https://material.io/design/components/selection-controls.html#checkboxes) | [MDC Checkbox](https://github.com/material-components/material-components-web/tree/master/packages/mdc-checkbox)
[Chips](./packages/chips) | [Chips Design Page](https://material.io/design/components/chips.html) | [MDC Chips](https://github.com/material-components/material-components-web/tree/master/packages/mdc-chips)
[Fab](./packages/fab) | [Fab Design Page](https://material.io/design/components/buttons-floating-action-button.html) | [MDC Fab](https://github.com/material-components/material-components-web/tree/master/packages/mdc-fab)
[Floating Label](./packages/floating-label) | [Text Field Design Page](https://material.io/design/components/text-fields.html) | [MDC Floating Label](https://github.com/material-components/material-components-web/tree/master/packages/mdc-floating-label)
[Line Ripple](./packages/line-ripple) | [Text Field Design Page](https://material.io/design/components/text-fields.html) | [MDC Line Ripple](https://github.com/material-components/material-components-web/tree/master/packages/mdc-line-ripple)
[Material Icon](./packages/material-icon) | [Material Icon Design Page](https://material.io/design/iconography/system-icons.html#design-principles) | [Material Icon Tool](https://material.io/tools/icons/?style=baseline)
[Menu Surface](./packages/menu-surface) | [Menu Surface Design Page](https://material.io/design/components/menus.html#design-principles) | [MDC Menu Surface](https://github.com/material-components/material-components-web/tree/master/packages/mdc-menu-surface)
[Notched Outline](./packages/notched-outline) | [Text Field Design Page](https://material.io/design/components/text-fields.html) | [MDC Notched Outline](https://github.com/material-components/material-components-web/tree/master/packages/mdc-notched-outline)
[Ripple](./packages/ripple) | [Ripple Design Page](https://material.io/design/interaction/states.html) | [MDC Ripple](https://github.com/material-components/material-components-web/tree/master/packages/mdc-ripple)
[Select](./packages/select) | [Select Design Page](https://material.io/design/components/menus.html#) | [MDC Select](https://github.com/material-components/material-components-web/tree/master/packages/mdc-select)
[Switch](./packages/switch) | [Switch Design Page](https://material.io/design/components/selection-controls.html#switches) | [MDC Switch](https://github.com/material-components/material-components-web/tree/master/packages/mdc-switch)
[Tab](./packages/tab) | [Tabs Design Page](https://material.io/design/components/tabs.html) | [MDC Tab](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab)
[Tab Bar](./packages/tab-bar) | [Tabs Design Page](https://material.io/design/components/tabs.html) | [MDC Tab Bar](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-bar)
[Tab Indicator](./packages/tab-indicator) | [Tabs Design Page](https://material.io/design/components/tabs.html) | [MDC Tab Indicator](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-indicator)
[Text Field](./packages/text-field) | [Text Field Design Page](https://material.io/design/components/text-fields.html) | [MDC Text Field](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield)
[Top App Bar](./packages/top-app-bar) | [Top App Bar Design Page](https://material.io/design/components/app-bars-top.html) | [MDC Top App Bar](https://github.com/material-components/material-components-web/tree/master/packages/mdc-top-app-bar)


## Getting Started

### With create-react-app

`create-react-app` is a popular CLI tool to getting started with React. If you're new to React or Webpack, you might be starting out here. This section will walk you through configuring `create-react-app` to install and use our components.

>  Recommended things to know

> 1. node/npm
> 2. JavaScript
> 3. HTML/CSS
> 4. ES6

> _NOTE:_ If you haven't used `create-react-app` before, you may want to read the [Overview Guide](https://github.com/facebook/create-react-app#quick-overview).


#### Step 1: Install create-react-app

Install `create-react-app`:

```
npm i -g create-react-app
create-react-app my-app
cd my-app
```

> NOTE: all npm commands can be replaced with yarn

#### Step 2: Install Components

Install Button:

```
npm install --save @material/react-button
```

#### Step 3: Using Sass

If you want to use the compiled CSS and not customize any colors, text, etc. you can skip to [Step 3a](#step-3a-use-compiled-css).

Most likely you'll want to start using the [Sass mixins](https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md#sass) to customize your app. There are a few ways to achieve this. `create-react-app` does have a [recommended approach](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc), which we also recommend.

The following is an alternate version of the `create-react-app` approach. The difference being all the `node_modules` imports will go into `./src/App.scss`. First install `node-sass-chokidar`:

```
npm install -D node-sass-chokidar npm-run-all
```

In `package.json` replace the following:

```js
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject"
}
```

with:

```js
"scripts": {
  "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules ./src/App.scss -o ./src",
  "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules --watch ./src/App.scss ./src/App.css",
  "start-js": "react-scripts start",
  "start": "npm-run-all -p watch-css start-js",
  "build-js": "react-scripts build",
  "build": "npm-run-all build-css build-js",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject"
}
```

Then rename `./src/App.css` --> `./src/App.scss`. The `build-css` and `watch-css` tasks will now watch App.scss file changes, which holds all your Sass imports. You can now import Sass files from `node_modules` like so:

```sass
// ./src/App.scss

@import "@material/react-button/index"; // the .scss extension is implied
@import "./react-button-overrides";

...
```

```sass
// ./react-button-overrides.scss

@import "@material/button/mixins";

.button-alternate {
  @include mdc-button-container-fill-color(lightblue);
}

```


#### Step 3a: Use Compiled CSS

If you performed [Step 3](#step-3-using-sass), then you can skip to [Step 4](#step-4-use-mdc-react-button).

If you don't need to customize your app, then using the CSS is a quicker way to get started with MDC React Components. Each package comes with a `/dist` directory, which includes the CSS files compiled from our Sass files. `create-react-app` is ready to import CSS files. To import the Button CSS copy the following line into `./src/App.js` imports:

```js
import '@material/react-button/dist/button.css';
```

If you want to use the minified version, the import instead looks like:

```js
import '@material/react-button/dist/button.min.css';
```

#### Step 4: Use MDC React Button

Open `./src/App.js`. Then replace the boilerplate App code (entire file) with the barebones MDC React Button:

```js
import React, {Component} from 'react';
import Button from '@material/react-button/dist'; // /index.js is implied

import './App.css';
// add the appropriate line(s) in Step 3a if you are using compiled CSS instead.

class App extends Component {
  render() {
    return (
      <div>
        <Button
          raised
          className='button-alternate'
          onClick={() => console.log('clicked!')}
        >
          Click Me!
        </Button>
      </div>
    );
  }
}

export default App;
```

You can also use these same configurations for your own Webpack build pipeline without `create-react-app`. But this is the quickest way to getting started with MDC React Components. Button is one of our simpler components, but you should be able to apply these same principles you learn here to any the components. Thanks for trying out MDC React Components, and remember to tell a friend! Enjoy!


## Need help

We're constantly trying to improve our components. If Github Issues don't fit your needs, then please visit us on our [Discord Channel](https://discord.gg/material-components).
