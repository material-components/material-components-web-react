# React Line Ripple

A React version of an [MDC Line Ripple](https://github.com/material-components/material-components-web/tree/master/packages/mdc-line-ripple).

## Installation

```
npm install @material/react-line-ripple
```

## Usage

### Styles

with Sass:
```js
import '@material/react-line-ripple/index.scss';
```

with CSS:
```js
import '@material/react-line-ripple/dist/line-ripple.css';
```

### Javascript Instantiation

```js
import LineRipple from '@material/react-line-ripple';

const MyComponent = () => {
  return (
    <LineRipple />
  );
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
active | boolean | Activates or deactivates the line ripple state.
className | string | Classes to be applied to the root element.
rippleCenter | number | Sets the center of the ripple animation.
style | object | Inline styles of root element.

## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-line-ripple/README.md#sass-mixins)
