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

The NPM packages all contain a `/dist` directory, which includes:

1. The component transpiled to ES5.
1. The component minified and transpiled to ES5.
1. The Sass compiled to a `.css` file.
1. The Sass minified and compiled to a `.css` file

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
