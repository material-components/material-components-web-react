# React Switch

A React version of an [MDC Switch](https://github.com/material-components/material-components-web/tree/master/packages/mdc-switch).

## Installation

```
npm install @material/react-switch
```

## Usage

### Styles

with Sass:
```js
import '@material/react-switch/index.scss';
```

with CSS:
```js
import "@material/react-switch/dist/switch.css";
```

### Javascript Instantiation

```js
import React from 'react';
import Switch from '@material/react-switch';

class MyApp extends React.Component {
  state = {checked: false};

  render() {
    return (
      <React.Fragment>
        <Switch
          nativeControlId='my-switch'
          checked={this.state.checked}
          onChange={(e) => this.setState({checked: e.target.checked})} />
        <label htmlFor='my-switch'>My Switch</label>
      </React.Fragment>
    );
  }
}
```

> _NOTE_: In order to get access to the checked value, you must add an `onChange` handler that accepts an `Event` and updates a checked state as shown above.

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the switch element
checked | Boolean | Indicates whether the switch is checked ("on")
disabled | Boolean | Indicates whether the switch is disabled
nativeControlId | String | Id attached to the native control for relationship with the label

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-switch/README.md#sass-mixins)
