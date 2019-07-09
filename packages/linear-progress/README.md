# React Linear Progress

A React version of an [MDC Linear Progress](https://github.com/material-components/material-components-web/tree/master/packages/mdc-linear-progress) component.

## Installation

```
npm install @material/react-linear-progress
```

## Usage

### Styles

with Sass:
```js
import '@material/react-linear-progress/index.scss';
```

with CSS:
```js
import '@material/react-linear-progress/dist/linear-progress.css';
```

### Javascript Instantiation
```js
import LinearProgress from '@material/react-linear-progress';
import React from 'react';

class MyApp extends React.Component {
  render() {
    return (
      <LinearProgress
        buffer={0.9}
        progress={0.8}
      />
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
buffer | Number | Decimal value between 0 and 1, sets the buffer bar width
bufferingDots | Boolean | Default `true`. Whether to show the buffer dots in the un-progressed section
className | String | Optional. Additional class names to add to the root component
closed | Boolean | Default `false`. When changed to `true`, closes the component
indeterminate | Boolean | Default `false`. When set to `true`, renders the indeterminate variant
progress | Number | Decimal value between 0 and 1, sets the progress bar width
reversed | Boolean | Default `false`. When set to `true`, renders the reversed variant
tag | String | Default `'div'`. The tag type to render

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/tree/master/packages/mdc-linear-progress#sass-mixins)
