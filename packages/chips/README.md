# React Chips

A React version of an [MDC Chips](https://github.com/material-components/material-components-web/tree/master/packages/mdc-chips).

## Installation

```
npm install @material/react-chips
```

## Usage

```js
import React from 'react';
import ChipSet from '@material/react-chips';

class MyApp extends React.Component {
  render() {
    return (
      <ChipSet labels={['Chip One', 'Chip Two']} />
    );
  }
}
```

## Props

### Chip Set

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the chip set element.
labels | Array | Array of text to be displayed in each chip.

### Chip

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the chip element.

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.35.0/packages/mdc-chips/README.md#sass-mixins)
