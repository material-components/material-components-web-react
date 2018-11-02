>  ✨ Are you a part of the Material Design web community? Help us improve by filling out this <a target='_blank' href='https://bit.ly/materialwebsurvey'>**10 minute survey**</a> (opens a new tab). ✨

# React Checkbox

A React version of an [MDC Checkbox](https://github.com/material-components/material-components-web/tree/master/packages/mdc-checkbox).

## Installation

```
npm install @material/react-checkbox
```

## Usage

### Styles

with Sass:
```js
import '@material/react-checkbox/index.scss';
```

with CSS:
```js
import "@material/react-checkbox/dist/checkbox.css";
```

### Javascript Instantiation

```js
import React, {Component} from 'react';
import Checkbox from '@material/react-checkbox';

class MyApp extends Component {
  state = {checked: false, indeterminate: false};

  render() {
    return (
      <Checkbox
        nativeControlId='my-checkbox'
        checked={this.state.checked}
        indeterminate={this.state.indeterminate}
        onChange={(e) => this.setState({
          checked: e.target.checked,
          indeterminate: e.target.indeterminate})
        }
      />
      <label for='my-checkbox'>My Checkbox</label>
    );
  }
}
```

> _NOTE_: In order to get access to the checked or indeterminate value, you must add an `onChange` handler that accepts an `Event` and updates state as shown above.

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the checkbox element
checked | Boolean | Indicates whether the checkbox is checked ("on")
indeterminate | Boolean | Indicates whether the checkbox is indeterminate
disabled | Boolean | Indicates whether the checkbox is disabled
nativeControlId | String | Id attached to the native control for relationship with the label

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-checkbox/README.md#sass-mixins)
