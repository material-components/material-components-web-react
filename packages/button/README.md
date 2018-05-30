# React Button

A React version of an [MDC Button](https://github.com/material-components/material-components-web/tree/master/packages/mdc-button).

## Installation

```
npm install @material/react-button
```

## Usage

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
icon | Element | Icon to render within root element.
children | String | Text to be displayed within root element.
disabled | Boolean | Disables button if true.

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.35.0/packages/mdc-button/README.md#sass-mixins)
