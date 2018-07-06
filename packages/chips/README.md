# React Chips

A React version of an [MDC Chips](https://github.com/material-components/material-components-web/tree/master/packages/mdc-chips).

## Installation

```
npm install @material/react-chips
```

## Usage

```js
import React, {Component} from 'react';
import ChipSet from '@material/react-chips';

class MyApp extends Component {
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
className | String | Classes to be applied to the chip set element
filter | Boolean | Indicates that the chips in the set are filter chips, which allow multiple selection from a set of options


### Chip

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the chip element
id | Number | Unique identifier for the chip
label | String | Text to be shown on the chip
selected | Boolean | Indicates whether the chip is selected
handleSelect | String | Callback to call when the chip is selected

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.35.0/packages/mdc-chips/README.md#sass-mixins)
