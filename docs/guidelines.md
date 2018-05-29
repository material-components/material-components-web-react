# General Guidelines

## Integrating with Components

Some of our components accept a `React.Component` as a prop. If you decide to build a component, it will more than likely need some additional feature or attributes added to operate correctly.

### Classnames

Pass the prop `className` to the className prop on the parent element. As an example please see the [MaterialIcon Component](../packages/material-icon/index.js) or the example below:


```js
class Dog extends React.Component {
  render() {
    const {className = ''} = this.props;
    const allClasses = `${className} dog-class`;

    return (
      <div className={allClasses}>
        Woof
      </div>
    );
  }
};
```

## Importing with ES5

The NPM packages each contain a `/dist` directory, which includes:

1. The component transpiled to ES5 (`@material/react-foo/dist/index.js`).
1. The component minified and transpiled to ES5 (`@material/react-foo/dist/index.min.js`).
1. The Sass compiled to a `.css` file (`@material/react-foo/dist/foo.css`).
1. The Sass minified and compiled to a `.css` file (`@material/react-foo/dist/foo.min.css`).

Also included are the respective maps for minified files. Please see below for an example:

### Importing the JS

```js
import React from 'react';
import Button from '@material/react-button/dist/index.js'; // you can omit the `/index.js`

// This will only work if your build pipeline supports `.css` in your JS files
import '@material/react-button/dist/button.css';

class MyApp extends React.Component {
  render() {
    return (
      <Button>
        Click Me!
      </Button>
    );
  }
}
```

## Building Sass Files

If you use the Sass files instead of the built CSS files found in the `/dist` directory, we recommend you use a package like [Autoprefixer](https://github.com/postcss/autoprefixer). Autoprefixer adds vendor prefixes to your CSS Output (ie. -moz-xyz, -webkit-xyz, etc). We use it in our [webpack config](../packages/webpack.config.js) as well in our [MDC-Web repository](https://github.com/material-components/material-components-web).
