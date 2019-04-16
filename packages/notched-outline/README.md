# React Notched Outline

A React version of an [MDC Notched Outline](https://github.com/material-components/material-components-web/tree/master/packages/mdc-notched-outline).

## Installation

```
npm install @material/react-notched-outline
```

## Usage

### Styles

with Sass:
```js
import '@material/react-notched-outline/index.scss';
```

with CSS:
```js
import '@material/react-notched-outline/dist/notched-outline.css';
```

### Javascript Instantiation

```js
import NotchedOutline from '@material/react-notched-outline';
import FloatingLabel from '@material/react-floating-label';

const MyComponent = () => {
  return (
    <NotchedOutline notch>
      <FloatingLabel float>My Label</FloatingLabel>
    </NotchedOutline>
  );
}
```

#### Variant with No Notch

```js
import NotchedOutline from '@material/react-notched-outline';

const MyComponent = () => {
  return (
    <React.Fragment>
      <label>My Label</label>
      <NotchedOutline />
    </React.Fragment>
  );
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
notch | Boolean | Toggles between notched outline and idle outline state.
notchWidth | Number | Width of the notch in the outline.

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-notched-outline/README.md#sass-mixins)
