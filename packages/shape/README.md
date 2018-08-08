# React Shape

A React version of an [MDC Shape](https://github.com/material-components/material-components-web/tree/master/packages/mdc-shape).

## Installation

```
npm install @material/react-shape
```

## Usage

### Styles

with Sass:
```js
import '@material/react-shape/index.scss';
```

with CSS:
```js
import '@material/react-shape/dist/shape.css';
```

### Javascript Instantiation
```js
import React from 'react';
import Shape from '@material/react-shape';

class MyApp extends React.Component {
  render() {
    return (
      <Shape topLeft topRight bottomRight bottomLeft>
        Any unelevated component
      </Shape>
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
topLeft | Boolean | Enables shape alteration for the top left corner.
topRight | Boolean | Enables shape alteration for the top right corner.
bottomRight | Boolean | Enables shape alteration for the bottom right corner.
bottomLeft | Boolean | Enables shape alteration for the bottom left corner.

## Sass Mixins

Mixin | Description
--- | ---
`mdc-shape-angled-corner($background-color, $top-left-size[, $top-right-size, $bottom-right-size, $bottom-left-size])` | Applies styles for masking angled corners, using the given background color and corner sizes. If fewer than 4 corner sizes are specified, the mixin automatically determines the other corners similarly to CSS `border-radius`.
`mdc-shape-angled-corner-background($background-color)` | Sets the background color used to mask angled corners. Useful for styling a subset of components in a section with a different background color.
`mdc-shape-angled-corner-outline($outline-width, $outline-color[, $outline-style])` | Applies outline styles to angled corners. `$outline-style` defaults to `solid`.

> **Note:** When mentioned above, "background color" specifically refers to the color of the background behind the surface (_not_ the fill color of the surface). These mixins operate by masking the corners of the surface to match the background.

> **Note:** These mixins should be included in the context of the container element (or an ancestor) in order to apply styles to the corner elements.