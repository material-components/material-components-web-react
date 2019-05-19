# React Slider

A React version of an [MDC Slider](https://github.com/material-components/material-components-web/tree/master/packages/mdc-slider).

## Installation

```
npm install @material/react-slider
```

## Usage

### Styles

with Sass:
```js
import '@material/react-slider/index.scss';
```

with CSS:
```js
import '@material/react-slider/dist/slider.css';
```

### Javascript Instantiation
```js
import React from 'react';
import Slider from '@material/react-slider';

class MyApp extends React.Component {
  state = {value: 50};

  handleChange = (value: number) => this.setState({value});

  render() {
    return (
      <Slider
        value={this.state.value}
        onChange={this.handleChange}
        onInput={this.handleChange}
      />
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
disabled | Boolean | Disables slider if true.
discrete | Boolean | Use a discrete slider if true.
displayMarkers | Boolean | Display tracker markers (discrete slider only) if true.
value | Number | Sets the current value of the slider.
min | Number | Sets the min value the slider can have.
max | Number | Sets the max value the slider can have.
step | Number | Sets the step value of the slider.
onValueInput | (value: number) => void | Callback for when the slider's value is currently changing.
onValueChange | (value: number) => void | Callback for when the slider's value has been changed.
tabIndex | Number | Tab index of the slider.
isRtl | Boolean | Whether the direction of the slider is RTL.

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-slider/README.md#sass-mixins)
