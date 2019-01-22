# React Button

A React version of an [MDC Button](https://github.com/material-components/material-components-web/tree/master/packages/mdc-button).

## Installation

```
npm install @material/react-button
```

## Usage

### Styles

with Sass:
```js
import '@material/react-button/index.scss';
```

with CSS:
```js
import '@material/react-button/dist/button.css';
```

### Javascript Instantiation
```js
import React from 'react';
import Button from '@material/react-button';

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

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
raised | Boolean | Enables raised variant.
unelevated | Boolean | Enables unelevated variant.
outlined | Boolean | Enables outlined variant.
dense | Boolean | Enables dense variant.
icon | Element | Icon to render within root element.
trailingIcon | Element | Icon to render on the right side of the element
children | String | Text to be displayed within root element.
disabled | Boolean | Disables button if true.
href | String | Sets a hyperlink & uses anchor tag instead of a button.

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-button/README.md#sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.
