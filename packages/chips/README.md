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
import {ChipSet, Chip} from '@material/react-chips';

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

### Selection

There are two types of chips that allow for selection: [choice chips](https://material.io/design/components/chips.html#choice-chips) for single selection, and [filter chips](https://material.io/design/components/chips.html#filter-chips) for multiple selection. You can indicate a `Chip` is selected by adding the `selected` prop. Due to React's uni-directional data flow, you are expected write your own selection logic and pass a callback to the `Chip` through the `handleSelect` prop.

#### Choice chips

```js
class MyChoiceChips extends React.Component {
  state = {
    selectedChipIds: ['chip2'],
  };

  render() {
    return (
      <ChipSet
        choice
        selectedChipIds={this.state.selectedChipIds}
        handleSelect={(selectedChipIds) => this.setState({selectedChipIds})}
      >
        <Chip id={'chip1'} label='Small' />
        <Chip id={'chip2'} label='Medium' />
        <Chip id={'chip3'} label='Large' />
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
    selectedChipIds: ['chip1', 'chip2'],
  };

  render() {
    return (
      <ChipSet
        filter
        selectedChipIds={this.state.selectedChipIds}
        handleSelect={(selectedChipIds) => this.setState({selectedChipIds})}
      >
        <Chip id={'chip1'} label='Tops' />
        <Chip id={'chip2'} label='Bottoms' />
        <Chip id={'chip3'} label='Shoes' />
      </ChipSet>
    );
  }
}
```

### Input chips

Input chips are a variant of chips which enable user input by converting text into chips. Chips may be dynamically added and removed from the chip set. To define a set of chips as input chips, add the `input` prop to the `ChipSet`. When a chip is removed, the component will notify you through the `updateChips` prop callback. `updateChips` will pass an array of props representing the specified chip data. The example below shows you how to use this.

> _NOTE_: We recommend you store an array of chip labels and their respective IDs in the `state` to manage adding/removing chips. Do _NOT_ use the chip's index as its ID or key, because its index may change due to the addition/removal of other chips.

```js
class MyInputChips extends React.Component {
  state = {
    chips: [
      {label: 'Jane Smith', id: 'JaneSmith'},
      {label: 'John Doe', id: 'JohnDoe'},
    ],
  };

  handleKeyDown = (e) => {
    // If you have a more complex input, you may want to store the value in the state.
    const label = e.target.value;
    if (!!label && e.key === 'Enter') {
      const id = label.replace(/\s/g,'');
      // Create a new chips array to ensure that a re-render occurs.
      // See: https://reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly
      const chips = [...this.state.chips];
      if (chips.some((v) => v.id === id)) {
        console.error('There is already a chip which has same key.');
      } else {
        chips.push({label, id});
        this.setState({chips});
        e.target.value = '';
      }
    }
  };

  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <ChipSet
          input
          updateChips={(chips) => this.setState({chips})}
        >
          {this.state.chips.map((chip) =>
            <Chip
              id={chip.id}
              key={chip.id} // The chip's key cannot be its index, because its index may change.
              label={chip.label}
              trailingIcon={<MaterialIcon icon='cancel' />}
            />
          )}
        </ChipSet>
      </div>
    );
  }
}
```

## Props

### Chip Set

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the chip set element
selectedChipIds | Array | Array of ids of chips that are selected
handleSelect | Function(selectedChipIds: string[]) => void | Callback when Chips are Selected
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
trailingIcon | Element | An icon element that appears as the remove icon. Clicking on it should remove the chip.
selected | Boolean | Indicates whether the chip is selected
handleSelect | Function(id: string, selected: boolean) => void | Callback for selecting the chip with the given id
handleInteraction | Function(id: string) => void | Callback for interaction of chip (`onClick` | `onKeyDown`)
handleTrailingIconInteraction | Function(id: string) => void | Callback for interaction with trailing icon
shouldRemoveOnTrailingIconClick | Boolean | indicates if interaction with trailing icon should remove chip. defaults to `true`
> Note: `handleTrailingIconInteraction` will execute before `handleRemove`.
> Without explicitly setting shouldRemoveOnTrailingIconClick to false both
> callbacks will fire on trailingIcon interaction 

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-chips/README.md#sass-mixins)
