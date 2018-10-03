# React Drawer

A React version of an [MDC Drawer](https://github.com/material-components/material-components-web/tree/master/packages/mdc-drawer).

## Installation

```
npm install @material/react-drawer
```

## Usage

### Styles

with Sass:
```js
import '@material/react-drawer/index.scss';
```

with CSS:
```js
import "@material/react-drawer/dist/chips.css";
```

### Javascript Instantiation

```js
import React, {Component} from 'react';
import {ChipSet, Chip} from '@material/react-drawer';

class MyApp extends Component {
  render() {
    return (
      <ChipSet>
        <Chip id='summer' label='Summer'/>
        <Chip id='winter' label='Winter'/>
      </ChipSet>
    );
  }
}
```

## Variants


## Props

### Chip Set

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the chip set element
selectedChipIds | Array | Array of ids of chips that are selected
handleSelect | Function(id: string) => void | Callback for selecting the chip with the given id
updateChips | Function(chips: Array{chipProps}) => void | Callback when the ChipSet updates its chips
choice | Boolean | Indicates that the chips in the set are choice chips, which allow single selection from a set of options
filter | Boolean | Indicates that the chips in the set are filter chips, which allow multiple selection from a set of options
input | Boolean | Indicates that the chips in the set are input chips, where chips can be added or removed


### Chip

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the chip element
id | Number | Required. Unique identifier for the chip
label | String | Text to be shown on the chip
leadingIcon | Element | An icon element that appears as the leading icon.
removeIcon | Element | An icon element that appears as the remove icon. Clicking on it should remove the chip.
selected | Boolean | Indicates whether the chip is selected
handleSelect | Function(id: string) => void | Callback for selecting the chip with the given id
handleRemove | Function(id: string) => void | Callback for removing the chip with the given id

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-chips/README.md#sass-mixins)
