# React Chips

A React version of an [MDC Chips](https://github.com/material-components/material-components-web/tree/master/packages/mdc-chips).

## Installation

```
npm install @material/react-chips
```

## Usage

### Styles

with Sass:
```js
import '@material/react-chips/index.scss';
```

with CSS:
```js
import "@material/react-chips/dist/chips.css";
```

### Javascript Instantiation

```js
import React, {Component} from 'react';
import ChipSet from '@material/react-chips';

class MyApp extends Component {
  render() {
    return (
      <ChipSet>
        <Chip id={0} label='Summer'/>
        <Chip id={1} label='Winter'/>
      </ChipSet>
    );
  }
}
```

## Variants

### Selection

There are two types of chips that allow for selection: [choice chips](https://material.io/design/components/chips.html#choice-chips) for single selection, and [filter chips](https://material.io/design/components/chips.html#filter-chips) for multiple selection. You can indicate a `Chip` is selected by adding the `selected` prop. Due to React's uni-directional data flow, you are expected write your own selection logic and pass a callback to the `Chip` through the `handleSelect` prop.

#### Choice chips

```js
class MyChoiceChips extends React.Component {
  state = {
    selectedChipId: -1,
  };

  isSelected = (id) => {
    return this.state.selectedChipId === id;
  }

  handleSelect = (id) => {
    if (this.isSelected(id)) {
      this.setState({selectedChipId: -1});
    } else {
      this.setState({selectedChipId: id});
    }
  }

  render() {
    return (
      <ChipSet>
        <Chip selected={this.isSelected(0)} id={0} label='Small' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(1)} id={1} label='Medium' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(2)} id={2} label='Large' handleSelect={this.handleSelect}/>
      </ChipSet>
    );
  }
}
```

#### Filter chips

Filter chips include a leading checkmark to indicate selection. To define a set of chips as filter chips, add the `filter` prop to the `ChipSet`. 

```js
class MyFilterChips extends React.Component {
  state = {
    selectedChipIds: new Set(),
  };

  isSelected = (id) => {
    return this.state.selectedChipIds.has(id);
  }

  handleSelect = (id) => {
    const selectedChipIds = new Set(this.state.selectedChipIds);
    if (this.isSelected(id)) {
      selectedChipIds.delete(id);
    } else {
      selectedChipIds.add(id);
    }
    this.setState({selectedChipIds});
  }

  render() {
    return (
      <ChipSet filter>
        <Chip selected={this.isSelected(0)} id={0} label='Tops' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(1)} id={1} label='Bottoms' handleSelect={this.handleSelect}/>
        <Chip selected={this.isSelected(2)} id={2} label='Shoes' handleSelect={this.handleSelect}/>
      </ChipSet>
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
handleSelect | Function(id: number) => void | Callback to call when the chip with the given id is selected

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.35.0/packages/mdc-chips/README.md#sass-mixins)
